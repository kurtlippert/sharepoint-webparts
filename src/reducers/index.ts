import { Reducer, combineReducers } from 'redux';
import { StoreState, Filter, Todo, WebInfo } from '../types';
import todos from './todos';
import filter from './filter';
import webInfo from './webInfo';

export const defaultState: StoreState = {
  todos: [],
  filter: 'SHOW_ALL',
  webInfo: [],
};

export const todosReducer: Reducer<StoreState> = combineReducers<StoreState>({
  todos: todos as Reducer<Todo[]>,
  filter: filter as Reducer<Filter>,
  webInfo: webInfo as Reducer<WebInfo[]>,
});
