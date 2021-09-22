import styled from 'styled-components';
import { Colors, Fonts } from '../../theme';

const StyledBox = styled.div`
  font-family: ${Fonts.type.robotoRegular};
  border-radius: 10px;
  color: ${Colors.primaryWhite};
  font-size: 15px;
  font-weight: 400;
  height: 145px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: default;
  border: 1px solid ${Colors.secondaryTransparent};
  background-color: ${Colors.backgroundSmokeBlack};
`;

export default StyledBox;
