import { State } from '../Model';
import { initialKaceInfo } from '../KaceInfo/Model';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return { kaceInfo: initialKaceInfo } as State;
    }
    return JSON.parse(serializedState) as State;
  } catch (err) {
    return { kaceInfo: initialKaceInfo } as State;
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
