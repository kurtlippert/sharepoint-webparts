import { Reducer, Store, createStore, GenericStoreEnhancer } from 'redux';
import { State } from '../types';
import { loadState, saveState } from '../localStorage';
import { throttle } from 'lodash';
import { todosReducer } from '../reducers';

const configureStore = (store: Store<State>, middlewares?: GenericStoreEnhancer ) => {
  const preloadedState: State = loadState();
  store =
    createStore(
      todosReducer as Reducer<State>,
      preloadedState,
      middlewares,
    );

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos,
      filter: 'SHOW_ALL',
      webInfo: store.getState().webInfo,
      kaceInfo: store.getState().kaceInfo,
    });
  }, 1000));

  return store;
};

export default configureStore;
