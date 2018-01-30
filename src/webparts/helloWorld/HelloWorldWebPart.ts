import { createElement as r } from 'react';
import * as ReactDom from 'react-dom';
import {
  Version,
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  WebPartContext,
} from '@microsoft/sp-webpart-base';

import { Store, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import WebList from '../../components/WebList';
import KaceList from '../../components/KaceList';
import Todos from '../../components/App';
import { State, WebInfo } from '../../types';
import configureStore from '../configureStore';
import { createEpicMiddleware } from 'redux-observable';

import { Observable } from 'rxjs/Rx';
import { fetchWebInfo, fetchKaceMachines } from '../../actions';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import rootEpic, { EpicDependencies } from '../../epics';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { EnvironmentType, Environment } from '@microsoft/sp-core-library';
import { loadState } from '../../localStorage';
import { ajax } from 'rxjs/observable/dom/ajax';
import { initialKaceInfo } from '../../reducers/kaceInfo';
import deepEqual = require('deep-equal');

interface SpPayload {
  value: WebInfo[];
}

const mockData: WebInfo[] = [
  { Id: '1', Title: 'Mock List' },
  { Id: '2', Title: 'Mock List 2' },
  { Id: '3', Title: 'Mock List 3' },
];

const getMockData =
  new Promise<WebInfo[]>((resolve) => resolve(mockData));

export const getWebInfo = (webPartContext: WebPartContext, url: string) => {
  switch (Environment.type) {
    case EnvironmentType.Local:
      return getMockData;
    case EnvironmentType.SharePoint:
    case EnvironmentType.ClassicSharePoint:
      return (
        webPartContext.spHttpClient
            .get(webPartContext.pageContext.web.absoluteUrl + url, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse): Promise<WebInfo[]> => response.json().then((data: SpPayload) => data.value))
      );
    default:
      return getMockData;
  }
};

export default class KaceDashboardWebPart extends BaseClientSideWebPart<{}> {
  // Define redux store
  private store: Store<State>;

  public getContext(): WebPartContext {
    return this.context;
  }

  // initialize store when webpart is constructed
  public constructor() {
    super();

    const epicMiddleware = createEpicMiddleware(rootEpic, {
      dependencies: {
        getWebInfo: (url: string) =>
          Observable.fromPromise(
            getWebInfo(this.context, url)),
        ajax,
      } as EpicDependencies,
    });

    this.store = configureStore(this.store, applyMiddleware(epicMiddleware));
  }

  // using redux-react 'Provider' here in conjunction with the redux-react
  // Note that we have to give 'Provider' a single component.
  // So multiple components nested underneath are wrapped in divs
  public render(): void {

    const root =
      r(Provider, { store: this.store },
        r('div', {},
          r(Todos),
          r(WebList),
          r(KaceList),
        ),
      );

    ReactDom.render(root, this.domElement);
  }

  protected onInit(): Promise<void> {
    // subscribe our store to the render function
    this.store.subscribe(this.render);

    // immediately load our weblist on init
    // unless we already have something in local storage
    if (loadState().webInfo.length === 0) {
      this.store.dispatch(
        fetchWebInfo(),
      );
    }

    if (deepEqual(loadState().kaceInfo, initialKaceInfo)) {
      this.store.dispatch(
        fetchKaceMachines(),
      );
    }

    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
