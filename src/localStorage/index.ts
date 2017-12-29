import { StoreState } from '../types';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return { todos: [], filter: 'SHOW_ALL' } as StoreState;
    }
    return JSON.parse(serializedState) as StoreState;
  } catch (err) {
    return { todos: [], filter: 'SHOW_ALL' } as StoreState;
  }
};

export const saveState = (state: StoreState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  }
};
