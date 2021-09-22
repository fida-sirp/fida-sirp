import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { importAsset,clearImport } from '../../../../../actions/assets';
import SPButton from '../../../../../components/SPButton';
import UploadedItem from '../../../../../components/UploadedItem';
import { StyledText, StyledUpload, StyledLink } from './StyledComponents';
import isEmpty from 'lodash/isEmpty';
import UploadPin from '../../../../../assets/svgIcon/uploadPin';
import { AlertBox } from './../createRule/StyledComponents';
import API from '../../../../../config/endpoints.config';
import { ApiTwoTone } from '@ant-design/icons';
import { truncate } from 'lodash';

function Import({
  onCloseDrawer,
  loading,
  importAsset,
  importAssetStore,
  refreshAssetsList,
  clearImport
}) {
  const [fileData, setFileData] = useState({});
  const [isError, setIsError] = useState(false);
  const [fileValidationError, setFileValidationError] = useState("");
  
  
  useEffect(() => {
    if (importAssetStore.isSuccess) {
  
      setFileData({});
      setIsError(false);
      onCloseDrawer(true);
      refreshAssetsList();
      clearImport();
    }
  }, [importAssetStore.isSuccess]);

  useEffect(() => {
    if (importAssetStore?.error) {
      setFileData({});
      setIsError(true);
    }
  }, [importAssetStore?.error]);

  function generateError(data) {
    if (Array.isArray(data)) {
      const items = data.map(item => <li>{item.message}</li>);
      return items;
    } else {
      return data.message;
    }
  }
 

 
  return (
    <div>
      {isError ? (
        <AlertBox
          message={
            <ul className="margin-10">
              {generateError(importAssetStore?.error)}
              
            </ul>
          }
          type="error"
          closable
        />
      ) : null}
      {fileValidationError ? (
        <AlertBox
          message={
            <div className="margin-10">
              {fileValidationError}
              </div>
              
          
          }
          type="error"
          closable
        />
      ) : null}



      <StyledText fontWeight="700">Instructions:</StyledText>
      <StyledText>
        1. Click{' '}
        <StyledLink href="/files/sample.xlsx" download="sample.xlsx">
          here
        </StyledLink>
        to download the sample assets import format.
      </StyledText>
      <StyledText>
        2. Fill the sample sheet with your assets then use the following button
        to upload that sheet to SIRP.
      </StyledText>
      <StyledText marginVertical={15}>
        Please do not change the order of the columns in the sheet.
      </StyledText>
      {!isEmpty(fileData) ? (
        <UploadedItem
          name={fileData.name}
          onRemove={() => {
            setFileData({});
          }}
        />
      ) : null}
      <StyledUpload
        method="GET"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        showUploadList={false}
        maxCount={1}
        beforeUpload={file => {
          const isXls = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          if (!isXls) {
            setFileValidationError('You can only upload xlsx file!');
          
          }else{
            setIsError(false);
            setFileData(file);
          }
        
        }}
      >
        <SPButton
          image={<UploadPin />}
          title="Upload Document"
          size="small"
          disabled={!isEmpty(fileData)}
        />
      </StyledUpload>
      <Row gutter={11} justify="end" style={{ marginTop: 120 }}>
        <Col>
          <SPButton
            title="Cancel"
            size="small"
            type="secondary"
            onButtonClick={() => {
              setFileData({});
              setIsError(false);
              onCloseDrawer(false);
            }}
          />
        </Col>
        <Col>
          <SPButton
            title="Import"
            size="small"
            isLoading={loading}
            disabled={isEmpty(fileData)}
            onButtonClick={() => {
              importAsset(fileData);
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.importAssetStore.loading,
    importAssetStore: state.importAssetStore,
  };
};

const mapDispatchToProps = {
  importAsset,
  clearImport
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Import);
