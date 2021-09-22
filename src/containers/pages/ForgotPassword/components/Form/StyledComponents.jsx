import styled from 'styled-components';
import { Alert } from 'antd';
import 'antd/dist/antd.css';

export const FormContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;
export const FormDiv = styled.div`
  width: 100%;
  height: auto;
  padding: 70px 0px 50px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;
export const QueryDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 10px;
  margin-top: 10px;
  justify-content: center;
`;
export const Query = styled.p`
  font-size: 15px;
  font-weight: 600;
  display: flex;
  color: #ffffff;
  margin-top: 20px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  justify-content: center;
`;
export const AlertBox = styled(Alert)`
  margin-top: 35px;
  margin-bottom: -20px;
  height: 35px;
`;
export const MyForm = styled.form``;
