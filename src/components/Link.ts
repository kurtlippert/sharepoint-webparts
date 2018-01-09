import * as React from 'react';
import { LinkProps } from './FilterLink';

const { span, a } = React.DOM;

const Link: React.SFC<LinkProps> = ({ active, onLinkClick, children }) => {
  if (active) {
    return span({}, children);
  }

  return a({
    href: '#',
    onClick(e: React.MouseEvent<HTMLElement>): void {
      e.preventDefault();
      onLinkClick();
    },
  }, children);
};

export default Link;
