import { Filter } from '../types';
import { TodoAction } from '../actions';

// visibility reducer
const filter = (state: Filter = 'SHOW_ALL', action: TodoAction): Filter => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default filter;
