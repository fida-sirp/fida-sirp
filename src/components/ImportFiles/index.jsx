import React, { useState } from 'react';
import { Row, Col } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { StyledLink, StyledText, StyledUpload } from './StyledComponents';
import UploadPin from '../../assets/svgIcon/uploadPin';
import SPButton from '../SPButton';
import UploadedItem from '../UploadedItem';

const ImportFiles = ({ onCancel, instructionDescription, title }) => {
  const [fileData, setFileData] = useState({});

  return (
    <div>
      <StyledText fontWeight="700">
        {instructionDescription ? 'Instructions:' : ''}
      </StyledText>
      <StyledText>{instructionDescription}</StyledText>

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
        beforeUpload={file => {
          setFileData(file);
        }}
      >
        <SPButton
          image={<UploadPin />}
          title={title}
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
            onButtonClick={() => {
              console.log(fileData);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ImportFiles;
