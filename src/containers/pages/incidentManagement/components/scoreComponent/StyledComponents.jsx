import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const StyledBox = styled.div`
  border-radius: 10px;
  font-weight: 400;
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  background-color: ${Colors.darkGray};
  margin-bottom: 18px;
  @media (max-width: 1924px) {
    width: 98%;
    height: 100%;
    margin-bottom: 0px;
    margin-right: 10px;
    max-width: 387px;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const StyledText = styled.text`
  font-family: ${Fonts.type.robotoRegular};
  font-size: ${props => (props.fontSize ? props.fontSize : '15px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  color: ${Colors.primaryWhite};
`;
