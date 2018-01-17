import { State } from '../types';
import { initialKaceInfo } from '../reducers/kaceInfo';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return { todos: [], filter: 'SHOW_ALL', webInfo: [], kaceInfo: initialKaceInfo } as State;
    }
    return JSON.parse(serializedState) as State;
  } catch (err) {
    return { todos: [], filter: 'SHOW_ALL', webInfo: [], kaceInfo: initialKaceInfo } as State;
  }
};

export const saveState = (state: State) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
  }
};
