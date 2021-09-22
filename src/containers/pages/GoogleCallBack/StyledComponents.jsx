import styled from 'styled-components';
import Colors from '../../../theme/Colors';

export const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  background-color: ${Colors.loaderBackground};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LogoImage = styled.img`
  width: 122px;
  height: 38px;
  display: flex;
`;
export const SpinnerContainer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  margin-top:15px;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;
