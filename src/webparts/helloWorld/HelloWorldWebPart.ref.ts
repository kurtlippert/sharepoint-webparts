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
import { createStore, Store, Reducer } from 'redux';
// import { Provider } from 'react-redux';
// import { updateProperty } from '../../reducers/webpart';
// import DefaultContainer from '../../containers/DefaultContainer';
// import { createStore, IState } from '../../store';
// import { applyProperties, updateProperty } from '../../reducers/webpart'
// import { Store } from 'redux';
// import { Provider } from 'react-redux';
// import IHelloWorldWebPartProps from '../../../lib/webparts/helloWorld/IHelloWorldWebPartProps';
// import IHelloWorldWebPartProps from '../../../lib/webparts/helloWorld/IHelloWorldWebPartProps';
// import IExampleProps from '../../components/Example/Example.props';

import WebList from '../../components/WebList/WebList.component';

export interface HelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
}

export enum ActionType {
  NO_OP,
  UPDATE_DESCRIPTION,
  UPDATE_TEST,
  UPDATE_TEST1,
  UPDATE_TEST2,
  UPDATE_TEST3,
  APPLY_PROPERTIES
}

interface Action {
  type: ActionType;
  value: string | boolean | HelloWorldWebPartProps;
}

interface State {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}

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
    case ActionType.APPLY_PROPERTIES:
      return action.value as HelloWorldWebPartProps;
    default:
      return state;
  }
};

const typeToUpdate = (propertyPath: string): ActionType => {
  switch (propertyPath) {
    case 'description':
      return ActionType.UPDATE_DESCRIPTION;
    case 'test':
      return ActionType.UPDATE_TEST;
    case 'test1':
      return ActionType.UPDATE_TEST1;
    case 'test2':
      return ActionType.UPDATE_TEST2;
    case 'test3':
      return ActionType.UPDATE_TEST3;
    default:
      return ActionType.NO_OP;
  }
};

export default class HelloWorldWebPart extends BaseClientSideWebPart<HelloWorldWebPartProps> {
  // Define redux store
  private store: Store<State>;

  // initialize store when webpart is constructed
  public constructor() {
    super();

    this.store = createStore(reducer as Reducer<State>);
  }

  public render(): void {
    // if (this.renderedOnce) { return; }

    // const root: React.ReactElement<IHelloWorldWebPartProps> = 
    //   React.createElement(
    //     Example,
    //     {
    //       description: this.properties.description,
    //       test: this.properties.test,
    //       context: this.context
    //     }
    //   )

    const root = 
      // React.createElement(Provider, { store: this.store },
        // React.createElement(
        //   Provider,
        //   {
        //     store: this.store
        //   },
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
            // r(Todo, {
            //   todos: this.store.getState().todos
            // }),
            r(WebList)
          ]
        );
      //     React.createElement(
      //       Example,
      //       {
      //         description: this.properties.description,
      //         test: this.properties.test,
      //         test1: this.properties.test1,
      //         test2: this.properties.test2,
      //         test3: this.properties.test3,
      //         context: this.context
      //       },
      //       React.createElement(WebList)
      //     // )
      //   // )
      // );    

    ReactDom.render(root, this.domElement);
  }

  // Don't want to dispatch action if we have reactive mode disabled
  // Note: this property is set to false by default
  protected onPropertyPaneFieldChanged(
  propertyPath: string, 
  newValue: string | boolean): void {

    // if (!this.disableReactivePropertyChanges) {
      // this.store.dispatch(updateProperty(propertyPath, newValue));

      // reducer(this.properties, {
      //   type: typeToUpdate(propertyPath),
      //   value: newValue
      // });

      // tslint:disable-next-line:no-console
      // console.log(`${propertyPath}: ${newValue}`);

      // // tslint:disable-next-line:no-console
      // console.log(`before: `);
      // // tslint:disable-next-line:no-console
      // console.log(this.store.getState());

      // returns the new value of the json object, but isn't used currently
      this.store.dispatch({
        type: typeToUpdate(propertyPath),
        value: newValue
      });

      // // tslint:disable-next-line:no-console
      // console.log(`after: `);
      // // tslint:disable-next-line:no-console
      // console.log(this.store.getState());
    // }
  }

  // protected onInit(): Promise<void> {
  //   // this.store.subscribe(this.render);
  //   // tslint:disable-next-line:no-console
  //   console.log('any message?');

  //   // Technically the webpart already has properties, but we want to 
  //   // this.store.dispatch({
  //   //   type: 'APPLY_PROPERTIES',
  //   //   value: this.properties
  //   // });

  //   return Promise.resolve();
  //   // this.store.dispatch(applyProperties(this.properties))
  //   // return Promise.resolve(true)
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
