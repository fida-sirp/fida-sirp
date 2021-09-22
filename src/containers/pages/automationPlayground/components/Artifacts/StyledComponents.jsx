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
  margin-top: 23px;
  display: flex;
  flex-direction: row;
  float: right;
  position: absoulate;
  text-align: right;
  justify-content: right;
`;

export const ArtifectsTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: white;
  margin-top: 23px;
  margin-bottom: 15px;
`;
export const ArtifectsDescription = styled.div`
  font-size: 12px;
  color: white;
  margin-top: 13px;
  margin-bottom: 33px;
`;

export const ExecuteNewAction = styled.div`
  margin-left: 380px;
`;

export const SummuryList = styled.div`
  // margin-left: 20.23%;
`;

export const StyledCol = styled(Col)`
  display: flex;
  width: 25%;
`;

export const ModelContentWrapper = styled.div`
  height: 70vh;
  oveflow: auto !important;
`;