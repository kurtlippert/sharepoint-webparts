import { Reducer, Store, createStore } from 'redux';
import { StoreState } from '../types';
import { loadState, saveState } from '../localStorage';
import { throttle } from 'lodash';
import { todosReducer } from '../reducers';

const configureStore = (store: Store<StoreState>) => {
  const preloadedState: StoreState = loadState();
  store =
    createStore(
      todosReducer as Reducer<StoreState>,
      preloadedState,
    );

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos,
      filter: 'SHOW_ALL',
    });
  }, 1000));

  return store;
};

export default configureStore;
