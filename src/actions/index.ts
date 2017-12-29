import { TodoActionType, Filter } from '../types';
import { v4 } from 'node-uuid';

// Action Shape
export interface TodoAction {
  id: string;
  text: string;
  type: TodoActionType;
  filter: Filter;
}

// Action Creators for the app
export interface AddTodoActionType {
  type: TodoActionType;
  id: string;
  text: string;
}

export const addTodo = (text: string): AddTodoActionType => ({
  type: 'ADD_TODO',
  id: v4(),
  text,
});

export interface ToggleTodoActionType {
  type: TodoActionType;
  id: string;
}
export const toggleTodo = (id: string): ToggleTodoActionType => ({
  type: 'TOGGLE_TODO',
  id,
});

export interface SetVisibilityActionType {
  type: TodoActionType;
  filter: Filter;
}
export const setVisibilityFilter = (filter: Filter): SetVisibilityActionType => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});
