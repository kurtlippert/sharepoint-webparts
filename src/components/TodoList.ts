import { createElement as r } from 'react';
import { AddTodoActionType } from '../actions';
import { Todo as TodoType } from '../types';
import Todo from './Todo';

export interface TodoListProps {
  todoList: TodoType[];
  onTodoClick: (todoItemId: number) => AddTodoActionType;
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

export default TodoList;
