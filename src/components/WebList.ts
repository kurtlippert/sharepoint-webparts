import * as React from 'react';
import { listStyle, listItemStyle } from './WebList/WebList.style';
import { WebInfo, StoreState } from '../types';
import { connect } from 'react-redux';

export interface WebListProps {
  webInfo: WebInfo[];
}

const { div, ul, li, span } = React.DOM;

const WebList: React.SFC<WebListProps> = ({ webInfo }) =>
  div({},
    webInfo.map((webInfoItem: WebInfo) =>
      ul({ key: webInfoItem.id, className: listStyle },
        li({ className: listItemStyle },
          span({ className: 'ms-font-l' }, webInfoItem.title),
        ),
      )),
  );

const mapStateToWebInfoProps = (store: StoreState) => ({
  webInfo: store.webInfo,
});

export default connect<WebListProps, {}, void, StoreState>(
  mapStateToWebInfoProps,
)(WebList);
