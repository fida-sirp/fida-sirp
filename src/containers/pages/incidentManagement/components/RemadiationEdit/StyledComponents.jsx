import styled from 'styled-components';
import { Colors, Fonts } from '../../../../../theme';
import { Input } from 'antd';

const { TextArea } = Input;

export const StyledDiv = styled.div`
  padding: 35px;
  width: 100%;
`;

export const StyleLabel = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  color: #ffffff;
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

export const StyleTextValue = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  display: flex;
  align-items: center;
  padding-top: 21px;
  padding-right: 40px;
`;

export const PRelativeDiv = styled.div`
  position: relative;
`;

export const Simg = styled.img`
  position: absolute;
  padding: 4px;
  right: 0;
  top: 4px;
`;
