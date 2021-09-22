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
  div[role="tabpanel"] {
    min-height: 50vh;
  }
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
    border-radius: ${props => props.noRadius ? "0px" : "20px"} !important;
    max-width: ${props => props.fullWidth ? "100%" : "500px"} !important;
    background-color:#373747
`;

export const CoumnWrapper = styled.div`
  width: 400px;
`;


