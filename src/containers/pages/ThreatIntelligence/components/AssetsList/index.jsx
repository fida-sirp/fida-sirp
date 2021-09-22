import React, { useEffect, useState } from 'react';
import filter from 'lodash/filter';
import { StyledBox, StyledDiv } from './StyledComponents';
import { SPTable } from '../../../../../components/AssetTableSelection/StyledComponents';
import SPAddItemDropdown from '../../../../../components/SPAddItemDropdown';
import SPRoundProgress from '../../../../../components/SPRoundProgress';
import CancelIcon from '../../../../../assets/svgIcon/cancelIcon';
import { useHistory } from 'react-router-dom'
import { CancelButton } from "../../../../../components/UploadedItem/StyledComponents";
import { render } from '@testing-library/react';



function AssetsList({ items, advAsset, onRemove, onAdd, threatIntelligence }) {

  const history = useHistory()
  const check = 67;
  const columns = [
    {
      title: 'IP ADDRESS',
      dataIndex: 'ast_ip_address',
      editable: false,
      render: (i, r, t) => r?.ast_ip_address
    },
    {
      title: 'SIRP SECURITY SCORE',
      dataIndex: 'sirpSecurityScore',
      editable: false,
      render: (i, r, t) => <div onClick={() => history.push(`/assets/asset-details/${r?.ast_id}`)}>  <SPRoundProgress type={r?.ast_s3_score > 66 ? 'danger' : (r?.ast_s3_score > 33 ? 'warning' : 'success')} progress={r?.ast_s3_score || 0} /> </div>
    },
    {
      title: 'NetBIOS NAME',
      dataIndex: 'netBiosName',
      editable: false,
      render: (i, r, t) => r?.ast_netbios_name
    },
    {
      title: 'OWNER',
      dataIndex: 'owner',
      editable: false,
      render: (i, r, t) => r?.ast_process_owner
    },
    {
      title: '',
      dataIndex: '_',
      editable: false,
      render: (i, r, t) => {
        return (
          <div onClick={() => {
            onRemove(r?.ast_id);
          }}>
            <CancelIcon />
          </div>
        )
      }
    },
  ];
  return (
    <StyledBox>
      <SPTable
        columns={columns}
        dataSource={threatIntelligence?.compromisedAssets}
        pagination={false}
      />
      {_.size(threatIntelligence?.compromisedAssets) === 0 && <StyledDiv>
        <SPAddItemDropdown
          searchSize='330px'
          title="Add assets"
          onSelect={({ key }) => onAdd(key)}
          items={items}
        />
      </StyledDiv>
      }
    </StyledBox >
  );
}

export default AssetsList;