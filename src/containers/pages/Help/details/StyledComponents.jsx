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


export const StyleBodyDiv = styled.div`
  width:100%;
  background: #2C2C38;
  border-radius: 10px;
  padding-left: 70px;
  padding-bottom: 22px;
  padding-right: 70px;
  padding-top: 22px;
`

export const InsideDivBox = styled.div`
  width:50%;

`
