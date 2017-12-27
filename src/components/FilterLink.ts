import { StatelessComponent, ComponentClass } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Filter, Todos } from '../types';
import { setVisibilityFilter } from '../actions';
import { Link } from './Link';

export interface FilterLinkProps {
  filter: Filter;
  children?: React.ReactNode[];
}

const mapStateToLinkProps = (state: Todos, ownProps: FilterLinkProps) => ({
  active: state.filter === ownProps.filter
});
const mapDispatchToLinkProps = (dispatch: Dispatch<Todos>, ownProps: FilterLinkProps) => ({
  onLinkClick: () =>
    dispatch(
      setVisibilityFilter(
        ownProps.filter
      )
    )
});
export const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);
