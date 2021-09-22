import React from 'react';
import PropTypes from 'prop-types';

import StyledModal from './StyledComponents';

function SPModal({
  children,
  title,
  centered,
  visible,
  onOk,
  onCancel,
  width,
  footer,
  maskClosable
}) {
  return (
    <StyledModal
      maskClosable={maskClosable}
      title={title}
      centered={centered}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      width={width}
      footer={footer}
    >
      {children}
    </StyledModal>
  );
}

export default SPModal;

SPModal.propTypes = {
  children: PropTypes.node,
};
