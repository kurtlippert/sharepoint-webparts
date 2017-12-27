import * as React from 'react';
import { createElement as r } from 'react';
import { combineReducers, Reducer, Store, Dispatch } from 'redux';
import { connect, DispatchProp } from 'react-redux';

// state


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


// gets sent to our root web part to do stuff with
export const todosReducer: Reducer<Todos> = combineReducers<Todos>({
  todoList: todos as Reducer<Todo[]>,
  filter: visibilityFilter as Reducer<Filter>
});





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
const mapStateToTodoListProps = (props: Todos) => ({
  todoList: getVisibleTodos(
    props.todoList,
    props.filter
  )
});
const mapDispatchToTodoListProps = (dispatch: Dispatch<Todos>) => ({
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


// root container component
const Todos: React.SFC = () =>
  r('div', {}, [
    r(AddTodo),
    r(VisibleTodoList),
    r(Footer)
  ]);

export default Todos;
