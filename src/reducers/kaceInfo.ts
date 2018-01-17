import { Action, KaceInfo } from '../types';

export const initialKaceInfo = {
  Machines: [],
};

const kaceInfo = (state: KaceInfo = initialKaceInfo, action: Action): KaceInfo => {
  switch (action.type) {
    case 'FETCH_KACE_MACHINES_FULFILLED':
      return {
        ...state,
        Machines: [
          ...state.Machines,
          ...(action.payload as KaceInfo).Machines,
        ],
      };
    default:
      return state;
  }
};

export default kaceInfo;
