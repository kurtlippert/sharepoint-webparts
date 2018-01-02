export type Filter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';
export type TodoActionType = 'ADD_TODO' | 'TOGGLE_TODO' | 'SET_VISIBILITY_FILTER';
export type WebInfoActionType = 'FETCH_WEB_INFO' | 'FETCH_WEB_INFO_FULFILLED';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface WebInfo {
  id: string;
  title: string;
}

export interface StoreState {
  todos: Todo[];
  filter: Filter;
  webInfo: WebInfo[];
}
