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

export const CreatorStatus = styled.div`
  padding: 0 10px 0 10px;
  margin-left: 19px;
  background: rgba(51, 199, 88, 0.1);
  /* SIRP Primary / Green */
  color: #33c758;
  border: 1px solid #33c758;
  box-sizing: border-box;
  border-radius: 5px;
`;

export const AppWorkFlowHeaderContainer = styled.div`
  width: 100%;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
`;


export const AppWorkFlowBtn = styled.div`
  width: 100%;
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
`;
export const AppWorkFlowControllers = styled.div`
  width: 100%;
  display:flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const StyledCol = styled(Col)`
  display: flex;
  width: 25%;
`;
