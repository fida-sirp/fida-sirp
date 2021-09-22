import React from 'react';
import PropTypes from 'prop-types';
import { StyledPopover, StyledDiv } from './StyledComponents';

function SPPopover({ children, visible }) {
  return (
    <StyledPopover
      placement="leftTop"
      content={children}
      trigger="click"
      visible={visible}
    />
  );
}

export default SPPopover;

SPPopover.propTypes = {
  children: PropTypes.node,
};
