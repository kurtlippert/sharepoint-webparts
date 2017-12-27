import { ComponentClass, StatelessComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Todo, Todos, Filter } from '../types';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { TodoListProps } from './TodoList';

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

export default VisibleTodoList;
