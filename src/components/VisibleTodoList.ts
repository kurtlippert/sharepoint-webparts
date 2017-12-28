import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Todo as TodoType, Store, Filter } from '../types';
import { toggleTodo, ToggleTodoActionType, AddTodoActionType } from '../actions';
import Todo from './Todo';

// helper function
// given a list of todo items,
// return those that match the provided filter
const getVisibleTodos = (todoItems: TodoType[], filter: Filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todoItems;
    case 'SHOW_COMPLETED':
      return todoItems.filter(todoItem => todoItem.completed);
    case 'SHOW_ACTIVE':
      return todoItems.filter(todoItem => !todoItem.completed);
  }
};

// presentational component
// NOTE: have to export as part of the container component export
export interface TodoListProps {
  todoList: TodoType[];
  onTodoClick: (todoItemId: number) => AddTodoActionType;
}

const r = React.createElement;

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

// container component
interface StateFromProps {
  todoList: TodoType[];
}

interface DispatchFromProps {
  onTodoClick: (id: number) => ToggleTodoActionType;
}

const mapStateToTodoListProps = (store: Store) => ({
  todoList: getVisibleTodos(
    store.todos,
    store.filter
  )
});

const mapDispatchToTodoListProps = (dispatch: Dispatch<Store>) => ({
  onTodoClick: (id: number) =>
    dispatch(
      toggleTodo(
        id
      )
    )
});

export default connect<StateFromProps, DispatchFromProps, void, Store>(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);
