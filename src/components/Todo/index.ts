import * as React from 'react';
import { createElement as r } from 'react';
import { combineReducers, Reducer, Store, Unsubscribe } from 'redux';

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
  onClick: () => void;
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
  store: Store<TodoReducerMap>;
  children?: React.ReactNode[];
}

class FilterLink extends React.Component<FilterLinkProps, {}> {
  private unsubscribe: Unsubscribe;

  public componentDidMount(): void {
    this.unsubscribe =
      this.props.store.subscribe(() => this.forceUpdate);
  }

  public componentWillUnmount(): void {
    this.unsubscribe();
  }

  public render(): React.SFCElement<LinkProps> {
    const { filter, children, store } = this.props;

    return (
      r(Link, {
        active: filter === store.getState().filter,
        onClick: () =>
          store.dispatch(
            setVisibilityFilter(
              filter
            )
          )
      },
        children)
    );
  }
}

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
  onTodoClick: (todoItemId: number) => void;
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

interface AddTodoProps {
  onAddTodoClick: (todoInput: string) => void;
}

const AddTodo: React.SFC<AddTodoProps> = ({ onAddTodoClick }) => {
  let todoInput: HTMLInputElement;

  return (
    r('div', {}, [
      r('input', {
        ref: node => node === null ? '' : todoInput = node as HTMLInputElement,
        key: 'todo-input'
      }),
      r('button', {
        onClick: () => {
          onAddTodoClick(todoInput.value);
          todoInput.value = '';
        }
      },
        'Add Todo')
    ])
  );
};

interface FooterProps {
  store: Store<TodoReducerMap>;
}

const Footer: React.SFC<FooterProps> = ({ store }) => {
  return (
    r('p', {}, [
      'Show: ',
      r(FilterLink, {
        filter: 'SHOW_ALL',
        store
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

interface VisibleTodoListProps {
  store: Store<TodoReducerMap>;
}

class VisibleTodoList extends React.Component<VisibleTodoListProps, {}> {
  private unsubscribe: Unsubscribe;

  public componentDidMount(): void {
    this.unsubscribe =
      this.props.store.subscribe(() => this.forceUpdate);
  }

  public componentWillUnmount(): void {
    this.unsubscribe();
  }

  public render(): React.SFCElement<TodoListProps> {
    const { todoList, filter } = this.props.store.getState();
    const store = this.props.store;

    return (
      r(TodoList, {
        todoList: getVisibleTodos(todoList, filter),
        onTodoClick: (id: number) =>
          store.dispatch(
            toggleTodo(id)
          )
      })
    );
  }
}

// container component
export interface TodosProps {
  todoList: Todo[];
  filter: Filter;
  store: Store<TodoReducerMap>;
}

// action creators
const addTodo = (id: number, text: string) => ({ type: 'ADD_TODO', id, text });
const toggleTodo = (id: number) => ({ type: 'TOGGLE_TODO', id });
const setVisibilityFilter = (filter: Filter) => ({ type: 'SET_VISIBILITY_FILTER', filter });

let nextTodoId = 0;

const Todos: React.SFC<TodosProps> = ({ store }) =>
  r('div', {}, [
    r(AddTodo, {
      onAddTodoClick: (inputText: string) =>
        store.dispatch(
          addTodo(
            nextTodoId++,
            inputText
          )
        )
    }),
    r(VisibleTodoList, {
      store
    }),
    r(Footer, {
      store
    })
  ]);

export default Todos;
