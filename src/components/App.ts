import { createElement as r } from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';

const Todos: React.SFC = () =>
  r('div', {}, [
    r(AddTodo),
    r(VisibleTodoList),
    r(Footer),
  ]);

export default Todos;
