import { createElement as r } from 'react';
import FilterLink from './FilterLink';

const Footer: React.SFC = () => {
  return (
    r('p', {},
      'Show: ',
      r(FilterLink, { filter: 'SHOW_ALL' }, 'All'),
      ', ',
      r(FilterLink, { filter: 'SHOW_ACTIVE' }, 'Active'),
      ', ',
      r(FilterLink, { filter: 'SHOW_COMPLETED' }, 'Completed'),
    )
  );
};

export default Footer;
