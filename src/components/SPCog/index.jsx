import React from 'react';
import PropTypes from 'prop-types';
import StyledButtonTransparent from './StyledComponent';
import Gear from '../../assets/svgIcon/sidebar/administration';

function SPCog({ onClick, style }) {
  return (
    <StyledButtonTransparent onClick={onClick} type="button" style={style}> 
      <Gear />
    </StyledButtonTransparent>
  );
}

export default SPCog;

SPCog.propTypes = {
  onClick: PropTypes.func,
};
