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
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base'
import PageContext from '@microsoft/sp-page-context/lib/PageContext'
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset'

import * as strings from 'HelloWorldWebPartStrings'
import MockHttpClient from './MockHttpClient'
import { from, Stream, empty } from 'most';

import IHelloWorldWebPartProps from './IHelloWorldWebPartProps'
import styles from '../../Layout.module.scss'
import { style } from 'typestyle'
import { padding, margin, maxWidth, fontWeightNormal, fontWeightBold } from 'csstips'
// import * as styles from '@microsoft/sp-office-ui-fabric-core'
// import styles from './HelloWorld.module.scss'
// import HelloWorld from './components/HelloWorld'

export interface ISPLists {
  value: ISPList[]
}

export interface ISPList {
  Title: string
  Id: string
}

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

const spUrl = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`

const getMockListData: Promise<ISPLists> = MockHttpClient.then((response) => ({ value: response }))

const getListData = (url: string): Promise<ISPLists> =>
  this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
// .then((response: SPHttpClientResponse) => response.json)

const mockListData = from([]).map(getMockListData)
const listData = from(spUrl).map(getListData)

const renderListAsync = () => {
  switch (Environment.type) {
    case EnvironmentType.Local:
      getMockListData.then((response) => renderList(response.value)); break
    case EnvironmentType.SharePoint:
    case EnvironmentType.ClassicSharePoint:
      getListData.then((response) => renderList(response.value)); break
  }
}

const listStyle = style(
  margin(10),
  padding(10),
  fontWeightNormal,
  {
    color: '#333333',
    fontFamily: `'Segoe UI Regular WestEuropean', 'Segoe UI', Tahoma, Arial, sans-serif`,
    fontSize: '14px',
    boxSizing: 'border-box',
    lineHeight: '50px',
    listStyleType: 'none',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
  }
)

const listItemStyle = style(
  margin(0),
  padding(0),
  padding(9, 28, 3, 28),
  fontWeightNormal,
  {
    color: '#333333',
    verticalAlign: 'center',
    fontFamily: `'Segoe UI Regular WestEuropean', 'Segoe UI', Tahoma, Arial, sans-serif`,
    fontSize: 14,
    boxSizing: 'border-box',
    boxShadow: 'none',
    zoom: 1,
    position: 'relative'
  }
)

const r = React.createElement

const renderList = (items: ISPList[]) =>
  items.map(item => 
    r('ul', { className: listStyle }, [
      r('li', { className: listItemStyle }, [
        r('span', { className: 'ms-font-l' }, item.Title)
      ])
    ])
  ).join('')

const HelloWorld = ({ description, test, pageContext }: IHelloWorldWebPartProps) =>
  r('div', { className: styles.helloWorld }, [
    r('div', { className: styles.container }, [
      r('div', { className: styles.row }, [
        r('div', { className: styles.column }, [
          r('span', { className: styles.title }, "Welcome to SharePoint!"),
          r('p', { className: styles.subTitle }, "Customize SharePoint experiences using Web Parts."),
          r('p', { className: styles.description }, escape(description)),
          r('p', { className: styles.description }, escape(test)),
          r('p', { className: styles.description }, `Loading from ${escape(pageContext.web.title)}`),
          r('a', { href: "https://aka.ms/spfx", className: styles.button }, [
            r('span', { className: styles.label }, "Learn more")
          ])
        ])
      ])
    ])
  ])


export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  // private _getMockListData(): Promise<ISPLists> {
  //   return MockHttpClient.then(ispList => ({ value: ispList }))
  // }

  // private _getListData(): Promise<ISPLists> {
  //   return this.context.spHttpClient.get(
  //       this.context.pageContext.web.absoluteUrl + 
  //       `/_api/web/lists?$filter=Hidden eq false`, 
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
    const element: React.ReactElement<IHelloWorldWebPartProps> = React.createElement(
      HelloWorld,
      {
        description: this.properties.description,
        test: this.properties.test,
        test1: this.properties.test1,
        test2: this.properties.test2,
        test3: this.properties.test3,
        pageContext: this.context.pageContext
      }
    )

    ReactDom.render(element, this.domElement)
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
