import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Todo, StoreState, Filter } from '../types';
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

const mapStateToTodoListProps = (store: StoreState) => ({
  todoList: getVisibleTodos(
    store.todos,
    store.filter,
  ),
});

const mapDispatchToTodoListProps = (dispatch: Dispatch<StoreState>) => ({
  onTodoClick: (id: string) =>
    dispatch(
      toggleTodo(
        id,
      ),
    ),
});

export default connect<StateFromProps, DispatchFromProps, void, StoreState>(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps,
)(TodoList as React.SFC<TodoListProps>);
