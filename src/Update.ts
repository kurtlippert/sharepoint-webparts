import { Reducer, Store, combineReducers } from 'redux';
import { State } from './Model';
import { kaceInfo, fetchKaceMachinesEpic } from './KaceInfo/Update';
import { KaceInfo } from './KaceInfo/Model';
import { AjaxCreationMethod } from 'rxjs/observable/dom/AjaxObservable';
import { combineEpics, Epic } from 'redux-observable';
import { KaceInfoAction } from './KaceInfo/Actions';

export interface EpicDependencies {
  ajax: AjaxCreationMethod;
}

export const rootReducer = combineReducers<State>({
  kaceInfo: kaceInfo as Reducer<KaceInfo>,
});

export const rootEpic = combineEpics(
  fetchKaceMachinesEpic as Epic<KaceInfoAction, Store<State>, EpicDependencies>,
);
