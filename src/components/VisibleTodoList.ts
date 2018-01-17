import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Todo, State, Filter } from '../types';
import { toggleTodo, ToggleTodoActionType, AddTodoActionType } from '../actions';
import TodoList from './TodoList';

// helper function
// given a list of todo items,
// return those that match the provided filter
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

export interface TodoListProps {
  todoList: Todo[];
  onTodoClick: (todoItemId: string) => AddTodoActionType;
}

interface StateFromProps {
  todoList: Todo[];
}

interface DispatchFromProps {
  onTodoClick: (id: string) => ToggleTodoActionType;
}

const mapStateToTodoListProps = (store: State) => ({
  todoList: getVisibleTodos(
    store.todos,
    store.filter,
  ),
});

const mapDispatchToTodoListProps = (dispatch: Dispatch<State>) => ({
  onTodoClick: (id: string) =>
    dispatch(
      toggleTodo(
        id,
      ),
    ),
});

export default connect<StateFromProps, DispatchFromProps, void, State>(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps,
)(TodoList as React.SFC<TodoListProps>);
