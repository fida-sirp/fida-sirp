import { Tabs, List } from 'antd';
import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';
import { Input } from 'antd';
const { TextArea } = Input;

export const StyledDiv = styled.div`
  width: 100%;
  padding: 35px;
`;

export const StyleTextArea = styled(TextArea)`
  background: #1c1c24;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  color: #ffffff;
  padding-right: 30px;
  margin-top: 4px;
`;

export const AddMainBox = styled.div`
  padding-top: 20px;
`;
