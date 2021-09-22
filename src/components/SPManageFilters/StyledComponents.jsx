import styled from 'styled-components';
import { Menu } from 'antd';
import { Colors, Fonts } from '../../theme';

export const StyledMenu = styled(Menu)`
  background: ${Colors.backgroundSmokeBlack};
  font-size: 15px;
  border-bottom: none;
  .ant-dropdown-menu-item:hover {
    background: ${Colors.backgroundGray};
  }
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  min-width: 200px;
  cursor: pointer;
`;

export const StyledSmallDiv = styled.div`
  display: flex;
  align-items: center;
  height: 39px;
  padding-left: 29px;
  &:hover {
    background-color: ${Colors.backgroundGray};
  }
`;
export const StyledDiv = styled.div`
  border-radius: 5px;
  background-color: ${Colors.transparent};
  color: ${Colors.primaryWhite};
  font-size: 15px;
  height: 38px;
  align-items: center;
  display: flex;
  cursor: pointer;
`;

export const StyledSecondText = styled.text`
  padding-left: ${props => (props.selected ? '8px' : '10px')};
  color: ${Colors.primaryWhite};
  font-family: ${Fonts.type.robotoRegular};
`;

export const StyledPrimaryText = styled.text`
  margin-left: 10px;
  margin-right: 10px;
  font-family: ${Fonts.type.robotoRegular};
`;
