import styled from 'styled-components';
import { Colors, Fonts } from '../../../../theme';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const StyledText = styled.text`
  font-family: ${Fonts.type.robotoRegular};
  font-size: 20px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: ${Colors.primaryWhite};
  margin-left: 16px;
  text-transform: uppercase;
`;

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.transparent};
  border: none;
  outline: none;
  cursor: pointer;
  height: 25px;
  width: 25px;
  border-radius: 4px;

  &:hover {
    background-color: ${Colors.backgroundGray};
  }
`;
