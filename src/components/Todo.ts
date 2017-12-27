import { createElement as r } from 'react';

export interface TodoProps {
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

export default Todo;
