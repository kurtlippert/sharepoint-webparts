import { WebInfo, Action } from '../types';

const webInfo = (state: WebInfo[] = [], action: Action): WebInfo[] => {
  switch (action.type) {
    case 'FETCH_WEB_INFO_FULFILLED':
      return [
        ...state,
        ...action.payload as WebInfo[],
      ];
    default:
      return state;
  }
};

export default webInfo;
