import { TodoActionType, WebInfoActionType, Filter } from '../types';
import { v4 } from 'uuid';
// import PageContext from '@microsoft/sp-page-context/lib/PageContext';

// Todo Action Shape
export interface TodoAction {
  id: string;
  text: string;
  type: TodoActionType;
  filter: Filter;
}

// Web Info Action Shape
export interface WebInfoAction {
  id: string;
  type: WebInfoActionType;
  url: string;
}

// Action Creators for the app
// Add Todo action
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

// Toggle Todo action
export interface ToggleTodoActionType {
  type: TodoActionType;
  id: string;
}
export const toggleTodo = (id: string): ToggleTodoActionType => ({
  type: 'TOGGLE_TODO',
  id,
});

// Filter toggle action
export interface SetVisibilityActionType {
  type: TodoActionType;
  filter: Filter;
}
export const setVisibilityFilter = (filter: Filter): SetVisibilityActionType => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});

// Fetch web info action
export interface FetchWebInfoActionType {
  type: WebInfoActionType;
}
export const fetchWebInfo = () => ({
  type: 'FETCH_WEB_INFO',
} as FetchWebInfoActionType);
