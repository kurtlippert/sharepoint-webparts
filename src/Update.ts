import { Reducer, Store, combineReducers } from 'redux';
import { State } from './Model';
import { kaceInfo, fetchKaceMachinesEpic, fetchKaceTicketsEpic } from './KaceInfo/Update';
import { KaceInfo } from './KaceInfo/Model';
import { combineEpics, Epic } from 'redux-observable';
import { KaceInfoAction } from './KaceInfo/Actions';
import { Observable } from 'rxjs/Observable';

export interface EpicDependencies {
  getJSON: (url: string) => Observable<KaceInfo>;
}

export const rootReducer = combineReducers<State>({
  kaceInfo: kaceInfo as Reducer<KaceInfo>,
});

export const rootEpic = combineEpics(
  fetchKaceMachinesEpic as Epic<KaceInfoAction, Store<State>, EpicDependencies>,
  fetchKaceTicketsEpic as Epic<KaceInfoAction, Store<State>, EpicDependencies>,
);
