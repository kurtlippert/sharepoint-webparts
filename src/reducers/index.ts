import { Reducer, combineReducers } from 'redux';
import { State, Filter, Todo, WebInfo, KaceInfo } from '../types';
import todos from './todos';
import filter from './filter';
import webInfo from './webInfo';
import kaceInfo, { initialKaceInfo } from './kaceInfo';

export const defaultState: State = {
  todos: [],
  filter: 'SHOW_ALL',
  webInfo: [],
  kaceInfo: initialKaceInfo,
};

export const todosReducer: Reducer<State> = combineReducers<State>({
  todos: todos as Reducer<Todo[]>,
  filter: filter as Reducer<Filter>,
  webInfo: webInfo as Reducer<WebInfo[]>,
  kaceInfo: kaceInfo as Reducer<KaceInfo>,
});
