import React, { useState, useEffect, useParams } from 'react';
import PropTypes from 'prop-types';
import { Input, Row, Col } from 'antd';
import SPButton from '../../../../../components/SPButton';
import {
  StyledDiv,
  StyleLabel,
  StyleTextArea,
  StyleTextValue,
  PRelativeDiv,
  Simg,
} from './StyledComponents';
import editIcon from '../../../../../assets/images/Shape.png';
import TextEditorBox from '../../../../../components/TextEditorBox';

function RemadiationEdit({
  isEditableEnabled,
  data,
  title = 'Remediation details',
  updateRediationDetails,
  closeEditView,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [updatedRemidationInfo, setUpdatedRemidationInfo] = useState(data);
  useEffect(() => {
    if (closeEditView) {
      setIsEditable(false);
    }
  }, [closeEditView]);
  const enableEditable = () => {
    setIsEditable(!isEditable);
  };
  return (
    <StyledDiv>
      <StyleLabel>{title}</StyleLabel>
      <PRelativeDiv>
        {isEditable ? (
          <TextEditorBox
            value={updatedRemidationInfo}
            onChange={html => {
              setUpdatedRemidationInfo(html);
            }}
            placeholder={title}
          />
        ) : (
          <StyleTextValue dangerouslySetInnerHTML={{ __html: data }} />
        )}

        {isEditableEnabled && (
          <a onClick={enableEditable}>
            <Simg src={editIcon} />
          </a>
        )}
      </PRelativeDiv>

      {isEditable && (
        <Row
          gutter={11}
          justify="end"
          style={{ width: '100%', paddingTop: 20 }}
        >
          <Col>
            <SPButton
              onButtonClick={enableEditable}
              title="Cancel"
              size="small"
              type="secondary"
            />
          </Col>
          <Col>
            <SPButton
              onButtonClick={() => {
                setIsEditable(false);
                updateRediationDetails &&
                  updateRediationDetails(updatedRemidationInfo);
              }}
              title={'Save'}
              htmlType="submit"
              size="small"
            />
          </Col>
        </Row>
      )}
    </StyledDiv>
  );
}

export default RemadiationEdit;
