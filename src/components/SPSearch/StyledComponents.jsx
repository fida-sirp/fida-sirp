import styled from 'styled-components';
import { Input } from 'antd';
import { Colors, Fonts } from '../../theme';

export const StyledDiv = styled.div`
  border-radius: 5px;
  padding-left: 9px;
  padding-right: 9px;
  flex-direction: row;
  background-color: ${Colors.backgroundSmokeBlack};
  height: 38px;
  border: ${props =>
    props.themeColor
      ? `1px solid ${props.themeColor}`
      : '1px solid rgba(255,255,255,0.2)'};
  display: flex;
  align-items: center;
`;

export const StyledInput = styled(Input)`
  font-family: ${Fonts.type.robotoRegular};
  color: ${props =>
    props.themeColor ? props.themeColor : `${Colors.primarySmokeWhite}`};
  font-size: 14px;
  height: 36px;
  align-items: center;
  width: ${props => (props.width ? props.width : '250px')};
  @media (max-width: 1700px) {
    width: 230px;
    max-width: ${props => (props.width ? props.width : '250px')};
  }
`;
