import styled from 'styled-components';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Colors from '../../theme/Colors';

export const StyledLayout = styled(Layout)`
  flex-direction: row;
`;

export const StyledContent = styled(Content)`
  background-color: ${Colors.backgroundNightBlack};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 41px;
  overflow-x: hidden;
  min-height: 100vh;
`;
