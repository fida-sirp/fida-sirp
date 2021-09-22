import styled from 'styled-components';
import { Button } from 'antd';
import { Colors, Fonts } from '../../theme';

export const AppButton = styled(Button)`
  width: 100%;
  height: ${props => (props.height ? props.height + 'px' : '42px')};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.primaryWhite} !important;
  background: ${Colors.primaryGreen};
  border-color: ${Colors.primaryGreen};
  &:disabled {
    background: ${Colors.primaryGreen};
    border-color: ${Colors.primaryGreen};
    opacity: 0.5;
  }
  &:hover,
  &:focus {
    background: ${Colors.lightGreen} !important;
    border-color: ${Colors.lightGreen} !important;
  }

  ${props =>
    props.type === 'danger' &&
    `
        background-color: ${Colors.progressDangerStart}; 
        border-color:${Colors.progressDangerStart};
        &:hover,&:focus {
           background: #D74444 !important;
            border-color: #D74444 !important;
         }
          &:disabled {
             background: ${Colors.progressDangerStart};
              border-color:${Colors.progressDangerStart};
            opacity: 0.5;
          }
    `}

  ${props =>
    props.type === 'secondary' &&
    `
        background-color: ${Colors.transparent}; 
        border-color:${Colors.primaryWhite};
        &:hover,&:focus {
            background: ${Colors.secondaryTransparent} !important;
            border-color: ${Colors.primaryWhite} !important;
         }
          &:disabled {
              background-color: ${Colors.transparent}; 
              border-color:${Colors.primaryWhite};
              opacity: 0.5;
          }
    `}
`;

export const StyledText = styled.text`
  font-size: 14px;
  font-weight: 400;
  font-family: ${Fonts.type.robotoRegular};
  margin-left: 5px;
  margin-right: 5px;
  color: ${Colors.primaryWhite} !important;
`;

export const StyledDiv = styled.div`
  margin-left: 10px;
  align-items: center;
  display: flex;
  height: 12px;
  width: 12px;
`;
