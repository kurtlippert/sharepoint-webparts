import { Reducer, combineReducers } from 'redux';
import { StoreState, Filter, Todo } from '../types';
import todos from './todos';
import filter from './filter';

export const defaultState: StoreState = {
  todos: [],
  filter: 'SHOW_ALL',
};

export const todosReducer: Reducer<StoreState> = combineReducers<StoreState>({
  todos: todos as Reducer<Todo[]>,
  filter: filter as Reducer<Filter>,
});
