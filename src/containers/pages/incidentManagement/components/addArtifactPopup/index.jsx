import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { StyledBox, StyledInput } from './StyledComponents';
import SPButton from '../../../../../components/SPButton';
import CancelIcon from '../../../../../assets/svgIcon/cancelIcon';
import { CancelButton } from '../../../../../components/UploadedItem/StyledComponents';

function AddArtifactPopup({
  right,
  left,
  top,
  inputPlaceHolder,
  onAdd,
  onClose,
}) {
  const [text, setText] = React.useState('');
  return (
    <StyledBox left={left} right={right} top={top}>
      <Row justify="end">
        <CancelButton onClick={onClose}>
          <CancelIcon />
        </CancelButton>
      </Row>
      <Row style={{ marginTop: '10px' }}>
        <StyledInput
          value={text}
          placeholder={inputPlaceHolder}
          onChange={e => setText(e.target.value)}
        />
      </Row>
      <Row gutter={11} justify="end" style={{ marginTop: '30px' }}>
        <Col>
          <SPButton
            title="Cancel"
            size="small"
            type="secondary"
            onButtonClick={e => {
              setText('');
              onClose(e);
            }}
          />
        </Col>
        <Col>
          <SPButton
            title="Add"
            htmlType="submit"
            size="small"
            type="primary"
            onButtonClick={e => {
              onAdd(e, text);
              setText('');
            }}
          />
        </Col>
      </Row>
    </StyledBox>
  );
}

export default AddArtifactPopup;

AddArtifactPopup.propTypes = {
  left: PropTypes.number,
  top: PropTypes.number,
  title: PropTypes.string,
  onAdd: PropTypes.func,
  onClose: PropTypes.func,
};
