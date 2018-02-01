import { Store } from 'redux';
import { Epic } from 'redux-observable';
import { fetchKaceMachinesFulfilled, KaceInfoAction } from './Actions';
import { KaceInfo, initialKaceInfo } from './Model';
import { State } from '../Model';
import { EpicDependencies } from '../Update';

export const fetchKaceMachinesEpic:
  Epic<KaceInfoAction, Store<State>, EpicDependencies> =
    (action$, _, { ajax }) =>
      action$.ofType('FETCH_MACHINES')
        .mergeMap(() =>
          ajax.get('http://localhost:3003/machines')
            .map(value => fetchKaceMachinesFulfilled(value.response)),
        );

export const kaceInfo = (state: KaceInfo = initialKaceInfo, action: KaceInfoAction): KaceInfo => {
  switch (action.type) {
    case 'FETCH_MACHINES_FULFILLED':
      return {
        ...state,
        Machines: [
          ...state.Machines,
          ...action.payload.Machines,
        ],
      };
    default:
      return state;
  }
};
