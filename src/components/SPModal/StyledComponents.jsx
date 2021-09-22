import styled from 'styled-components';
import { Modal } from 'antd';
import { Colors, Fonts } from '../../theme';

const StyledModal = styled(Modal)`
  border-radius: 10px;
  .ant-modal-header {
    background-color: ${Colors.backgroundGray};
    border-radius: 10px 10px 0px 0px;
    border: none;
    padding: 0px 55px;
    height: 65px;
    display: flex;
    align-items: center;
  }

  .ant-modal-title {
    color: ${Colors.primaryWhite} !important;
    font-size: 18px;
    font-family: ${Fonts.type.robotoBold};
  }
  .ant-modal-close-x {
    color: #fff;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-modal-close {
    color: ${Colors.primaryWhite} !important;
  }
  .ant-btn {
    color: ${Colors.primaryWhite} !important;
    font-size: 14px;
    border-radius: 5px;
    font-family: ${Fonts.type.robotoRegular};
    background-color: transparent;
    outline: none;
    border: 1px solid ${Colors.primaryWhite};
    &:hover,
    &:focus,
    &:select {
      background: ${Colors.secondaryTransparent};
    }
  }
  .ant-btn-primary {
    font-family: ${Fonts.type.robotoRegular};
    background: ${Colors.primaryGreen};
    border: none;
    &:hover,
    &:focus,
    &:select {
      background: ${Colors.secondaryGreen};
    }
  }
  .ant-modal-footer,
  .ant-modal-body {
    background-color: ${Colors.darkGray};
    border: none;
    padding: 45px 55px;
    border-radius: 0px 0px 10px 10px;
  }
`;

export default StyledModal;
