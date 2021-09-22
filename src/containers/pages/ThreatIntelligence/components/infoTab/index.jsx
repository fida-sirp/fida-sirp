import React from 'react';
import { Image } from 'antd';
import PropTypes from 'prop-types';
import { Container, TabText } from './StyledComponents';
import sirpDes from '../../../../../assets/images/sirpdesc.png';

const InfoTab = ({ label, value, type, imageContent }) => {
  return (
    <Container type={type}>
      <TabText>{label} :</TabText>
      {value}
      {imageContent}
    </Container>
  );
};

export default InfoTab;

InfoTab.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
};
