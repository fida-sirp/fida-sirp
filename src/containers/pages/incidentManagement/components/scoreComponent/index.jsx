import React from 'react';
import PropTypes from 'prop-types';
import { StyledBox, StyledText, StyledDiv } from './StyledComponents';
import SPRoundProgress from '../../../../../components/SPRoundProgress';

function ScoreComponent({ priority, value, label }) {
  function Label() {
    return (
      <StyledDiv>
        <StyledText>{label}</StyledText>
        <StyledText fontWeight="700" fontSize="60px">
          {value}
        </StyledText>
      </StyledDiv>
    );
  }
  return (
    <StyledBox>
      <SPRoundProgress
        progress={value}
        type={priority}
        width="190"
        format={<Label />}
      />
    </StyledBox>
  );
}

export default ScoreComponent;

ScoreComponent.propTypes = {
  value: PropTypes.number,
  label: PropTypes.string,
  priority: PropTypes.string,
};
