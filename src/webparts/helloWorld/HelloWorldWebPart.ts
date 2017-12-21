import { createElement as r } from 'react';
import * as ReactDom from 'react-dom';
import {
  Version
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  WebPartContext
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloWorldWebPartStrings';
import Example from '../../components/Example/Example.component';
import { createStore, Store, Reducer } from 'redux';

import WebList from '../../components/WebList/WebList.component';
import Todo, { TodoReducerMap } from '../../components/Todo';

import { todosReducer } from '../../components/Todo';

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
  private store: Store<TodoReducerMap>;

  // initialize store when webpart is constructed
  public constructor() {
    super();

    this.store = createStore(todosReducer as Reducer<TodoReducerMap>);
  }

  public render(): void {

    const root =
      r('div', {}, [
        r(Example, {
          description: this.properties.description,
          test: this.properties.test,
          test1: this.properties.test1,
          test2: this.properties.test2,
          test3: this.properties.test3,
          context: this.context
        }
        ),
        r(Todo, {
          ...this.store.getState(),
          store: this.store
        }),
        r(WebList)
      ]
      );

    ReactDom.render(root, this.domElement);
  }

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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('test', {
                  label: 'Multi-line text field',
                  multiline: true
                }),
                PropertyPaneCheckbox('test1', {
                  text: 'Checkbox'
                }),
                PropertyPaneDropdown('test2', {
                  label: 'Dropdown',
                  options: [
                    { key: '1', text: 'One' },
                    { key: '2', text: 'Two' },
                    { key: '3', text: 'Three' },
                    { key: '4', text: 'Four' }
                  ]
                }),
                PropertyPaneToggle('test3', {
                  label: 'Toggle',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
