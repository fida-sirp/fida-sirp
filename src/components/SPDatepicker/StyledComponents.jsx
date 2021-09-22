import styled from 'styled-components';
import { DatePicker } from 'antd';
import { Colors, Fonts } from '../../theme';

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.backgroundSmokeBlack};
  border: 1px solid #ffffff20;
  height: 38px;
  border-radius: 5px;
  padding: 8px;
  width: max-content;
  cursor: pointer;
  width: 100%;
  align-self: flex-start;
`;

export const CancelButton = styled.button`
  border: none;
  outline: none;
  background-color: ${Colors.transparent};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const StyledDatepicker = styled(DatePicker)`
  background-color: inherit !important ;
  height: 100%;
  width: ${props => (props.width ? props.width + 'px' : '100%')};
  border: none !important;
  color: ${Colors.primaryWhite};
  font-size: 15px;
  font-family: ${Fonts.type.robotoRegular};
  .ant-picker-input > input {
    color: ${Colors.primaryWhite} !important;
    cursor: pointer;
  }
  .ant-picker-suffix,
  .ant-picker-clear {
    display: none;
  }

  /* .ant-picker-input > input:focus,
  .ant-picker-input > input:select,
  .ant-picker-input > input:hover,
  .ant-picker:hover,
  .ant-picker:focus,
  .ant-picker:select,
  .ant-picker-focused,
  .ant-picker-input > input-focused {
    border: none !important;
    background-color: inherit !important ;
  } */
`;
