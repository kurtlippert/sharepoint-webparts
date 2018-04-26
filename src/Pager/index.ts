// react
import * as React from 'react'
// import { ComponentClass, StatelessComponent } from 'react';

// redux
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

// libs
import { PaginationModelOptions } from 'ultimate-pagination'

// components
import { State } from '../Model'
import { Pager, PagerProps } from './View'

const mapStateToPagerProps = (state: State) => ({ paginationModelOptions: state.ticketQueue.PagerOptions })
const mapDispatchToPagerProps = (dispatch: Dispatch<State>) => ({ dispatch })

interface StateToPager {
  paginationModelOptions: PaginationModelOptions
}

interface DispatchToPager {
  dispatch: Dispatch<State>
}

const _Pager: any = connect<StateToPager, DispatchToPager, void, State>(
  mapStateToPagerProps,
  mapDispatchToPagerProps,
)(Pager as React.SFC<PagerProps>)

export default _Pager
