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

export const StyledCol = styled(Col)`
  display: flex;
  width: 25%;
`;

export const ApplicationDetailsWrapper = styled.div`
  div {
    display: flex;
    span {
      margin-left: 10px;
    }
  }
`;

export const StylesBox = styled(Col)`
    width:100%;
    padding:2rem;
    border-radius: ${props => props.noRadius ? "0px" : "20px"} !important;
    max-width: ${props => props.fullWidth ? "100%" : "500px"} !important;
    background-color:#373747
`;
export const AppLogoWrapper = styled.div`
  width: 300px;
  height: 100px;

  img {
      max-width: 300px;
      max-height: 100px;
      margin: auto;
    }
`;

export const DeleteBox = styled.div`
  .mr-lt-20{
    margin-left: 20px;
  }
`;
