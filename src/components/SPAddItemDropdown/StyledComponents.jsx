import styled from 'styled-components';
import { Colors, Fonts } from '../../theme';
import { StyledMenu } from '../SPSingleSelectDropdown/StyledComponents';

export const AddDiv = styled.div`
  border-radius: 5px;
  background-color: ${Colors.backgroundSmokeBlack};
  color: ${Colors.primaryWhite};
  font-size: 15px;
  height: 38px;
  align-items: center;
  justify-content: space-between;
  display: flex;
  cursor: pointer;
  width: 100%;
  margin: 5px 0px;
  padding: 0px 5px;
`;

export const StyledPlus = styled.div`
  border-radius: 3px;
  background-color: #2c2c38;
  color: ${Colors.primaryWhite};
  border: 1.5px solid ${Colors.primaryWhite};
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  margin: 5px;
  height: 24px;
  width: 25px;
`;

export const StyledPlusIcon = styled.div`
  border-radius: 3px;
  background-color: #2c2c38;
  margin-left: 100px;
  color: ${Colors.primaryWhite};
  border: 1.5px solid ${Colors.primaryWhite};
  align-items: center;
  justify-content: center;
  display: flex;
  cursor: pointer;
  margin: 5px;
  height: 24px;
  width: 25px;
`;

export const StyledSearch = styled(StyledMenu.Item)`
  .ant-dropdown-menu-item-disabled,
  .ant-dropdown-menu-submenu-title-disabled {
    cursor: default !important;
  }
  background-color: ${Colors.backgroundSmokeBlack} !important ;
  margin: 5px 0px;
  justify-content: center;
`;

export const IncidentItem = styled(StyledMenu.Item)`
  width: 360;
  padding: 0px 20px;
`;
