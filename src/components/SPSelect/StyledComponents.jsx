import styled from 'styled-components';
import { Menu } from 'antd';
import { Colors, Fonts } from '../../theme';

export const StyledMenu = styled(Menu)`
  background: ${Colors.backgroundSmokeBlack};
  border-bottom: none;
  .ant-dropdown-menu-item:hover {
    background: ${Colors.backgroundGray};
  }
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
  }
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: inherit;
  max-width: max-content;
  cursor: pointer;
  max-height: 300px;
  overflow-x: auto;
`;

export const StyledText = styled.text`
  margin-left: 10px;
  margin-right: 10px;
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  color: ${Colors.primaryWhite};
`;

export const StyledDiv = styled.div`
  border-radius: 5px;
  background-color: ${Colors.transparent};
  color: ${Colors.primaryWhite};
  font-size: 12px;
  height: 38px;
  align-items: center;
  display: flex;
  cursor: pointer;
`;

export const StyledMainDiv = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  color: ${Colors.primaryWhite};
  display: flex;
  outline: none;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.isDiagram ? '#1c1c24' : Colors.transparent};
  height: 38px;
  width: ${props =>
    props.isDiagram ? '100%' : 'max-content'};
  border-radius: 5px;
  role: presentation;
  cursor: pointer;
`;
export const StyledArrowDiv = styled.div`
  align-items: center;
  background-color: ${Colors.transparent};
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  height: 38px;
  width: 38px;
  display: flex;
  justify-content: center;
`;
