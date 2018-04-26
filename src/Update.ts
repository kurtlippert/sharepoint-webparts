import { combineReducers, Reducer, Store } from 'redux'
import { combineEpics, Epic } from 'redux-observable'
// tslint:disable-next-line:no-submodule-imports
import { Observable } from 'rxjs/Observable'
import { State } from './Model'
import { Action } from './TicketQueue/Actions'
import { Ticket, TicketQueue } from './TicketQueue/Model'
import {
  fetchFirstEllipsisPageTicketsEpic, fetchFirstPageTicketsEpic, fetchInitialTicketsEpic,
  fetchLastPageTicketsEpic, fetchNextPageTicketsEpic,
  fetchPreviousPageTicketsEpic, fetchSecondEllipsisPageTicketsEpic,
  fetchSelectedPageTicketsEpic, fetchTicketsWithFilterEpic, fetchTicketsWithStatusFilterEpic,
  ticketQueue,
} from './TicketQueue/Update'

export interface EpicDependencies {
  getJSON: (url: string) => Observable<{ tickets: Ticket[] }>
  getPageCount: (url: string) => Observable<{ pageCount: number, tickets: Ticket[], statuses: string[] }>
}

export const rootReducer = combineReducers<State>({
  ticketQueue: ticketQueue as Reducer<TicketQueue>,
})

export const rootEpic:
  Epic<Action, Store<State>, EpicDependencies> =
  combineEpics<Action, Store<State>, EpicDependencies>(
    fetchInitialTicketsEpic,
    fetchFirstPageTicketsEpic,
    fetchPreviousPageTicketsEpic,
    fetchFirstEllipsisPageTicketsEpic,
    fetchSelectedPageTicketsEpic,
    fetchSecondEllipsisPageTicketsEpic,
    fetchNextPageTicketsEpic,
    fetchLastPageTicketsEpic,
    fetchTicketsWithFilterEpic,
    fetchTicketsWithStatusFilterEpic,
  )
