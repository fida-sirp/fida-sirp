import React from 'react';
import PropTypes from 'prop-types';
import { map, find, isArray } from 'lodash';
import {
  TagContainer,
  TagWrapper,
  StyledBox,
} from './StyledComponents';
import ThreatIntelligenceTab from '../ThreatIntelligenceTab'

const AddRelatedAdvisory = ({ advisories }) => {
  return (
    <StyledBox>
      <div>
        <h3 style={{ color: "white", fontWeight: "bold", marginBottom: 20 }}> Related Advisories</h3>
      </div>
      <TagWrapper>
        <TagContainer>
          {map(advisories, advisorie => {
            return (
              <ThreatIntelligenceTab
                text={advisorie?.adv_title}
                id={advisorie?.adv_tid}
                priority={advisorie?.adv_severity}
              />
            );
          })}
        </TagContainer>
      </TagWrapper>
    </StyledBox>
  );
}

export default AddRelatedAdvisory;

AddRelatedAdvisory.propTypes = {
  advisories: PropTypes.array,
};
