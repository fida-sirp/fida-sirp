import React from 'react';
import Logo from '../../assets/images/logo.png';
import {
  BoxContainer,
  ContentContainer,
  BoxHeader,
  LogoImage,
  BoxContent,
  CopyrightBox,
  UpperText,
  Text,
} from './StyledComponents';

const LoginBox = props => {
  const { children } = props;
  const { version } = props;
  return (
    <BoxContainer>
      <ContentContainer>
        <BoxHeader>
          <LogoImage src={Logo} />
        </BoxHeader>
        <BoxContent>{children}</BoxContent>
      </ContentContainer>
      <CopyrightBox>
        <UpperText>Version:&nbsp;&nbsp;{version || "2.3.8"}</UpperText>
        <Text>Copyright@ {(new Date().getFullYear())} SIRP</Text>
        <Text>All rights reserved</Text>
      </CopyrightBox>
    </BoxContainer>
  );
};
export default LoginBox;
