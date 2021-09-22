import React from 'react';
import { StyledBox } from './StyledComponents';
import { SPTable } from '../../../../../components/AssetTableSelection/StyledComponents';

import EyeIconView from '../../../../../assets/svgIcon/eyeIcon/eye-view';
import SPRiskTag from '../../../../../components/SPRiskTag';

const columns = () => [
  {
    title: '#',
    dataIndex: 'rga_assesment_id',
    editable: false,
  },
  {
    title: 'Name',
    dataIndex: 'rga_name',
    editable: false,
  },
  {
    title: 'Risk Ratings',
    dataIndex: 'rga_rating',
    editable: false,
  },
  {
    title: 'Status',
    dataIndex: 'rga_status',
    editable: false,
  },
  {
    title: 'ACTIONS',
    dataIndex: 'rga_assesment_id',
    editable: false,
    render: rga_assesment_id => {
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

function Risks({ data }) {
  return (
    <StyledBox>
      <SPTable columns={columns()} dataSource={data} pagination={false} />
    </StyledBox>
  );
}

export default Risks;
