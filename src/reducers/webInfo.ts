// import { WebInfo } from '../types';
// import { WebInfoAction } from '../actions';
import {
  WebInfoPayload,
  WebInfoAction,
} from '../epics';
// import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
// import SPHttpClientResponse from '@microsoft/sp-http/lib/spHttpClient/SPHttpClientResponse';
// import SPHttpClient from '@microsoft/sp-http/lib/spHttpClient/SPHttpClient';

// const getWebInfo = (webPartContext: WebPartContext, url: string) =>
//   webPartContext.spHttpClient
//     .get(url, SPHttpClient.configurations.v1)
//     .then((response: SPHttpClientResponse): Promise<WebInfo[]> => response.json());

const webInfo = (state: WebInfoPayload[] = [], action: WebInfoAction): WebInfoPayload[] => {
  switch (action.type) {
    case 'FETCH_WEB_INFO_FULFILLED':
      return [
        ...state,
        ...action.payload,
      ];
    default:
      return state;
  }
};

export default webInfo;
