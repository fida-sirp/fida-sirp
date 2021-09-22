import styled from 'styled-components';
import { Alert } from 'antd';
import 'antd/dist/antd.css';

export const StyledDiv = styled.div`
  margin-top: 23px;
  margin-bottom: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AlertBox = styled(Alert)`
  display: flex;
  width: 700px;
  margin: 0px auto;
  margin-top: 20px;
  margin-bottom: 10px;
  height: 55px;
  text-align: center;
`;

export const StyledDivSec = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
