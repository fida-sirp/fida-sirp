import styled from 'styled-components';
import { Menu } from 'antd';
import { Colors, Fonts } from '../../theme';

const { SubMenu, Item } = Menu;
export const StyledMenu = styled(Menu)`
  background-color: ${Colors.backgroundSmokeBlack} !important;
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  color: ${Colors.primaryWhite};
  border-radius: 5px;
  border: 1px solid ${Colors.secondaryLightGray};
  .ant-dropdown-menu-submenu-title
    .ant-dropdown-menu-submenu-expand-icon
    .ant-dropdown-menu-submenu-arrow-icon {
    display: none;
  }
  .ant-dropdown-menu {
    background-color: ${Colors.backgroundSmokeBlack} !important;
  }
  max-height: 300px;
  overflow-y: auto;
`;
export const StyledItem = styled(Item)`
  background-color: ${Colors.backgroundSmokeBlack} !important;
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  color: ${Colors.primaryWhite};
  display: flex;
  flex-direction: ${props => (props.flexD ? props.flexD : 'row-reverse')};
  &:hover {
    background-color: ${Colors.backgroundGray} !important;
  }
`;
export const StyledSubMenu = styled(SubMenu)`
  border-radius: 5px;
  .ant-dropdown-menu-submenu-title {
    padding-left: 10px;
    padding-right: 50px;
    font-family: ${Fonts.type.robotoRegular};
    font-size: 15px;
    color: ${Colors.primaryWhite};
    &:hover {
      background-color: ${Colors.backgroundGray} !important;
    }
  }
`;

export const StyledText = styled.text`
  padding-left: 15px;
  padding-right: ${props => (props.paddingRight ? props.paddingRight : '50px')};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  color: ${Colors.primaryWhite};
`;
