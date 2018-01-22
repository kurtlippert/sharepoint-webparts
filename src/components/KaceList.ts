import * as React from 'react';
import { KaceInfo, MachineInfo, State } from '../types';
import { connect } from 'react-redux';

export interface KaceInfoProps {
  kaceInfo: KaceInfo;
}

const { div, ul, li } = React.DOM;

const KaceList: React.SFC<KaceInfoProps> = ({ kaceInfo }) =>
  div({},
    kaceInfo.Machines === [] ? 'No Machines Returned' :
    kaceInfo.Machines.map((machineInfo: MachineInfo) =>
    ul({ key: machineInfo.Id },
      li({},
        div({ key: machineInfo.Id, className: 'ms-font-l' }, machineInfo.Name ),
        div({ key: machineInfo.Id, className: 'ms-font-l' }, machineInfo.Os_name ),
        div({ key: machineInfo.Id, className: 'ms-font-l' }, machineInfo.User ),
      ),
    ),
  ),
);

const mapStateToKaceInfoProps = (state: State) => ({
  kaceInfo: state.kaceInfo,
});

export default connect<KaceInfoProps, {}, void, State>(
  mapStateToKaceInfoProps,
)(KaceList);
