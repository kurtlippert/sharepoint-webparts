import { style } from 'typestyle';
import { margin, padding, fontWeightNormal } from 'csstips';

export const listStyle = style(
  margin(10),
  padding(10),
  fontWeightNormal,
  {
    color: '#333333',
    fontFamily: `'Segoe UI Regular WestEuropean', 'Segoe UI', Tahoma, Arial, sans-serif`,
    fontSize: '14px',
    boxSizing: 'border-box',
    lineHeight: '50px',
    listStyleType: 'none',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)',
  },
);

export const listItemStyle = style(
  margin(0),
  padding(0),
  padding(9, 28, 3, 28),
  fontWeightNormal,
  {
    color: '#333333',
    verticalAlign: 'center',
    fontFamily: `'Segoe UI Regular WestEuropean', 'Segoe UI', Tahoma, Arial, sans-serif`,
    fontSize: 14,
    boxSizing: 'border-box',
    boxShadow: 'none',
    zoom: 1,
    position: 'relative',
  },
);
