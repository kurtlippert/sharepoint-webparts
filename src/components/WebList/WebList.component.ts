import { createElement as r } from 'react';
import { listStyle, listItemStyle } from './WebList.style';

// tslint:disable-next-line:interface-name
export interface ISPItem {
  title: string;
  id: string;
}

export interface WebListProps {
  ispItems: ISPItem[];
}

const WebList: React.SFC<WebListProps> = ({ ispItems }) =>
  r('div', {},
    ispItems.map((ispItem: ISPItem) =>
      r('ul', { className: listStyle }, [
        r('li', { className: listItemStyle }, [
          r('span', { className: 'ms-font-l' }, ispItem.title),
        ]),
      ])),
  );

export default WebList;
