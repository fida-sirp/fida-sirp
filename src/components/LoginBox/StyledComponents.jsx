import styled from 'styled-components';

export const BoxContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1c1c24;
  flex-direction: column;
  padding-top: 120px;
  @media (max-width: 1440px) {
    padding-bottom: 30px;
  }
`;

export const ContentContainer = styled.div`
  width: 440px;
  height: 650px;
  display: flex;
  flex-direction: column;
  background-color: #2c2c38;
  border-radius: 10px;
  overflow: hidden;
  padding: 80px 55px;
  margin-bottom: 80px;
`;

export const BoxHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoImage = styled.img`
  width: 122px;
  height: 38px;
  display: flex;
`;

export const BoxContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export const CopyrightBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px auto;
  flex-direction: column;
`;
export const UpperText = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
`;
export const Text = styled.p`
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  margin-bottom: 0px;
`;
