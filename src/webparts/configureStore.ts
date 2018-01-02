import { Reducer, Store, createStore, applyMiddleware, GenericStoreEnhancer } from 'redux';
import { createEpicMiddleware, ofType, Epic } from 'redux-observable';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';
import { StoreState, WebInfo, FetchWebActionType } from '../types';
import { loadState, saveState } from '../localStorage';
import { throttle } from 'lodash';
import { todosReducer } from '../reducers';
// import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
// import { Observable } from 'rxjs/Observable';
// import { WebInfoAction } from '../actions';

const configureStore = (store: Store<StoreState>, middlewares: GenericStoreEnhancer ) => {
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
