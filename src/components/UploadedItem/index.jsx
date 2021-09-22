import React from 'react';
import PropTypes from 'prop-types';

import { ContainerDiv, CancelButton, StyledText } from './StyledComponents';
import CancelIcon from '../../assets/svgIcon/cancelIcon';

function UploadedItem({ name, onRemove, margin, backgroundColor, height ,checkAccess=true}) {
  return (
    <ContainerDiv
      margin={margin}
      backgroundColor={backgroundColor}
      height={height}
    >
     {(checkAccess === true) ?
      <CancelButton onClick={onRemove}>
        <CancelIcon />
      </CancelButton> :""}
      <StyledText>{name}</StyledText>
    </ContainerDiv>
  );
}

export default UploadedItem;

UploadedItem.propTypes = {
  name: PropTypes.string,
  onRemove: PropTypes.func,
  backgroundColor: PropTypes.string,
  checkAccess: PropTypes.string,
};
