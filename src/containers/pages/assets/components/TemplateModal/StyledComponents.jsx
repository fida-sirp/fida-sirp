import { Tabs, List } from 'antd';
import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';
import { Modal, Alert } from 'antd';

export const StyledBox = styled.div`
  font-weight: 400;
  display: block;
  cursor: default;
  width: 100%;
  background-color: ${Colors.darkGray};
`;

export const SModal = styled(Modal)`
  .ant-modal-header {
    padding-left: 96px;
    background: #373747;
    border-bottom: none;
  }

  .ant-modal-title {
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #ffffff;
  }

  .ant-modal-close-x {
    color: #fff;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ant-modal-content {
    background: #2c2c38;
  }

  .ant-modal-footer {
    display: none;
  }

  .ant-modal-body {
    padding-left: 99px;
    padding-right: 105px;
  }
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentDiv = styled.div`
  background-color: ${Colors.backgroundSmokeBlack};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 5px 28px;
`;

export const HeaderDiv = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${Colors.backgroundGray};
  color: ${Colors.primarySmokeWhite};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  padding-left: 28px;
  height: 46px;
  display: flex;
  align-items: center;
`;

export const StyledText = styled.text`
  color: ${Colors.primaryWhite};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-style: normal;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
`;

export const AlertBox = styled(Alert)`
  display: flex;
  width: auto;
  margin: 0px auto;
  text-align: left;
  padding: 0;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 20px;
`;
