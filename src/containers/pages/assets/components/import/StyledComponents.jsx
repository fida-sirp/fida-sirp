import styled from 'styled-components';
import { Upload } from 'antd';
import { Colors, Fonts } from '../../../../../theme';
import { Link } from 'react-router-dom';

export const StyledUpload = styled(Upload)``;

export const StyledText = styled.text`
  color: ${Colors.primaryWhite};
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  font-style: normal;
  font-weight: ${props => (props.fontWeight ? props.fontWeight : '400')};
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  display: flex;
  flex-direction: row;
  margin: ${props =>
      props.marginVertical ? props.marginVertical + 'px' : '5px'}
    0px;
`;

export const StyledLink = styled.a`
  color: ${Colors.primaryGreen};
  font-weight: 700;
  margin: 0px 5px;
  &:hover {
    color: ${Colors.primaryGreen};
  }
`;
