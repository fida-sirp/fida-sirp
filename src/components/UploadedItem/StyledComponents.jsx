import styled from 'styled-components';
import { Colors, Fonts } from '../../theme';

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : Colors.backgroundGray};
  height: ${props => (props.height ? props.height + 'px' : '32px')};
  max-width: max-content;
  width:auto;
  border-radius: 5px;
  padding: 8px;
  margin: ${props => (props.margin ? props.margin : '10px 0px')};
  cursor: pointer;
  opacity: ${props => (props.opacity ? props.opacity : '100%')};
`;

export const CancelButton = styled.button`
  border: none;
  outline: none;
  background-color: ${Colors.transparent};
  display: flex;
  align-items: center;
  cursor: pointer;
`;
export const StyledText = styled.text`
  color: ${Colors.primaryWhite};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-style: normal;
  width:auto;
  font-weight: 400;
  line-height: 22px;
  text-align: left;
  padding: 0px 5px;
`;
