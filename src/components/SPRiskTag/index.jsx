import React from 'react';
import PropTypes from 'prop-types';

import StyledTag from './StyledComponents';

function SPRiskTag({ type, text, width }) {
  let color = 'rgba(30,117,255)';
  let bgColor = 'rgba(30,117,255,0.1)';
  switch (type) {
    case 'danger': {
      bgColor = 'rgba(252,90,90,0.1)';
      color = 'rgba(252,90,90)';
      break;
    }

    case 'primary': {
      bgColor = 'rgba(30,117,255,0.1)';
      color = 'rgba(30,117,255)';
      break;
    }

    case 'warning': {
      bgColor = 'rgba(255,197,66,0.1)';
      color = 'rgba(255,197,66)';
      break;
    }

    case 'success': {
      bgColor = 'rgba( 51,199,88,0.1)';
      color = 'rgba( 51,199,88)';
      break;
    }

    default: {
      bgColor = 'rgba(30,117,255,0.1)';
      color = 'rgba(30,117,255)';
    }
  }

  return (
    <StyledTag color={bgColor} textColor={color} width={width}>
      {text}
    </StyledTag>
  );
}

export default SPRiskTag;

SPRiskTag.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};
