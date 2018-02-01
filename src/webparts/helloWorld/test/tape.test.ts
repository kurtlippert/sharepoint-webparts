import * as test from 'tape';

import { rootEpic } from '../../../Update';
// import { ActionsObservable, createEpicMiddleware } from 'redux-observable';
import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Rx';
import { AjaxCreationMethod } from 'rxjs/observable/dom/AjaxObservable';
import { KaceInfoAction } from '../../../KaceInfo/Actions';
import { initialKaceInfo, KaceInfo } from '../../../KaceInfo/Model';
// import configureMockStore from 'redux-mock-store';
const nock = require('nock');

type Test = test.Test;

test('fetch kace machine info epic', (t: Test): void => {
  const mockResponse = {
    Machines: [
      {
        Id: '1',
        User: 'test1',
        Name: 'testName',
        Os_name: 'testName_os',
      },
      {
        Id: '2',
        User: 'test2',
        Name: 'testName2',
        Os_name: 'testName_os2',
      },
    ],
  } as KaceInfo;

  const action$ = ActionsObservable.of({
    type: 'FETCH_MACHINES',
    payload: initialKaceInfo } as KaceInfoAction);
  const store: any = null; // not needed for this epic
  const dependencies = {
    getWebInfo: (_: string) => Observable.of(mockResponse),
    ajax: {} as AjaxCreationMethod,
  };

  nock('http://kbox')
    .post('/ams/shared/api/security/login', {
      userName: process.env.API_USER,
      password: process.env.API_PASS,
    })
    .reply(200, '', {
      'x-dell-csrf-token': 'test-token',
    });

  nock('http://kbox', {
      reqheaders: {
        'x-dell-csrf-token': 'test-token',
      },
    })
    .get('/api/inventory/machines')
    .reply(200, {
      machines: [
        'machine1',
        'machine2',
      ],
    });

  rootEpic(action$, store, dependencies )
    .toArray()
    .subscribe((actions) => {
      t.deepEqual(actions, [{
        type: 'FETCH_MACHINES_FULFILLED',
        payload: mockResponse,
      }]);
    });

  nock.cleanAll();

  t.end();
});
