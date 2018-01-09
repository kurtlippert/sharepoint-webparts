import { WebInfo } from '../types';
import { WebInfoAction } from '../epics';

const webInfo = (state: WebInfo[] = [], action: WebInfoAction): WebInfo[] => {
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
