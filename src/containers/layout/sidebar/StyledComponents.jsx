import styled from 'styled-components';
import { Menu } from 'antd';
import { Colors, Fonts } from '../../../theme';

const { Item } = Menu;

export const StyledDiv = styled.div`
  background-color: ${Colors.backgroundSmokeBlack};
`;
export const IconDiv = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  color: ${Colors.primaryWhite};
  padding: ${props =>
    props.inlineCollapsed ? '10px 30px' : '10px 24px'} !important;
  font-size: 20px;
  &:hover {
    background-color: ${Colors.backgroundGray};
    cursor: pointer;
  }
`;

export const StyledItem = styled(Item)`
  color: ${Colors.primaryWhite};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: 400;
  text-align: left;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const StyledMenu = styled(Menu)`
  background-color: inherit;
  padding-top: 41px;
  border-right: none;
  min-width: ${props => (props.inlineCollapsed ? 'max-content' : '271px')};
  .ant-menu-item:hover,
  .ant-menu-item:focus,
  .ant-menu-item:active,
  .ant-menu-item-active,
  .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-submenu-active,
  .ant-menu-submenu-title:hover {
    background-color: ${Colors.backgroundGray};
    color: white;
  }
  .ant-menu-item-selected:after {
    border: none !important;
  }
  .ant-menu-item-selected {
    background-color: ${props =>
    props.inlineCollapsed
      ? Colors.primaryGreen
      : Colors.backgroundGray} !important;
    color: white;
    border-left: 6px solid ${Colors.primaryGreen};
    padding-left: ${props =>
    props.inlineCollapsed ? '20px' : '18px'} !important;
  }
  .ant-menu-item {
    padding-left: ${props => (props.inlineCollapsed ? '26px' : '20px')};
  }
  .ant-menu-item .ant-menu-item-icon,
  .ant-menu-submenu-title .ant-menu-item-icon,
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    padding-top: 10px;
  }
`;
