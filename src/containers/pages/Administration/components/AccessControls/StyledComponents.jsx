import styled from 'styled-components';
import { Col } from 'antd';

export const TabContentDiv = styled.div`
  height: 490px;
  overflow: auto;
`;

export const ExecuteBtn = styled.div`
  width: 573px;
`;

export const AdministrationTab = styled.div`
  width: 100%;
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

export const StylesBoxSessions = styled(Col)`
    width:100%;
    padding:2rem;
    border-radius:20px;
    background-color:#373747;
`;
