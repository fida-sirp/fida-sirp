import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledDiv = styled.div`
  width: 330px;
  margin: 5px 25px;
`;

export const StyledText = styled.text`
  font-family: ${Fonts.type.robotoBold};
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: center;
  margin: 22px 7px;
  color: ${Colors.primaryWhite};
`;
