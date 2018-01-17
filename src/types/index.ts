export type Filter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';
export type TodoActionType = 'ADD_TODO' | 'TOGGLE_TODO' | 'SET_VISIBILITY_FILTER';

export type WebInfoActionType = 'FETCH_WEB_INFO' | 'FETCH_WEB_INFO_FULFILLED';
export type KaceInfoActionType =
  'LOGIN'
  | 'FETCH_KACE_MACHINES'
  | 'FETCH_KACE_MACHINES_FULFILLED';

export type ActionType = WebInfoActionType | KaceInfoActionType;
export type Payload = WebInfo[] | KaceInfo;

export interface Action {
  type: ActionType;
  payload: Payload;
}

export interface KaceGetHeader {
  'x-dell-csrf-token': string;
  'x-dell-api-version': number;
  'Accept': string;
}

export interface KacePostHeader {
  'Content-Type': string;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// Has to match what is retrieved from API
export interface WebInfo {
  Id: string;
  Title: string;
}

// Machine info from kace API
export interface MachineInfo {
  Id: string;
  User: string;
  Name: string;
  Os_name: string;
}

export interface KaceInfo {
  Machines: MachineInfo[];
}

export interface State {
  todos: Todo[];
  filter: Filter;
  webInfo: WebInfo[];
  kaceInfo: KaceInfo;
}
