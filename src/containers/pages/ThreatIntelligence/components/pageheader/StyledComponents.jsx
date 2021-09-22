import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  flex: 1;
`;

export const StyledText = styled.text`
  font-family: ${props =>
        props.bold ? Fonts.type.robotoBold : Fonts.type.robotoRegular};
  font-size: 20px;
  font-weight: ${props => (props.bold ? '700' : '400')};
  line-height: 22px;
  letter-spacing: 0px;
  color: ${Colors.primaryWhite};
  margin-right: 16px;
  width: max-content;
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
  margin: 0px 5px 0px 2px;

  &:hover {
    background-color: ${Colors.backgroundGray};
  }
`;
