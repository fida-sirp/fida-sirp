import React from 'react';
import PropTypes from 'prop-types';

import StyledBox from './StyledComponents';

function SPSummaryBox({ text }) {
  return <StyledBox>{text}</StyledBox>;
}

export default SPSummaryBox;

SPSummaryBox.propTypes = {
  text: PropTypes.string,
};
