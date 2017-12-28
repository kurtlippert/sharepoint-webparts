import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Filter, Store } from '../types';
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

export const mapStateToLinkProps = (store: Store, ownProps: FilterLinkProps) => ({
  active: store.filter === ownProps.filter
});

export const mapDispatchToLinkProps = (dispatch: Dispatch<Store>, ownProps: FilterLinkProps) => ({
  onLinkClick: () =>
    dispatch(
      setVisibilityFilter(
        ownProps.filter
      )
    )
});

// interface AppProps extends FilterLinkProps, StateFromProps, DispatchFromProps {}

// export const FilterLink: React.ComponentClass<FilterLinkProps> =
//   connect<StateFromProps, DispatchFromProps, AppProps>(
//   mapStateToLinkProps,
//   mapDispatchToLinkProps
// )(Link);

/** LinkProps */
export default connect<StateToLink, DispatchToLink, FilterLinkProps, Store>(
  mapStateToLinkProps,
  mapDispatchToLinkProps)(Link);
