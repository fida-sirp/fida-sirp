import styled from 'styled-components';
import { Menu } from 'antd';
import { Colors, Fonts } from '../../theme';

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

export const StyledText = styled.text`
  margin-left: 10px;
  margin-right: 10px;
  font-family: ${Fonts.type.robotoRegular};
  font-size: 12px;
  color: ${Colors.primaryWhite};
`;

export const IconDiv = styled.div`
  width: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const StyledDiv = styled.div`
  border-radius: 5px;
  background-color: ${Colors.primaryGreen};
  color: ${Colors.primaryWhite};
  font-size: 15px;
  height: 38px;
  align-items: center;
  display: flex;
  cursor: pointer;
  border: 1px solid #ffffff20;
  padding-left: 5px;
  padding-right: 5px;

  ${props =>
    props.type === 'secondary' &&
    `background-color: ${Colors.transparent};
       border:1px solid ${Colors.primaryWhite};
  `}

  ${props => props.size === 'small' && `height: 33px;`}
`;
