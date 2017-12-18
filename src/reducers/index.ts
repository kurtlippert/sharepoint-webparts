// import { combineReducers, Reducer } from 'redux';

// import webpartReducer, { IWebpartState } from './webpart';

// export interface IState {
//   webpart: IWebpartState;
// }

// export const rootReducer: Reducer<IState> = combineReducers<IState>({
//   webpart: webpartReducer
// });

import { combineReducers, Reducer } from 'redux';

import { todoReducer, TodoState } from '../components/Todo';

export interface State {
    todo: TodoState;
}

export const rootReducer: Reducer<State> = combineReducers<State>({
    todo: todoReducer
});