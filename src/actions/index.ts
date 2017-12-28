import { TodoActionType, Filter } from '../types';

// Action Shape
export interface TodoAction {
  id: number;
  text: string;
  type: TodoActionType;
  filter: Filter;
}

// Action Creators for the app
export interface AddTodoActionType {
  type: TodoActionType;
  id: number;
  text: string;
}
let nextTodoId = 0;
export const addTodo = (text: string): AddTodoActionType => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

export interface ToggleTodoActionType {
  type: TodoActionType;
  id: number;
}
export const toggleTodo = (id: number): ToggleTodoActionType => ({
  type: 'TOGGLE_TODO',
  id
});

export interface SetVisibilityActionType {
  type: TodoActionType;
  filter: Filter;
}
export const setVisibilityFilter = (filter: Filter): SetVisibilityActionType => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});
