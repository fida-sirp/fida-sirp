import React, { useState } from 'react';
import { Row, Col } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SPButton from '../../../../../components/SPButton';
import UploadPin from '../../../../../assets/svgIcon/uploadPin';
import { StyledLink, StyledText, StyledUpload } from './StyledComponents';
import UploadedItem from '../../../../../components/UploadedItem';

const Importplaybook = ({ onCancel, onImport }) => {
  const [fileData, setFileData] = useState({});

  return (
    <div>
      {/* <StyledText fontWeight="700">Instructions:</StyledText>
      <StyledText>
        1. Click <StyledLink>here</StyledLink>to download the sample assets
        import format.
      </StyledText>

      <StyledText marginVertical={15}>
        Please do not change the order of the columns in the sheet.
      </StyledText> */}
      {!isEmpty(fileData) ? (
        <UploadedItem
          name={fileData.name}
          onRemove={() => {
            setFileData({});
          }}
        />
      ) : null}
      <StyledUpload
        showUploadList={false}
        maxCount={1}
        accept={'.json'}
        beforeUpload={file => {
          setFileData(file);
        }}
      >
        <SPButton
          image={<UploadPin />}
          title="Upload"
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
            onButtonClick={onCancel}
          />
        </Col>
        <Col>
          <SPButton
            title="Import"
            size="small"
            disabled={isEmpty(fileData)}
            onButtonClick={() => onImport(fileData)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Importplaybook;
