
// tslint:disable:no-submodule-imports

// react
import * as React from 'react'
const r = React.createElement
import { render } from 'react-dom'

// redux
import { Provider } from 'react-redux'
import { applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import { ajax } from 'rxjs/observable/dom/ajax'
import configureStore from './configureStore'
import { initialTickets } from './TicketQueue/Actions'
import { rootEpic } from './Update'
import App from './View'

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {
    getJSON: ajax.getJSON,
    getPageCount: ajax.getJSON,
  },
})

const store = configureStore(applyMiddleware(epicMiddleware))

// render
render(
  r(Provider, { store },
    r(App),
  ),
  document.getElementById('root'),
)

store.dispatch(
  initialTickets({
    hideFirstAndLastPageLinks: true,
  }),
)
