import styled from 'styled-components';
import { Input } from 'antd';
import { Colors, Fonts } from '../../../../../theme';

export const StyledBox = styled.div`
  border-radius: 10px;
  width: 387px;
  height: fit-content;
  cursor: default;
  border: 1px solid ${Colors.secondaryTransparent};
  background-color: ${Colors.backgroundSmokeBlack};
  padding: 10px 16px;
  right: ${props => (props.right ? props.right + 'px' : 'unset')};
  // left: ${props => (props.left ? props.left + 'px' : '0')};
  top: 10px;
  position: absolute !important;
  z-index: 200;
`;

export const StyledInput = styled(Input)`
  background-color: transparent;
  border: 1px solid ${Colors.primaryWhite} !important;
  color: ${Colors.primaryWhite};
  font-family: ${Fonts.type.robotoBold};
  font-size: 13px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  border-radius: 5px;
  height: 35px;
  margin: 5px 0px;

  .ant-input {
    background-color: transparent;
    color: ${Colors.primaryWhite};
    font-family: ${Fonts.type.robotoRegular};
    margin: 0px 5px;
  }
`;
