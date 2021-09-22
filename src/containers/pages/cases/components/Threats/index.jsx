import React from 'react';
import { StyledBox } from './StyledComponents';
import { SPTable } from '../../../../../components/AssetTableSelection/StyledComponents';

import EyeIconView from '../../../../../assets/svgIcon/eyeIcon/eye-view';
import SPRiskTag from '../../../../../components/SPRiskTag';

const columns = () => [
  {
    title: '#',
    dataIndex: 'adv_tid',
    editable: false,
  },
  {
    title: 'Name',
    dataIndex: 'adv_title',
    editable: false,
  },
  {
    title: 'SEVERITY',
    dataIndex: 'adv_severity',
    editable: false,
    render: vva_vulnerability_severity => {
      if (vva_vulnerability_severity === 'High') {
        return <SPRiskTag type="danger" text={vva_vulnerability_severity} />;
      }
      if (['Moderate', 'Medium'].includes(vva_vulnerability_severity)) {
        return <SPRiskTag type="warning" text={vva_vulnerability_severity} />;
      }
      if (vva_vulnerability_severity === 'Low') {
        return <SPRiskTag type="success" text={vva_vulnerability_severity} />;
      }
      return vva_vulnerability_severity;
    },
  },
  {
    title: 'ACTIONS',
    dataIndex: 'adv_id',
    editable: false,
    render: id => {
      return (
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <EyeIconView />
        </div>
      );
    },
  },
];

function Threats({ data }) {
  return (
    <StyledBox>
      <SPTable columns={columns()} dataSource={data} pagination={false} />
    </StyledBox>
  );
}

export default Threats;
