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


const TextEditBox = ({
  isEditableEnabled,
  data,
  title = 'Edit Details',
  closeEditView,
  editDetails
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const [updateEditTextInfo, setupdateEditTextInfo] = useState('');
  useEffect(() => {
    if (data && data.length > 0) {
      setupdateEditTextInfo(data);
    }
  }, [data]);

  useEffect(() => {
    setIsEditable(false);
  }, [closeEditView]);
  const enableEditable = () => {
    setIsEditable(!isEditable);
  };

  const saveBtnClickHandler = () => {
    setIsEditable(false);
    editDetails(updateEditTextInfo);
  }

  return (
    <StyledDiv>
      <StyleLabel>{title}</StyleLabel>
      <Col>
        <PRelativeDiv>
          {isEditable ? (
            <TextEditorBox
              value={updateEditTextInfo}
              onChange={html => {
                setupdateEditTextInfo(html);
              }}
              placeholder={title}
            />
          ) : (
            <StyleTextValue dangerouslySetInnerHTML={{ __html: data }} />
          )}
          {isEditableEnabled && !isEditable ? (
            <a onClick={() => setIsEditable(true)}>
              <Simg src={editIcon} />
            </a>
          ) : null}
        </PRelativeDiv>

        {isEditable && (
          <Row gutter={11} justify="end" style={{ width: "100%", paddingTop: 20 }}>
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
                onButtonClick={saveBtnClickHandler}
                title="Save"
                htmlType="submit"
                size="small"
              />
            </Col>
          </Row>
        )}
      </Col>
    </StyledDiv>
  );
}

export default TextEditBox;
