import React, { useState } from 'react';
import {
  StyledBox,
  StyledDiv,
  StyledModalTitle,
  StyledModalSubTitle,
  StyledModalSubValue,
} from './StyledComponents';
import { SPTable } from '../../../../../components/AssetTableSelection/StyledComponents';
import SPAddItemDropdown from '../../../../../components/SPAddItemDropdown';
import SPRoundProgress from '../../../../../components/SPRoundProgress';
import CancelIcon from '../../../../../assets/svgIcon/cancelIcon';
import { isObject } from 'formik';
import Modal from 'antd/lib/modal/Modal';
import { Col, Row } from 'antd';
// import API from '../../../../../../config/endpoints.config';

import { listAsset } from '../../../../../actions/threatIntelligence';
import { compose } from 'redux';
import { connect } from 'react-redux';

const detailsRow = [
  {
    key: 'businessGroup',
    title: 'Business Group',
  },
  {
    key: 'assetGroup',
    title: 'Asset Group',
  },
  {
    key: 'assetsubGroup',
    title: 'Asset Subgroup',
  },
  {
    key: 'assetType',
    title: 'Asset Type',
  },
  {
    key: 'ast_dns',
    title: 'DNS Name',
  },
  {
    key: 'ast_hostname',
    title: 'Device(s) / Host(s) Name',
  },
  {
    key: '',
    title: 'IP Address',
  },
  {
    key: 'ast_name',
    title: 'Name',
  },
  {
    key: 'ast_s3_score',
    title: 'SIRP Security Score',
  },
  {
    key: 'ast_netbios_name',
    title: 'NetBIOS Name',
  },
  {
    key: 'ast_process_owner',
    title: 'Owner',
  },
];

const columns = (onDeleteAsset,checkAccess) => [
  {
    title: 'IP ADDRESS',
    dataIndex: 'ast_ip_address',
    editable: false,
  },
  {
    title: 'SIRP SECURITY SCORE',
    dataIndex: 'ast_s3_score',
    editable: false,
    render: ast_s3_score => {
      return (
        <SPRoundProgress
          type="success"
          progress={ast_s3_score ? ast_s3_score : 0}
        />
      );
    },
  },
  {
    title: 'NetBIOS NAME',
    dataIndex: 'ast_netbios_name',
    editable: false,
  },
  {
    title: 'OWNER',
    dataIndex: 'ast_process_owner',
    editable: false,
  },
  {
    title: '',
    dataIndex: (checkAccess)? "ast_id" : "",
    editable: false,
    render:  (checkAccess) ? ast_id => {
      return (
        <div
          onClick={e => {
            e.stopPropagation();
            onDeleteAsset(ast_id);
          }}
        >
          <CancelIcon />
        </div>
      );
    } : "",
  },
];

function AssetsList({
  onAdd,
  data,
  onDeleteAsset,
  incidentAssets,
  relatedAssetDetails,
  id,
  listAsset,
  checkAccess=true,
}) {
  React.useEffect(() => {
    listAsset();
  }, [id]);
  const [showModal, setShowModal] = React.useState(false);
  const [currentAsset, setCurrentAsset] = React.useState({});

  const assetList = data.map(d => {
    return {
      ...d,
      assetType: isObject(relatedAssetDetails?.[1]?.AssetType?.[d?.ast_id])
        ? Object.values(relatedAssetDetails?.[1]?.AssetType?.[d?.ast_id])?.[0]
        : '',
      assetsubGroup: isObject(
        relatedAssetDetails?.[2]?.AssetsubGroup?.[d?.ast_id]
      )
        ? Object.values(
            relatedAssetDetails?.[2]?.AssetsubGroup?.[d?.ast_id]
          )?.[0]
        : '',
      assetGroup: isObject(relatedAssetDetails?.[3]?.AssetGroup?.[d?.ast_id])
        ? Object.values(relatedAssetDetails?.[3]?.AssetGroup?.[d?.ast_id])?.[0]
        : '',
      businessGroup: isObject(
        relatedAssetDetails?.[4]?.BusinessGroup?.[d?.ast_id]
      )
        ? Object.values(
            relatedAssetDetails?.[4]?.BusinessGroup?.[d?.ast_id]
          )?.[0]
        : '',
    };
  });

  return (
    <StyledBox>
      <Modal
        centered
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
          setCurrentAsset({});
        }}
        width={1000}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <StyledModalTitle>Asset Details</StyledModalTitle>
        {detailsRow.map(d => {
          return (
            <Row>
              <Col span={12}>
                <StyledModalSubTitle>{d.title}</StyledModalSubTitle>
              </Col>
              <Col span={12}>
                <StyledModalSubValue>
                  {currentAsset?.[d?.key] && currentAsset?.[d?.key] !== '' ? (
                    d?.key === 'ast_s3_score' ? (
                      <SPRoundProgress
                        type="success"
                        progress={
                          currentAsset?.[d?.key] ? currentAsset?.[d?.key] : 0
                        }
                      />
                    ) : (
                      currentAsset?.[d?.key]
                    )
                  ) : (
                    '-'
                  )}
                </StyledModalSubValue>
              </Col>
            </Row>
          );
        })}
      </Modal>

      <SPTable
        onRow={record => {
          return {
            onClick: event => {
              console.log({ record });
              setShowModal(true);
              setCurrentAsset(record);
            }, // click row
          };
        }}
        columns={columns(onDeleteAsset, checkAccess,details=> {
          console.log({ details });
        })}
        dataSource={assetList}
        pagination={false}
      />

      {(checkAccess) ?
      <StyledDiv>
        <SPAddItemDropdown
          title="Add assets"
          onSelect={({ key }) => onAdd(key)}
          items={
            isObject(incidentAssets?.listData)
              ? Object.keys(incidentAssets?.listData).map(asset => {
                  return {
                    key: asset,
                    id: asset,
                    label: incidentAssets?.listData?.[asset],
                  };
                })
              : []
          }
        />
      </StyledDiv> :"" }
    </StyledBox>
  );
}

const mapDispatchToProps = {
  listAsset,
};

const mapStateToProps = state => {
  return state;
};
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  AssetsList
);
