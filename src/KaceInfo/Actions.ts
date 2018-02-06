import { KaceInfo } from './Model';

export interface KaceInfoActionFetch {
  type: 'FETCH_MACHINES' | 'FETCH_ACCOUNTS';
}

export interface KaceInfoActionFetchFulfilled {
  type: 'FETCH_MACHINES_FULFILLED' | 'FETCH_ACCOUNTS_FULFILLED';
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
