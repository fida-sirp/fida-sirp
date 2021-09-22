import styled from 'styled-components';
import { Alert, Col } from 'antd';

export const AlertBox = styled(Alert)`
  display: flex;
  width: 700px;
  margin: 0px auto;
  margin-top: 20px;
  margin-bottom: 10px;
  height: 55px;
  text-align: center;
`;

export const StyledDiv = styled.div`
  margin-top: 23px;
  margin-bottom: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledCol = styled(Col)`
  display: flex;
  width: 25%;
`;
