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
import { Store } from 'redux';
import { Provider } from 'react-redux';

import WebList from '../../components/WebList/WebList.component';
import Todos from '../../components/App';
import { StoreState } from '../../types';
import configureStore from '../configureStore';

export interface HelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<HelloWorldWebPartProps> {
  // Define redux store
  private store: Store<StoreState>;

  // initialize store when webpart is constructed
  public constructor() {
    super();
    this.store = configureStore(this.store);
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

  // subscribe our store to the render function
  protected onInit(): Promise<void> {
    this.store.subscribe(this.render);
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
