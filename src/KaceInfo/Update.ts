// redux
import { Store } from 'redux';
import { Epic } from 'redux-observable';

// rxjs
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// misc
import { fetchKaceMachinesFulfilled, KaceInfoAction, fetchKaceTicketsFulfilled } from './Actions';
import { KaceInfo, initialKaceInfo } from './Model';
import { State } from '../Model';
import { EpicDependencies } from '../Update';

export const fetchKaceMachinesEpic:
  Epic<KaceInfoAction, Store<State>, EpicDependencies> =
    (action$, _, { getJSON }) =>
      action$.ofType('FETCH_MACHINES')
        .mergeMap(() =>
          getJSON('http://localhost:3003/machines')
            .map((value: any) => fetchKaceMachinesFulfilled(value.response)),
        );

export const fetchKaceTicketsEpic:
  Epic<KaceInfoAction, Store<State>, EpicDependencies> =
    (action$, _, { getJSON }) =>
      action$.ofType('FETCH_TICKETS')
        .mergeMap(() =>
          getJSON('https://localhost:3003/tickets')
            // tslint:disable-next-line:no-console
            .map((response) => { console.log(response); return fetchKaceTicketsFulfilled(response); }),
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
    case 'FETCH_TICKETS_FULFILLED':
      return {
        ...state,
        Tickets: [
          ...state.Tickets,
          ...action.payload.Tickets,
        ],
      };
    default:
      return state;
  }
};
