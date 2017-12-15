import * as React from 'react';
import { createElement as r } from 'react';
import * as ReactDom from 'react-dom';
import { 
  Version
  // Environment,
  // EnvironmentType
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
// import PageContext from '@microsoft/sp-page-context/lib/PageContext';
import {
  // SPHttpClient,
  // SPHttpClientResponse   
} from '@microsoft/sp-http';

import * as strings from 'HelloWorldWebPartStrings';
import Example from '../../components/Example/Example.component';
// import DefaultContainer from '../../containers/DefaultContainer';
// import { createStore, IState } from '../../store';
// import { applyProperties, updateProperty } from '../../reducers/webpart'
// import { Store } from 'redux';
// import { Provider } from 'react-redux';
// import IHelloWorldWebPartProps from '../../../lib/webparts/helloWorld/IHelloWorldWebPartProps';
// import IHelloWorldWebPartProps from '../../../lib/webparts/helloWorld/IHelloWorldWebPartProps';
// import IExampleProps from '../../components/Example/Example.props';

export interface HelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
}

// export type HelloWorldState = HelloWorldPropValue[];

// export interface HelloWorldPropValue {
//   id: number;
//   value: string | boolean;
// }

export enum ActionType {
  UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION',
  UPDATE_TEST = 'UPDATE_TEST',
  UPDATE_TEST1 = 'UPDATE_TEST1',
  UPDATE_TEST2 = 'UPDATE_TEST2',
  UPDATE_TEST3 = 'UPDATE_TEST3'
}

// export interface HelloWorldAction {
//   id: number;
//   type: HelloWorldActionType;
//   value: string | boolean;
// }

// const helloWorldReducer = (state: HelloWorldState, action: HelloWorldAction): HelloWorldState => {
//   switch (action.type) {
//     case HelloWorldActionType.UPDATE_DESCRIPTION:
//     case HelloWorldActionType.UPDATE_TEST:
//     case HelloWorldActionType.UPDATE_TEST2:
//       return [
//         ...state,
//         {
//           id: action.id,
//           value: action.value as string
//         }
//       ];
//     case HelloWorldActionType.UPDATE_TEST1:
//     case HelloWorldActionType.UPDATE_TEST3:
//       return [
//         ...state,
//         {
//           id: action.id,
//           value: action.value as boolean
//         }
//       ];
//     default:
//       return state;
//   }
// };

// const initialState: HelloWorldState = [
//   { id: 0, value: 'HelloWorld' },
//   { id: 1, value: 'Multi-line text field' },
//   { id: 2, value: true },
//   { id: 3, value: '1' },
//   { id: 4, value: true }
// ];

interface Action {
  type: ActionType;
  value: string | boolean;
}

interface State {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}

const initState: State = {
  description: 'HelloWorld',
  test: 'Multi-line text field',
  test1: true,
  test2: '1',
  test3: true
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.UPDATE_DESCRIPTION:
      return {
        ...state,
        description: action.value as string
      };
    case ActionType.UPDATE_TEST:
      return {
        ...state,
        test: action.value as string
      };
    case ActionType.UPDATE_TEST1:
      return {
        ...state,
        test1: action.value as boolean
      };
    case ActionType.UPDATE_TEST2:
      return {
        ...state,
        test2: action.value as string
      };
    case ActionType.UPDATE_TEST3:
      return {
        ...state,
        test3: action.value as boolean
      };
    default:
      return state;
  }
};

const testUpdateProperty = (): void => {
  const stateBefore: State = initialState; 
  const action: Action = {
    type: HelloWorldActionType.UPDATE_DESCRIPTION,
    value: 'updated description' 
  };
  const stateAfter: State = {
    description: 'update descrpition',
    test: 'Multi-line text field',
    test1: true,
    test2: '1',
    test3: true   
  };

};

export default class HelloWorldWebPart extends BaseClientSideWebPart<HelloWorldWebPartProps> {
  // Define redux store
  // private store: Store<IState>

  // // // initialize store when webpart is constructed
  // public constructor(context: WebPartContext) {
  //   super()
  //   this.store = createStore()
  // }

  public render(): void {
    if (this.renderedOnce) { return; }

    // const root: React.ReactElement<IHelloWorldWebPartProps> = 
    //   React.createElement(
    //     Example,
    //     {
    //       description: this.properties.description,
    //       test: this.properties.test,
    //       context: this.context
    //     }
    //   )

    const root: React.ReactElement<HelloWorldWebPartProps> = 
      // r(Provider, { store: this.store })
      r(Example,
        {
          description: this.properties.description,
          test: this.properties.test,
          test1: this.properties.test1,
          test2: this.properties.test2,
          test3: this.properties.test3,
          context: this.context
        }
      );
    
    ReactDom.render(root, this.domElement);
  }

  // // Don't want to dispatch action if we have reactive mode disabled
  // // Note: this property is set to false by default
  // protected onPropertyPaneFieldChanged(
  //   propertyPath: string, 
  //   oldValue: string | boolean,
  //   newValue: string | boolean): void {
  //   if (!this.disableReactivePropertyChanges) {
  //     this.store.dispatch(updateProperty(propertyPath, newValue))
  //   }
  // }

  // protected onInit() {
  //   this.store.dispatch(applyProperties(this.properties))
  //   return Promise.resolve(true)
  // }

  // protected onAfterPropertyPaneChangesApplied() {
  //   this.store.dispatch(applyProperties(this.properties))
  // }

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
