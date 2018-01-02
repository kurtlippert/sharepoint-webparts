import { WebInfo } from '../types';
import { WebInfoAction } from '../actions';
// import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
// import SPHttpClientResponse from '@microsoft/sp-http/lib/spHttpClient/SPHttpClientResponse';
// import SPHttpClient from '@microsoft/sp-http/lib/spHttpClient/SPHttpClient';

// const getWebInfo = (webPartContext: WebPartContext, url: string) =>
//   webPartContext.spHttpClient
//     .get(url, SPHttpClient.configurations.v1)
//     .then((response: SPHttpClientResponse): Promise<WebInfo[]> => response.json());

const webInfo = (state: WebInfo[] = [], action: WebInfoAction): WebInfo[] => {
  switch (action.type) {
    case 'LOAD_ITEMS':
      return [
        ...state,
        ...action.items,
      ];
    default:
      return state;
  }
};

export default webInfo;
