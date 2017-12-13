import * as React from 'react'
import * as ReactDom from 'react-dom'
import { 
  Version,
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library'
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  WebPartContext
} from '@microsoft/sp-webpart-base'
import PageContext from '@microsoft/sp-page-context/lib/PageContext'
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
// import { escape } from '@microsoft/sp-lodash-subset'

import * as strings from 'HelloWorldWebPartStrings'
import Example from '../../components/Example/Example.component'
import IExampleProps from '../../components/Example/Example.props';
// import MockHttpClient from './MockHttpClient'

// import styles from '../../Layout.module.scss'
// import { style } from 'typestyle'
// import { padding, margin, maxWidth, fontWeightNormal, fontWeightBold } from 'csstips'
// import { from, Stream, fromPromise, just, subscribe } from 'most'
// import * as styles from '@microsoft/sp-office-ui-fabric-core'
// import styles from './HelloWorld.module.scss'
// import HelloWorld from './components/HelloWorld'



// export interface IHelloWorldWebPartProps {
//   description: string;
//   test: string;
//   test1: boolean;
//   test2: string;
//   test3: boolean;
//   context: WebPartContext;
// }

// export interface ISPLists {
//   value: ISPList[]
// }

// export interface ISPList {
//   Title: string
//   Id: string
// }

// const getMockListData: Promise<ISPLists> = 
//   MockHttpClient.then((response: ISPList[]) => ({ value: response }))

// const getMockListData = (ispList: ISPList) =>
//   Promise.resolve(ispList)

// const fetchContent: Promise<ISPList> = (url: string) =>
//   // Promise.resolve(url)
//   this.context.spHttpClient.get(
//     `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
//     SPHttpClient.configurations.v1
//   )

// const streamOfPromises = (url: string) =>
//   from(url).map(fetchContent)

// Get mock data
// const getMockListData = MockHttpClient

// // Get real data
// const getListData = (webPartContext: WebPartContext) =>
//   webPartContext.spHttpClient.get(
//     `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
//     SPHttpClient.configurations.v1)
//       .then((response: SPHttpClientResponse): Promise<ISPList[]> => response.json()) 

// Create stream object for the request
// const spUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`
// const request = just(spUrl)

// // Get back a stream for the response
// const response = (webPartContext: WebPartContext): Stream<ISPList[]> =>
//   request.flatMap(requestUrl => fromPromise(getListData(requestUrl, webPartContext)))

// const mockListData = fromPromise(getMockListData)
// const listData = fromPromise(getListData)

// const renderListAsync = (webPartContext: WebPartContext, selector: string) => {
//   switch (Environment.type) {
//     case EnvironmentType.Local:
//       getMockListData.then((ispList) => renderList(ispList, selector)); break
//     case EnvironmentType.SharePoint:
//     case EnvironmentType.ClassicSharePoint:
//       getListData(webPartContext).then((ispList) => renderList(ispList, selector)); break
//   }
// }

// const listStyle = style(
//   margin(10),
//   padding(10),
//   fontWeightNormal,
//   {
//     color: '#333333',
//     fontFamily: `'Segoe UI Regular WestEuropean', 'Segoe UI', Tahoma, Arial, sans-serif`,
//     fontSize: '14px',
//     boxSizing: 'border-box',
//     lineHeight: '50px',
//     listStyleType: 'none',
//     boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
//   }
// )

// const listItemStyle = style(
//   margin(0),
//   padding(0),
//   padding(9, 28, 3, 28),
//   fontWeightNormal,
//   {
//     color: '#333333',
//     verticalAlign: 'center',
//     fontFamily: `'Segoe UI Regular WestEuropean', 'Segoe UI', Tahoma, Arial, sans-serif`,
//     fontSize: 14,
//     boxSizing: 'border-box',
//     boxShadow: 'none',
//     zoom: 1,
//     position: 'relative'
//   }
// )

// const r = React.createElement

// function renderList(items: ISPList[], selector: string): void {
//   const html: string = 
//     items.map(item => 
//       r('ul', { className: listStyle }, [
//         r('li', { className: listItemStyle }, [
//           r('span', { className: 'ms-font-l' }, item.Title)
//         ])
//       ])
//     ).join('')

//   const listContainer: Element = this.domElement.querySelector(selector)
//   listContainer.innerHTML = html
// }

// const HelloWorld = ({ description, test, context }: IHelloWorldWebPartProps) =>
//   r('div', { className: styles.helloWorld }, [
//     r('div', { className: styles.container }, [
//       r('div', { className: styles.row }, [
//         r('div', { className: styles.column }, [
//           r('span', { className: styles.title }, "Welcome to SharePoint!"),
//           r('p', { className: styles.subTitle }, "Customize SharePoint experiences using Web Parts."),
//           r('p', { className: styles.description }, escape(description)),
//           r('p', { className: styles.description }, escape(test)),
//           r('p', { className: styles.description }, `Loading from ${escape(context.pageContext.web.title)}`),
//           r('a', { href: "https://aka.ms/spfx", className: styles.button }, [
//             r('span', { className: styles.label }, "Learn more")
//           ])
//         ])
//       ]),
//       r('div', { id: 'spListContainer' })
//       // renderListAsync(context)
//       // response(context).subscribe((ispList: ISPList[]) => renderList(ispList))
//     ])
//   ])


export default class HelloWorldWebPart extends BaseClientSideWebPart<IExampleProps> {

  // private _getMockListData(): Promise<ISPLists> {
  //   return MockHttpClient.then(ispList => ({ value: ispList }))
  // }

  // private _getListData(): Promise<ISPLists> {
  //   return this.context.spHttpClient.get(
  //       `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
  //       SPHttpClient.configurations.v1)
  //         .then((response: SPHttpClientResponse) => response.json())
  // }

  // private _renderListAsync(): void {
  //   // Local Environment
  //   if (Environment.type === EnvironmentType.Local) {
  //     this._getMockListData().then((response) => this._renderList(response.value))
  //   }
  //   else if (Environment.type === EnvironmentType.SharePoint ||
  //            Environment.type === EnvironmentType.ClassicSharePoint) {
  //     this._getListData().then((response) => this._renderList(response.value))
  //   }
  // }

  // private _renderList(items: ISPList[]): void {
  //   items.map(item => '')
  // }

  public render(): void {
    const root: React.ReactElement<IExampleProps> = 
      // React.createElement('div', {}, [
      React.createElement(
        Example,
        {
          description: this.properties.description,
          test: this.properties.test,
          test1: this.properties.test1,
          test2: this.properties.test2,
          test3: this.properties.test3,
          context: this.context
        }
      )
      // ])
    
    ReactDom.render(root, this.domElement)
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0')
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
    }
  }
}
