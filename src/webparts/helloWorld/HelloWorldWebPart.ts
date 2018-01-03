import { createElement as r } from 'react';
import * as ReactDom from 'react-dom';
import {
  Version,
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  WebPartContext,
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import Example from '../../components/Example/Example.component';
// import { Store, applyMiddleware } from 'redux';
import { Store, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import WebList from '../../components/WebList/WebList.component';
import Todos from '../../components/App';
import { StoreState, WebInfo, WebInfoActionType } from '../../types';
import configureStore from '../configureStore';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
// import { Epic, createEpicMiddleware } from 'redux-observable';
import { Epic, createEpicMiddleware } from 'redux-observable';

import { Observable } from 'rxjs/Observable';
import { fetchWebInfo } from '../../actions/index';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

export interface HelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
}

export const getWebInfo = (webPartContext: WebPartContext, url: string) =>
  webPartContext.spHttpClient
    .get(url, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse): Promise<WebInfo[]> => response.json());

export interface WebInfoPayload {
  id: string;
  title: string;
}

export interface WebInfoAction {
  type: WebInfoActionType;
  payload: WebInfoPayload[];
}

export interface WebInfoDependencies {
  getJSON: (url: string) => Observable<WebInfo[]>;
}

const fetchWebInfoFulfilled = (payload: WebInfoPayload[]): WebInfoAction => ({
  type: 'FETCH_WEB_INFO_FULFILLED',
  payload,
});

export const fetchWebInfoEpic:
  Epic<WebInfoAction, Store<StoreState>, WebInfoDependencies> =
    (action$, _, { getJSON }) =>
      action$.ofType('FETCH_WEB_INFO')
        .mergeMap(() =>
          getJSON('/_api/web/lists?$filter=Hidden eq false')
            .map(response => fetchWebInfoFulfilled(response)),
        );

export default class HelloWorldWebPart extends BaseClientSideWebPart<HelloWorldWebPartProps> {
  // Define redux store
  private store: Store<StoreState>;

  public getContext(): WebPartContext {
    return this.context;
  }

  // initialize store when webpart is constructed
  public constructor() {
    super();

    // tslint:disable-next-line:no-console
    // console.log(this.context.pageContext);

    const epicMiddleware = createEpicMiddleware(fetchWebInfoEpic, {
      dependencies: {
        getJSON: (url: string) =>
          Observable.fromPromise(
            getWebInfo(this.context, this.context.pageContext.web.absoluteUrl + url)),
      },
    });

    this.store = configureStore(this.store, applyMiddleware(epicMiddleware));
    // this.store = configureStore(this.store);
  }

  // using redux-react 'Provider' here in conjunction with the redux-react
  // Note that we have to give 'Provider' a single component.
  // So multiple components nested underneath are wrapped in divs
  public render(): void {
    // tslint:disable-next-line:no-console
    console.log(this.store.getState());

    const root =
      r(Provider, { store: this.store },
        r('div', {}, [
          r(Example, {
            description: this.properties.description,
            test: this.properties.test,
            test1: this.properties.test1,
            test2: this.properties.test2,
            test3: this.properties.test3,
            context: this.context,
          }),
          r(Todos),
          r(WebList),
        ]),
      );

    ReactDom.render(root, this.domElement);
  }

  protected onInit(): Promise<void> {
    // subscribe our store to the render function
    this.store.subscribe(this.render);

    // tslint:disable-next-line:no-console
    console.log(this.context);

    // tslint:disable-next-line:no-console
    // console.log(getWebInfo(
    //   this.context,
    //   `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
    // ));

    // immediately load our weblist on init
    this.store.dispatch(
      fetchWebInfo(),
    );

    return super.onInit();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneTextField('test', {
                  label: 'Multi-line text field',
                  multiline: true,
                }),
                PropertyPaneCheckbox('test1', {
                  text: 'Checkbox',
                }),
                PropertyPaneDropdown('test2', {
                  label: 'Dropdown',
                  options: [
                    { key: '1', text: 'One' },
                    { key: '2', text: 'Two' },
                    { key: '3', text: 'Three' },
                    { key: '4', text: 'Four' },
                  ],
                }),
                PropertyPaneToggle('test3', {
                  label: 'Toggle',
                  onText: 'On',
                  offText: 'Off',
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
