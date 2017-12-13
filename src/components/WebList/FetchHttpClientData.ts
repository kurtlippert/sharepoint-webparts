import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

import { renderList } from './WebList.component'

export interface ISPList {
  Title: string
  Id: string
}

const mockData: ISPList[] = [
    { Title: 'Mock List', Id: '1' },
    { Title: 'Mock List 2', Id: '2' },
    { Title: 'Mock List 3', Id: '3' },
]

const MockHttpClient = 
    new Promise<ISPList[]>((resolve) => resolve(mockData));

// Get mock data for local
const getMockListData = MockHttpClient

// Get real data
const getListData = (webPartContext: WebPartContext) =>
  webPartContext.spHttpClient.get(
    `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
    SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse): Promise<ISPList[]> => response.json()) 

// 
const renderListAsync = (webPartContext: WebPartContext, selector: string) => {
  switch (Environment.type) {
    case EnvironmentType.Local:
      getMockListData.then((ispList) => renderList(ispList, selector)); break
    case EnvironmentType.SharePoint:
    case EnvironmentType.ClassicSharePoint:
      getListData(webPartContext).then((ispList) => renderList(ispList, selector)); break
  }
}