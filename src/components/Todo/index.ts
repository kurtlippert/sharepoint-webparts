import * as React from 'react';
import { createElement as r } from 'react';
import { combineReducers, Reducer, Store, Dispatch } from 'redux';
import { connect, DispatchProp } from 'react-redux';

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
  onLinkClick: () => SetVisibilityActionType;
  children?: React.ReactNode[];
}

const Link: React.SFC<LinkProps> = ({ active, onLinkClick, children }) => {
  if (active) {
    return r('span', {}, children);
  }

  return r('a', {
    href: '#',
    onClick(e: React.MouseEvent<HTMLElement>): void {
      e.preventDefault();
      onLinkClick();
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
  onLinkClick: () =>
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

interface TodoProps {
  onClick: () => void;
  completed: boolean;
  text: string;
}

const Todo: React.SFC<TodoProps> = ({ onClick, completed, text }) =>
  r('li', {
    onClick,
    style: { textDecoration: completed ? 'line-through' : 'none' }
  },
    text
  );

interface TodoListProps {
  todoList: Todo[];
  onTodoClick: (todoItemId: number) => AddTodoActionType; // AddTodo Action-Type
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

// Stateless-Functional component with no container component (aside from the root).
// So the pattern here (that I just created), is to name our SFC: '_<name_of_component>'
// then the 'container' connection function: '<name_of_component>'
const _AddTodo: React.SFC<DispatchProp<TodoReducerMap>> = ({ dispatch }) => {
  let todoInput: HTMLInputElement;

  return (
    r('div', {}, [
      r('input', {
        ref: node => node === null ? '' : todoInput = node as HTMLInputElement
      }),
      r('button', {
        onClick(): void {
          dispatch !== undefined
            ? dispatch(addTodo(todoInput.value))
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
        filter: 'SHOW_ACTIVE'
      },
        'Active'),
      ', ',
      r(FilterLink, {
        filter: 'SHOW_COMPLETED'
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
let nextTodoId = 0;
const addTodo = (text: string): AddTodoActionType => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
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

// root container component
const Todos: React.SFC = () =>
  r('div', {}, [
    r(AddTodo),
    r(VisibleTodoList),
    r(Footer)
  ]);

export default Todos;
