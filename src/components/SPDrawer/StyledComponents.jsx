import styled from 'styled-components';
import { Drawer } from 'antd';
import { Colors, Fonts } from '../../theme';

const StyledDrawer = styled(Drawer)`
  .ant-drawer-header {
    background-color: ${Colors.backgroundGray};
    height: 64px;
    padding-left: 110px;
    display: flex;
    align-items: center;
    border: none;
  }
  .ant-drawer-content-wrapper {
    background-color: #2C2C38;
    width: ${props => (props.width ? props.width + 'px' : '980px')} !important;
  }
  .ant-drawer-close {
    color: ${Colors.primaryWhite};
    display: flex;
    align-items: center;
    height: 100%;
    padding-right: 30px;
  }
  .ant-drawer-title {
    font-family: ${Fonts.type.robotoRegular} !important;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: 0px;
    text-align: left;
    color: ${Colors.primaryWhite};
  }
  .ant-drawer-body {
    background-color: ${Colors.darkGray};
    padding: ${props => (props.isdiagram === 'true' ? '0 0 0 32px' : '28px 110px')};
  }
`;

export default StyledDrawer;
