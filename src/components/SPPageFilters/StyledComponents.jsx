import styled from 'styled-components';
import { Col } from 'antd';
import { Colors, Fonts } from '../../theme';

export const StyledCol = styled(Col)`
  font-family: ${Fonts.type.robotoRegular};
  font-size: 15px;
  color: ${Colors.primaryWhite};
  font-weight: ${props => (props.selected ? '600' : '400')};
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  background-color: ${props =>
    props.selected ? Colors.primaryGreen : Colors.transparent};
  padding: 10px;
  min-width: 163px;
  width: auto;
`;

export const StyledDiv = styled.div`
  border-radius: 10px;
  background-color: ${Colors.darkGray};
  color: ${Colors.primaryWhite};
  font-size: 15px;
  min-height: 49px;
  align-items: center;
  display: flex;
  cursor: pointer;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 3px;
  padding-bottom: 3px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
