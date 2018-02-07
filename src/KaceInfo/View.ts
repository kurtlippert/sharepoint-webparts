import * as React from 'react';
import { connect } from 'react-redux';
import { KaceInfo } from './Model';
// import { KaceInfo, MachineInfo } from './Model';
import { State } from '../Model';
import TicketStatus from './TicketStatus';

export interface KaceInfoProps {
  kaceInfo: KaceInfo;
}

// const { div, ul, li } = React.DOM;
const { div } = React.DOM;

const KaceInfoView: React.SFC<KaceInfoProps> = ({ kaceInfo }) =>
  div({},
    // kaceInfo.Machines.length === 0 ? 'No Machines Returned' :
    // kaceInfo.Machines.map((machineInfo: MachineInfo) =>
    //   ul({ key: machineInfo.Id },
    //     li({},
    //       div({ className: 'ms-font-l' }, machineInfo.Name),
    //       div({ className: 'ms-font-l' }, machineInfo.Os_name),
    //       div({ className: 'ms-font-l' }, machineInfo.User),
    //     ),
    //   ),
    // ),
    TicketStatus(kaceInfo.Tickets),
  );

const mapStateToKaceInfoProps = (state: State) => ({
  kaceInfo: state.kaceInfo,
});

export default connect<KaceInfoProps, {}, void, State>(
  mapStateToKaceInfoProps,
)(KaceInfoView);
