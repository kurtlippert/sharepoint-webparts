import { Store, createStore, GenericStoreEnhancer } from 'redux';
import { State } from '../Model';
import { loadState, saveState } from '../localStorage';
import { throttle } from 'lodash';
import { rootReducer } from '../Update';

const configureStore = (store: Store<State>, middlewares?: GenericStoreEnhancer ) => {
  const preloadedState: State = loadState();
  store =
    createStore(
      rootReducer,
      preloadedState,
      middlewares,
    );

  store.subscribe(throttle(() => {
    saveState({
      kaceInfo: store.getState().kaceInfo,
    });
  }, 1000));

  return store;
};

export default configureStore;
