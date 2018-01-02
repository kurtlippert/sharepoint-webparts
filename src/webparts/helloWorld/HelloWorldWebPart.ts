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
import { Store, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import WebList from '../../components/WebList/WebList.component';
import Todos from '../../components/App';
import { StoreState, WebInfo, FetchWebActionType } from '../../types';
import configureStore from '../configureStore';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Epic, createEpicMiddleware } from 'redux-observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
// import SPHttpClient from '@microsoft/sp-http/lib/spHttpClient/SPHttpClient';
// import SPHttpClientResponse from '@microsoft/sp-http/lib/spHttpClient/SPHttpClientResponse';

export interface HelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
}

const getWebInfo = (webPartContext: WebPartContext, url: string) =>
  webPartContext.spHttpClient
    .get(url, SPHttpClient.configurations.v1)
    .then((response: SPHttpClientResponse): Promise<WebInfo[]> => response.json());

interface FetchWebInfoFulfilledPayload {
  id: string;
  title: string;
}

interface FetchWebInfoFulfilledAction {
  type: FetchWebActionType;
  payload: FetchWebInfoFulfilledPayload[];
}

interface WebInfoDependencies {
  context: WebPartContext;
  url: string;
}

const fetchWebInfoFulfilled = (payload: FetchWebInfoFulfilledPayload[]): FetchWebInfoFulfilledAction => ({
  type: 'FETCH_WEB_INFO_FULFILLED',
  payload,
});

const fetchWebInfoEpic:
  Epic<FetchWebInfoFulfilledAction, Store<StoreState>, WebInfoDependencies> =
    (action$, _, { context, url }) =>
      action$.ofType('FETCH_WEB_INFO')
        .mergeMap(() =>
          Observable.fromPromise(getWebInfo(context, url))
            .map(response => fetchWebInfoFulfilled(response)),
        );

const epicMiddleware = createEpicMiddleware(fetchWebInfoEpic);

export default class HelloWorldWebPart extends BaseClientSideWebPart<HelloWorldWebPartProps> {
  // Define redux store
  private store: Store<StoreState>;

  // initialize store when webpart is constructed
  public constructor() {
    super();
    this.store = configureStore(this.store, applyMiddleware(epicMiddleware));
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

    // immediately load our weblist on init
    this.store.dispatch({
      type: 'FETCH_WEB_INFO',
      url: `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
    });

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
