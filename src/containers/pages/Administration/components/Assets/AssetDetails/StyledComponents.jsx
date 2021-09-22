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

export const addAssetBtn = styled.div`
  width: 100px;
`;
export const DeleteBox = styled.div`
  .mr-lt-20{
    margin-left: 20px;
  }
`;
// export default AlertBox;
