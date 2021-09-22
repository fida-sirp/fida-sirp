import styled from 'styled-components';
import { Menu } from 'antd';
import { Colors, Fonts } from '../../../../../theme';

const { Item } = Menu;

export const StyledMenu = styled(Menu)`
  background: ${Colors.backgroundSmokeBlack};
  border-bottom: none;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  width: 200px;
  z-index: 101 !important;
`;

export const StyledItem = styled(Item)`
  display: flex;
  align-items: flex-start;
  height: 42px;
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: ${Colors.primaryWhite};
  &:hover {
    background-color: ${Colors.backgroundGray};
    color: ${Colors.primaryWhite};
  }
`;
