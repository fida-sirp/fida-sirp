import styled from 'styled-components';


import { Menu } from 'antd';
import { Colors, Fonts } from '../../theme';

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

export const StyledMenu = styled(Menu)`
    background: ${props =>
    props.title === 'more'
      ? Colors.backgroundGray
      : Colors.backgroundSmokeBlack};
        
    position: relative;
    padding-top: 0;
  
    border-bottom: none;
    .ant-dropdown-menu-item:hover {
      background-color: ${props =>
    props.title === 'more'
      ? Colors.backgroundSmokeBlack
      : Colors.backgroundGray};
    }
  .ant-dropdown-menu-item {
    align-items: center;
    
    &.ant-dropdown-menu-item-disabled:first-child {
      position: sticky;
      top: 0;
      margin: 0;
      padding-top: 10px;
      z-index:2!important;
    }
  }

  .ant-dropdown-menu-item:first-child{
    z-index: auto !important;
  
  }


  .ant-dropdown-menu-title-content{
    display: flex;
  }
  .ant-dropdown-menu-item-group-title{
    color:#fff;
  }

  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  margin-right: ${props => (props.title === 'more' ? '28px' : '0px')};
  min-width: ${props => (props.title === 'more' ? '150px' : 'inherit')};
  max-width: max-content;
  max-height: 300px;
  overflow-y: auto;
`;


