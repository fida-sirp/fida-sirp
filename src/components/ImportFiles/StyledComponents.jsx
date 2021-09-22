import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Upload } from 'antd';
import { Colors, Fonts } from '../../theme';

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
    margin-bottom: 15px;
`;

export const StyledLink = styled(Link)`
  color: ${Colors.primaryGreen};
  font-weight: 700;
  margin: 0px 5px;
`;
