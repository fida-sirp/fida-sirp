import styled from 'styled-components';
import { Colors, Fonts } from '../../../../theme';

export const StyledDiv = styled.div`
  margin-top: 23px;
  margin-bottom: 13px;
  display: flex;
  flex-direction: row;
`;


export const StyledButton = styled.button`
  margin-right: 15px;
  margin-top: 2px;
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


