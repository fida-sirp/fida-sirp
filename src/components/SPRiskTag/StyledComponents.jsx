import styled from 'styled-components';
import { Tag } from 'antd';
import { Colors, Fonts } from '../../theme';

const StyledTag = styled(Tag)`
  font-family: ${Fonts.type.robotoRegular};
  border-radius: 5px;
  color: ${Colors.primaryWhite};
  font-size: 15px;
  font-weight: 400;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 3px;
  padding-bottom: 4px;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.textColor ? props.textColor : Colors.primaryWhite)};
  border-color: ${props =>
    props.textColor ? props.textColor : Colors.primaryWhite};
  height: 26px;
  width: ${props => (props.width ? props.width : 'fit-content')};
`;

export default StyledTag;
