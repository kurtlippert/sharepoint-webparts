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

import WebList from '../../components/WebList';
import Todos from '../../components/App';
import { StoreState, WebInfo } from '../../types';
import configureStore from '../configureStore';
import { createEpicMiddleware } from 'redux-observable';

import { Observable } from 'rxjs/Observable';
import { fetchWebInfo } from '../../actions';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { fetchWebInfoEpic, WebInfoDependencies } from '../../epics';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { EnvironmentType, Environment } from '@microsoft/sp-core-library';
import { loadState } from '../../localStorage';

export interface HelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
}

const mockData: WebInfo[] = [
  { id: '1', title: 'Mock List' },
  { id: '2', title: 'Mock List 2' },
  { id: '3', title: 'Mock List 3' },
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
            .then((response: SPHttpClientResponse): Promise<WebInfo[]> => response.json())
      );
    default:
      return getMockData;
  }
};

export default class HelloWorldWebPart extends BaseClientSideWebPart<HelloWorldWebPartProps> {
  // Define redux store
  private store: Store<StoreState>;

  public getContext(): WebPartContext {
    return this.context;
  }

  // initialize store when webpart is constructed
  public constructor() {
    super();

    const epicMiddleware = createEpicMiddleware(fetchWebInfoEpic, {
      dependencies: {
        getJSON: (url: string) =>
          Observable.fromPromise(
            getWebInfo(this.context, url)),
      } as WebInfoDependencies,
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
