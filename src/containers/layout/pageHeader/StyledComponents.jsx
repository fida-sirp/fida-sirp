import styled from 'styled-components';
import { Layout, Col } from 'antd';
import { Colors, Fonts } from '../../../theme';

export const StyledLayout = styled(Layout)`
  color: ${Colors.primaryWhite};
  background-color: ${Colors.transparent};
  margin-bottom: 22px;
  font-family: ${Fonts.type.robotoRegular};
  justify-content: center;
  display: flex;
`;

export const StyledCol = styled(Col)`
  font-size: 20px;
  font-weight: 700;
  margin-top: 13px;
  font-family: ${Fonts.type.robotoRegular};
`;
