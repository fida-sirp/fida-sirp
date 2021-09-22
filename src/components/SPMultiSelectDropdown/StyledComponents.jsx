import styled from 'styled-components';
import { Menu } from 'antd';
import { Colors, Fonts } from '../../theme';



export const StyledSmallDiv = styled.div`
  display: flex;
  align-items: center;
  height: 39px;
  padding-left: 29px;
  padding-right: 25px;
  &:hover {
    background-color: ${Colors.backgroundGray};
  }
`;
export const StyledDiv = styled.div`
  border-radius: 5px;
  background-color: ${Colors.backgroundSmokeBlack};
  border: ${props =>
    props.borderColor
      ? `1px solid ${props.borderColor}`
      : '1px solid #ffffff20'};
  color: ${Colors.primaryWhite};
  font-size: 15px;
  height: ${props => (props.height ? props.height : '38px')};
  align-items: center;
  display: flex;
  cursor: pointer;
  padding-left: 5px;
  user-select: none;
`;
export const IconDiv = styled.div`
  background-color: ${Colors.secondaryTransparent};
  border: 1px solid ${Colors.primaryWhite};
  border-right: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => (props.height ? props.height : '38px')};
  width: ${props => (props.height ? props.height : '38px')};
  border-radius: inherit;
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
export const ArrowDiv = styled.div`
  margin-right: 10px;
  margin-left: 5px;
  align-items: center;
  display: flex;
  height: 12px;
  width: 12px;
`;


export const StyledText = styled.text`
  margin-left: 10px;
  margin-right: 10px;
  font-family: ${Fonts.type.robotoRegular};
  font-size: 12px;
  color: ${Colors.primaryWhite};
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
