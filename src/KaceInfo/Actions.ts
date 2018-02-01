import { KaceInfo, initialKaceInfo } from './Model';

export type KaceInfoActionType =
  | 'FETCH_MACHINES'
  | 'FETCH_MACHINES_FULFILLED'
  | 'FETCH_ACCOUNTS'
  | 'FETCH_ACCOUNTS_FULFILLED';

export interface KaceInfoAction {
  type: KaceInfoActionType;
  payload: KaceInfo;
}

export const fetchKaceMachines = (): KaceInfoAction => ({
  type: 'FETCH_MACHINES',
  payload: initialKaceInfo,
});

export const fetchKaceMachinesFulfilled = (payload: KaceInfo): KaceInfoAction => ({
  type: 'FETCH_MACHINES_FULFILLED',
  payload,
});
