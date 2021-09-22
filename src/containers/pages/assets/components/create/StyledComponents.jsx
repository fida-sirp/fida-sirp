import styled from 'styled-components';
import { Modal } from 'antd';

export const StyledDiv = styled.div`
  padding: 5px 0px;
`;

export const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`;

export const NewRowDiv = styled.div`
  flex-flow: row wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

`;

export const AModal = styled(Modal)`
  .ant-modal-header{
    background-color: #373747;
    border-bottom:none;
  }
  .ant-modal-title{
    color:#fff;
  }

  .ant-modal-content{
    border-bottom:none;
    background-color: #2C2C38;
  }

  .ant-modal-footer{
    border-bottom:none;
    display:none;
  }

  .anticon svg{
    color:#fff
  }
  

`;
