import { Reducer, combineReducers } from 'redux';
import { Todos, Filter, Todo } from '../types';
import  todos from './todos';
import  filter from './filter';

export const todosReducer: Reducer<Todos> = combineReducers<Todos>({
  todos: todos as Reducer<Todo[]>,
  filter: filter as Reducer<Filter>
});
