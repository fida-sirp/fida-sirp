import styled from 'styled-components';
import { Col } from 'antd';

export const TabContentDiv = styled.div`
  height: 490px;
  overflow: auto;
`;

export const ErrorText = styled.div`
   color:#fc5a5a;
   font-size:13px;
   text-align:left;
   font-weight:700;
   margin-left:10px;
   margin-bottom:20px;
   margin-top:10px;
`

export const ExecuteBtn = styled.div`
  width: 573px;
`;

export const AdministrationTab = styled.div`
  width: 100%;
  height: 600px;
`;

export const StyledCol = styled(Col)`
  @media (max-width: 1924px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    max-width: 815px;
  }
`;

export const StylesBox = styled(Col)`
    width:100%;
    padding:2rem;
    border-radius:20px;
    max-width:500px; 
    background-color:#373747
`;



