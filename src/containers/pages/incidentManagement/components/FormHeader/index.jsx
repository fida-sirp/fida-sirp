import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledBox, Container, ArrowDiv, EditBox } from './StyledComponents';
import UpArrowOutline from '../../../../../assets/svgIcon/upArrowOutline';
import DownArrowOutline from '../../../../../assets/svgIcon/downArrowOutline';

function FormHeader({
  number,
  title,
  children,
  visible,
  onOpen,
  onClose,
  isVisibleEdit,
  onEditClick,
}) {
  const onClick = () => {
    if (visible) {
      onClose();
    } else {
      onOpen();
    }
  };
  const arrowIcon = visible ? (
    <ArrowDiv>
      <UpArrowOutline />
    </ArrowDiv>
  ) : (
    <ArrowDiv>
      <DownArrowOutline />
    </ArrowDiv>
  );
  return (
    <Container>
      <StyledBox role="presentation" onClick={onClick}>
        {number}. {title}
        <div
          style={
            isVisibleEdit
              ? { paddingLeft: '50%', display: 'block' }
              : { display: 'none' }
          }
        >
          <EditBox onClick={onEditClick}>
            <text>Edit</text>
          </EditBox>
        </div>
        <a onClick={onClick}>{arrowIcon}</a>
      </StyledBox>
      <div style={visible ? { display: 'block' } : { display: 'none' }}>
        {children}
      </div>
    </Container>
  );
}

export default FormHeader;

FormHeader.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.node,
  visible: PropTypes.bool,
};
