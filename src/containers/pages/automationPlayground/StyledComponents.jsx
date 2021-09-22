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

export const AutomationExecuteAction = styled.div`
  display: flex;
  flex-direction: row;
  float: right;
  position: relative;
  z-index: 1;
  top: 40px;
  margin-top: 0;
`;
export const ExecutionBtn = styled.div`
  margin-left: auto;
  display: flex;
`;
export const ExecuteNewAction = styled.div`
  margin-left: 380px;
`;

export const SummuryList = styled.div`
  // margin-left: 21.53%;
`;

export const StyledCol = styled(Col)`
  display: flex;
  width: 25%;
`;

export const AutomationPopupBody = styled.div`
  color: #ffffff;
`;

export const ResultViewWrapper = styled.div`
  margin: 15px;
  padding: 10px;
  border: 1px solid;
`;