import { KaceInfo } from './Model';

export interface KaceInfoActionFetch {
  type: 'FETCH_MACHINES' | 'FETCH_ACCOUNTS' | 'FETCH_TICKETS';
}

export interface KaceInfoActionFetchFulfilled {
  type: 'FETCH_MACHINES_FULFILLED' | 'FETCH_ACCOUNTS_FULFILLED' | 'FETCH_TICKETS_FULFILLED';
  payload: KaceInfo;
}

export type KaceInfoAction = KaceInfoActionFetch | KaceInfoActionFetchFulfilled;

export const fetchKaceMachines = (): KaceInfoAction => ({
  type: 'FETCH_MACHINES',
});

export const fetchKaceMachinesFulfilled = (payload: KaceInfo): KaceInfoAction => ({
  type: 'FETCH_MACHINES_FULFILLED',
  payload,
});

export const fetchKaceTickets = (): KaceInfoAction => ({
  type: 'FETCH_TICKETS',
});

export const fetchKaceTicketsFulfilled = (payload: KaceInfo): KaceInfoAction => ({
  type: 'FETCH_TICKETS_FULFILLED',
  payload,
});
