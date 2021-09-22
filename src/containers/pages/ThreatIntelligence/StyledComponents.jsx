import styled from 'styled-components';
import { Alert } from 'antd';
import 'antd/dist/antd.css';

export const AlertBox = styled(Alert)`
  display: flex;
  width: 700px;
  margin: 0px auto;
  margin-top: 20px;
  margin-bottom: 10px;
  height: 55px;
  text-align: center;
`;
export const DescriptionStyle = styled.div`
  width: 650px;
  img {
    margin-left: 20px;
    width: 200px;
    object-fit: contain;
  }
`;

export const MenageFilterWrapper = styled.div`
  margin-bottom: -47px;
  z-index: 99;
  float: right;
  position: relative;
`;
