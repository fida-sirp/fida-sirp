import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  width: 100%;
  cursor: pointer;
  padding: 17px 0px;
  border-bottom: ${props => (props.noBorder ? '' : '1px solid #525268')};
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
export const CancelButton = styled.button`
  border: none;
  outline: none;
  background-color: ${Colors.transparent};
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;
export const StyledText = styled.text`
  color: ${Colors.primaryWhite};
  font-family: ${props =>
    props.bold ? Fonts.type.robotoBold : Fonts.type.robotoRegular};
  font-size: 15px;
  font-style: normal;
  font-weight: ${props => (props.bold ? '500' : '400')};
  line-height: 22px;
  text-align: left;
  margin-right: ${props => (props.marginRight ? props.marginRight : '0px')};
  margin-top: ${props => (props.marginTop ? props.marginTop : '0px')};
`;
