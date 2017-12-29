import * as React from 'react';
import { createElement as r } from 'react';
import { LinkProps } from './FilterLink';

const Link: React.SFC<LinkProps> = ({ active, onLinkClick, children }) => {
  if (active) {
    return r('span', {}, children);
  }

  return r('a', {
    href: '#',
    onClick(e: React.MouseEvent<HTMLElement>): void {
      e.preventDefault();
      onLinkClick();
    },
  }, children);
};

export default Link;
