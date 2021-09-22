import styled from 'styled-components';
import { Modal, Row, Col, Collapse } from 'antd';
import { Colors, Fonts } from '../../../../../theme';

export const StyledModal = styled(Modal)`
  border-radius: 10px;
  .ant-modal-close-icon {
    display: none;
  }
  .ant-modal-body {
    padding: 0px !important;
    min-height: 600px;
  }
`;

export const StyledHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.backgroundSmokeBlack};
  color: white;
  padding: 0px 30px;
  font-size: 15px;
  font-weight: bold;
  font-family: ${Fonts.type.robotoBold};
  border-radius: 10px 10px 0px 0px;
`;

export const StyledCol = styled(Col)`
  padding: 0px 5px;
  width: ${props => (props.width ? props.width : '17%')};
  display: flex;
  align-items: center;

  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'flex-start'}; ;
`;

export const StyledRow = styled(Row)`
  min-height: 50px;
  // display: flex;
  align-items: center;
  // justify-content: space-around;
  background-color: ${props =>
    props.type === 'header' ? Colors.backgroundGray : Colors.darkGray};
  border-top: 1px solid #525268;
  border-bottom: 1px solid #525268;
  padding: 8px;
`;

export const HeaderText = styled.text`
  font-family: ${Fonts.type.robotoBold};
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: ${Colors.primarySmokeWhite};
`;

export const ColText = styled.text`
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: ${Colors.primaryWhite};
`;

export const StyledCollapse = styled(Collapse)`
  .ant-collapse-content-box {
    padding: 0;
  }
  .ant-collapse-item {
    background: transparent;
    border: 0;
  }

  .ant-collapse-header {
    color: #fff;
    background-color: #1c1c24 !important;
    font-weight: bold;
  }

  .ant-collapse {
    border: 0 !important;
  }
`;
