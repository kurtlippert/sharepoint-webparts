export type Filter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';
export type TodoActionType = 'ADD_TODO' | 'TOGGLE_TODO' | 'SET_VISIBILITY_FILTER';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface StoreState {
  todos: Todo[];
  filter: Filter;
}
