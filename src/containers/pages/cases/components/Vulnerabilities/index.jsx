import React from 'react';
import { StyledBox, StyledDiv } from './StyledComponents';
import { SPTable } from '../../../../../components/AssetTableSelection/StyledComponents';
import SPAddItemDropdown from '../../../../../components/SPAddItemDropdown';
import SPRoundProgress from '../../../../../components/SPRoundProgress';
import { isObject } from 'formik';

import EyeIconView from '../../../../../assets/svgIcon/eyeIcon/eye-view';
import SPRiskTag from '../../../../../components/SPRiskTag';

const columns = () => [
  {
    title: '#',
    dataIndex: 'id',
    editable: false,
  },
  {
    title: 'Name',
    dataIndex: 'vva_vulunerbility_name',
    editable: false,
  },
  {
    title: 'SEVERITY',
    dataIndex: 'vva_vulnerability_severity',
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
    title: 'SCORE',
    dataIndex: 'ast_s3_score',
    editable: false,
    render: (text, record, index) => {
      return (
        <SPRoundProgress
          type="success"
          progress={
            record?.vuaAsset?.asset?.ast_s3_score
              ? record?.vuaAsset?.asset?.ast_s3_score
              : 0
          }
        />
      );
    },
  },
  {
    title: 'RESOLVED',
    dataIndex: 'vva_vulnerability_resolved',
    editable: false,
  },
  {
    title: 'ACTIONS',
    dataIndex: 'id',
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

function Vulnerabilities({ data }) {
  return (
    <StyledBox>
      <SPTable columns={columns()} dataSource={data} pagination={false} />
    </StyledBox>
  );
}

export default Vulnerabilities;
