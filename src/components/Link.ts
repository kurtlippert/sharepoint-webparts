import { createElement as r } from 'react';
import { SetVisibilityActionType } from '../actions';

// presentational components
export interface LinkProps {
  active: boolean;
  onLinkClick: () => SetVisibilityActionType;
  children?: React.ReactNode[];
}

export const Link: React.SFC<LinkProps> = ({ active, onLinkClick, children }) => {
  if (active) {
    return r('span', {}, children);
  }

  return r('a', {
    href: '#',
    onClick(e: React.MouseEvent<HTMLElement>): void {
      e.preventDefault();
      onLinkClick();
    }
  }, children);
};
