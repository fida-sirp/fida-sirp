import React from 'react';
import PropTypes from 'prop-types';
import {
  ContainerDiv,
  RowDiv,
  StyledText,
} from './StyledComponents';
import SPRiskTag from '../../../../../components/SPRiskTag';

const ThreatIntelligenceTab = ({ text, id, priority, onRemove, noCancelIcon, noBorder }) => {
  let type;
  if (priority === 'High') type = 'danger';
  else if (priority === 'Medium') type = 'warning';
  else if (priority === 'Low') type = 'primary';
  return (
    <ContainerDiv noBorder={noBorder}>
      <RowDiv>
        <RowDiv>
          <StyledText bold={true} marginRight="15px">
            ID: {id}
          </StyledText>
          {type && <SPRiskTag text={priority} type={type} />}
        </RowDiv>
      </RowDiv>
      <RowDiv>
        <StyledText marginTop="7px">{text}</StyledText>
      </RowDiv>
    </ContainerDiv>
  );
}

export default ThreatIntelligenceTab;

ThreatIntelligenceTab.propTypes = {
  text: PropTypes.string,
  id: PropTypes.number,
  priority: PropTypes.string,
  onRemove: PropTypes.func,
  noCancelIcon: PropTypes.bool,
  noBorder: PropTypes.bool,
};
