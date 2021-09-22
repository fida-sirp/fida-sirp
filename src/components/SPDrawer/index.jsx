import React from 'react';
import PropTypes from 'prop-types';
import StyledDrawer from './StyledComponents';

function SPDrawer({
  title,
  isVisible,
  onClose,
  drawerWidth,
  children,
  isdiagram,
  maskClosable,
  className = ''
}) {
  return (
    <StyledDrawer
      title={title}
      placement="right"
      className={className}
      isdiagram={isdiagram}
      onClose={onClose}
      visible={isVisible}
      maskClosable={maskClosable}
      width={drawerWidth}
    >
      {children}
    </StyledDrawer>
  );
}

export default SPDrawer;

SPDrawer.propTypes = {
  title: PropTypes.string,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  drawerWidth: PropTypes.number,
  isdiagram: PropTypes.string,
};
