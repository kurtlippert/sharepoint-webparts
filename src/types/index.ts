export type Filter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';
export type TodoActionType = 'ADD_TODO' | 'TOGGLE_TODO' | 'SET_VISIBILITY_FILTER';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  filter: Filter;
}

export interface Store {
  todos: Todo[];
  filter: Filter;
}
