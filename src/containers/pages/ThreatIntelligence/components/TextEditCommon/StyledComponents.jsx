import styled from 'styled-components';
import { Input } from 'antd';
import { Colors, Fonts } from '../../../../../theme';

const { TextArea } = Input;

export const StyledDiv = styled.div`
    padding-top: 10px;
    padding-left: 20px;
    width: 1100px;
    padding-bottom:35px;
`;

export const StyleLabel = styled.div`
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: #FFFFFF;

`

export const StyleTextArea = styled(TextArea)`
    background: #1C1C24;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    color: #FFFFFF;
    padding-right: 30px;
    margin-top: 4px;
`;

export const StyleTextValue = styled.div`
  flex-direction: column;
  align-items: flex-start;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;
  display: flex;
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
    top:4px;
`;