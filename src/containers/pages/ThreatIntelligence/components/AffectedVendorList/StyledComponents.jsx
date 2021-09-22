import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';

export const StyledBox = styled.div`
  width: 100%;
  display: flex;
  cursor: default;
  flex-direction: row;
`;

export const TagContainer = styled.div`
  width: inherit;
  flex: 1;
  display:flex;
  height: inherit;
  margin:10px;
  overflow-y: auto;
`;

export const TagWrapper = styled.div`
 display: flex; 
 flex-wrap: wrap;
 overflow-y: auto;
`;

export const Simg = styled.img`
    position: absolute;
    padding: 4px;
    right: 0;
    top:4px;
    margin-top: 55px;
    margin-right: 35px
`;

export const ProductDropDownWrapper = styled.div`
  margin-right: 30px !important;
  margin-top: -10px;
  position: absolute;
  top: 60px;
  right: 0px;
`;

export const StyledText = styled.text`
  font-family: ${Fonts.type.robotoRegular};
  font-size: ${props => (props.fontSize ? props.fontSize : '15px')};
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  color: ${Colors.primaryWhite};
`;
