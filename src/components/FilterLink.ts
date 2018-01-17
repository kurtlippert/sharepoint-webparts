import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Filter, State } from '../types';
import { setVisibilityFilter, SetVisibilityActionType } from '../actions';
import Link from './Link';

export interface LinkProps {
  active: boolean;
  onLinkClick: () => SetVisibilityActionType;
  children?: React.ReactNode[];
}

export interface FilterLinkProps {
  filter: Filter;
  children?: React.ReactNode[];
}

interface StateToLink {
  active: boolean;
}

interface DispatchToLink {
  onLinkClick: () => SetVisibilityActionType;
}

export const mapStateToLinkProps = (store: State, ownProps: FilterLinkProps) => ({
  active: store.filter === ownProps.filter,
});

export const mapDispatchToLinkProps = (dispatch: Dispatch<State>, ownProps: FilterLinkProps) => ({
  onLinkClick: () =>
    dispatch(
      setVisibilityFilter(
        ownProps.filter,
      ),
    ),
});

export default connect<StateToLink, DispatchToLink, FilterLinkProps, State>(
  mapStateToLinkProps,
  mapDispatchToLinkProps)(Link);
