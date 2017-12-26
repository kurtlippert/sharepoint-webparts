import * as React from 'react';
import { createElement as r } from 'react';
import { combineReducers, Reducer, Store, Unsubscribe, Dispatch } from 'redux';
import { connect, DispatchProp } from 'react-redux';
// import { ProviderContext } from '../../webparts/helloWorld/HelloWorldWebPart';

// state
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  filter: Filter;
}

export type Filter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';
export type TodoActionType = 'ADD_TODO' | 'TOGGLE_TODO' | 'SET_VISIBILITY_FILTER';

export interface TodoAction {
  id: number;
  text: string;
  type: TodoActionType;
  filter: Filter;
}

// initial state
const initialTodo: Todo = {
  id: -1,
  text: '',
  completed: false,
  filter: 'SHOW_ALL'
};

// todo helper
const todo = (state: Todo, action: TodoAction): Todo => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

// todo reducer
const todos = (state: Todo[] = [], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(initialTodo, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// visibility reducer
const visibilityFilter = (state: Filter = 'SHOW_ALL', action: TodoAction): Filter => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// reducer combin
export interface TodoReducerMap {
  todoList: Todo[];
  filter: Filter;
}

// gets sent to our root web part to do stuff with
export const todosReducer: Reducer<TodoReducerMap> = combineReducers<TodoReducerMap>({
  todoList: todos as Reducer<Todo[]>,
  filter: visibilityFilter as Reducer<Filter>
});

// presentational components
interface LinkProps {
  active: boolean;
  onClick: () => SetVisibilityActionType;
  children?: React.ReactNode[];
}

const Link: React.SFC<LinkProps> = ({ active, onClick, children }) => {
  if (active) {
    return r('span', {}, children);
  }

  return r('a', {
    href: '#',
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onClick();
    }
  }, children);
};

interface FilterLinkProps {
  filter: Filter;
  children?: React.ReactNode[];
}

const mapStateToLinkProps = (state: TodoReducerMap, ownProps: FilterLinkProps) => ({
  active: state.filter === ownProps.filter
});
const mapDispatchToLinkProps = (dispatch: Dispatch<TodoReducerMap>, ownProps: FilterLinkProps) => ({
  onClick: () =>
    dispatch(
      setVisibilityFilter(
        ownProps.filter
      )
    )
});
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

// class FilterLink extends React.Component<FilterLinkProps, {}> {
//   public context: ProviderContext;
//
//   private static contextTypes: React.ValidationMap<ProviderContext> = {
//     store: React.PropTypes.object.isRequired
//   };
//
//   private unsubscribe: Unsubscribe;
//
//   public componentDidMount(): void {
//     this.unsubscribe =
//       this.context.store.subscribe(() => this.forceUpdate);
//   }
//
//   public componentWillUnmount(): void {
//     this.unsubscribe();
//   }
//
//   public render(): React.SFCElement<LinkProps> {
//     const { filter, children } = this.props;
//     const { store } = this.context;
//
//     return (
//       r(Link, {
//         active: filter === store.getState().filter,
//         onClick: () =>
//           store.dispatch(
//             setVisibilityFilter(
//               filter
//             )
//           )
//       },
//         children)
//     );
//   }
// }
//
interface TodoProps {
  onClick: () => void;
  completed: boolean;
  text: string;
}

const Todo: React.SFC<TodoProps> = ({ onClick, completed, text }) =>
  r('li', {
    onClick: onClick,
    style: { textDecoration: completed ? 'line-through' : 'none' }
  },
    text
  );

interface TodoListProps {
  todoList: Todo[];
  onTodoClick: (todoItemId: number) => { type: TodoActionType, id: number }; // AddTodo Action-Type
}

const TodoList: React.SFC<TodoListProps> = ({ todoList, onTodoClick }) =>
  r('ul', {},
    todoList.map(todoItem =>
      r(Todo, {
        key: todoItem.id,
        onClick: () => onTodoClick(todoItem.id),
        completed: todoItem.completed,
        text: todoItem.text
      })
    )
  );

const _AddTodo: React.SFC<DispatchProp<TodoReducerMap>> = ({ dispatch }) => {
  let todoInput: HTMLInputElement;

  return (
    r('div', {}, [
      r('input', {
        ref: node => node === null ? '' : todoInput = node as HTMLInputElement
      }),
      r('button', {
        onClick: () => {
          dispatch !== undefined
            ? dispatch(addTodo(nextTodoId++, todoInput.value))
            // tslint:disable-next-line:no-console
            : console.error('dispatch is undefined');

          todoInput.value = '';
        }
      },
        'Add Todo')
    ])
  );
};

const AddTodo = connect()(_AddTodo);

interface FooterProps {
  store: Store<TodoReducerMap>;
}

const Footer: React.SFC<FooterProps> = () => {
  return (
    r('p', {}, [
      'Show: ',
      r(FilterLink, {
        filter: 'SHOW_ALL'
      },
        'All'),
      ', ',
      r(FilterLink, {
        filter: 'SHOW_ACTIVE',
        store
      },
        'Active'),
      ', ',
      r(FilterLink, {
        filter: 'SHOW_COMPLETED',
        store
      },
        'Completed')
    ])
  );
};

// helper functions
const getVisibleTodos = (todoItems: Todo[], filter: Filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todoItems;
    case 'SHOW_COMPLETED':
      return todoItems.filter(todoItem => todoItem.completed);
    case 'SHOW_ACTIVE':
      return todoItems.filter(todoItem => !todoItem.completed);
  }
};

// TodoList
const mapStateToTodoListProps = (props: TodoReducerMap) => ({
  todoList: getVisibleTodos(
    props.todoList,
    props.filter
  )
});
const mapDispatchToTodoListProps = (dispatch: Dispatch<TodoReducerMap>) => ({
  onTodoClick: (id: number) =>
    dispatch(
      toggleTodo(
        id
      )
    )
});
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

// action creators
interface AddTodoActionType {
  type: TodoActionType;
  id: number;
  text: string;
}
const addTodo = (id: number, text: string): AddTodoActionType => ({
  type: 'ADD_TODO',
  id,
  text
});

interface ToggleTodoActionType {
  type: TodoActionType;
  id: number;
}
const toggleTodo = (id: number): ToggleTodoActionType => ({
  type: 'TOGGLE_TODO',
  id
});

interface SetVisibilityActionType {
  type: TodoActionType;
  filter: Filter;
}
const setVisibilityFilter = (filter: Filter): SetVisibilityActionType => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

// container component
let nextTodoId = 0;

const Todos: React.SFC = () =>
  r('div', {}, [
    r(AddTodo),
    r(VisibleTodoList),
    r(Footer)
  ]);

export default Todos;
