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
  padding: 30px 0px 50px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #525268;
`;
export const QueryDiv = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  margin-bottom: 10px;
`;
export const Query = styled.p`
  font-size: 15px;
  font-weight: 400;
  display: flex;
  color: #ffffff;
`;
export const GoogleImage = styled.img`
  width: 327px;
  height: 42px;
  border-radius: 4px;
  display: flex;
  margin: 50px 0px;
  cursor: pointer;
`;
export const AlertBox = styled(Alert)`
  margin-top: -15px;
  margin-bottom: 10px;
  height: 35px;
`;
export const MyForm = styled.form``;
