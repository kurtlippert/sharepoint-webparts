import { Todo } from '../types';
import { TodoAction } from '../actions';

// initial state
const defaultTodo: Todo = {
  id: '0',
  text: '',
  completed: false,
};

// todo helper
const todo = (state: Todo, action: TodoAction): Todo => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed,
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
        todo(defaultTodo, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

export default todos;
