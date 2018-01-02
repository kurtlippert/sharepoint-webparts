import { TodoActionType, WebInfoActionType, Filter, WebInfo, FetchWebActionType } from '../types';
import { v4 } from 'node-uuid';
import PageContext from '@microsoft/sp-page-context/lib/PageContext';

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

// export interface LoadWebInfoActionType {
//   type: WebInfoActionType;
//   url: string;
// }
// export const loadWebInfo = (url: string): LoadWebInfoActionType => ({
//   type: 'LOAD_FROM_URL',
//   url,
// });

export interface FetchWebInfoActionType {
  type: WebInfoActionType;
  url: string;
}
export const fetchWebInfo = (pageContext: PageContext): FetchWebInfoActionType => ({
  type: 'FETCH_WEB_INFO',
  url: `${pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
});

export interface LoadWebInfoActionType {
  type: WebInfoActionType;
  items: WebInfo[];
}
export const loadWebItems = (items: WebInfo[]): LoadWebInfoActionType => ({
  type: 'LOAD_ITEMS',
  items,
});
