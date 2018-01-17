import * as React from 'react';
import { listStyle, listItemStyle } from './WebList/WebList.style';
import { WebInfo, State } from '../types';
import { connect } from 'react-redux';

export interface WebListProps {
  webInfo: WebInfo[];
}

const { div, ul, li, span } = React.DOM;

const WebList: React.SFC<WebListProps> = ({ webInfo }) =>
  div({},
    webInfo.map((webInfoItem: WebInfo) =>
      ul({ key: webInfoItem.Id, className: listStyle },
        li({ className: listItemStyle },
          span({ className: 'ms-font-l' }, webInfoItem.Title),
        ),
      )),
  );

const mapStateToWebInfoProps = (store: State) => ({
  webInfo: store.webInfo,
});

export default connect<WebListProps, {}, void, State>(
  mapStateToWebInfoProps,
)(WebList);
