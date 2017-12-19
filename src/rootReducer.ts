import { combineReducers, Reducer } from 'redux';
import { todosReducer } from './components/Todo';
import { State } from './rootState';

const RootReducer: Reducer<State> =  combineReducers<State>({
   todos: todosReducer 
});

export default RootReducer;