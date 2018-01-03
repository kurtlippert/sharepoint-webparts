import { Reducer, Store, createStore, GenericStoreEnhancer } from 'redux';
import { StoreState } from '../types';
import { loadState, saveState } from '../localStorage';
import { throttle } from 'lodash';
import { todosReducer } from '../reducers';

const configureStore = (store: Store<StoreState>, middlewares?: GenericStoreEnhancer ) => {
  const preloadedState: StoreState = loadState();
  store =
    createStore(
      todosReducer as Reducer<StoreState>,
      preloadedState,
      middlewares,
    );

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos,
      filter: 'SHOW_ALL',
      webInfo: store.getState().webInfo,
    });
  }, 1000));

  return store;
};

export default configureStore;
