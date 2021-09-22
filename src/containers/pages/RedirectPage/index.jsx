import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Container,
  Content,
  LogoImage,
  SpinnerContainer,
} from './StyledComponents';
import Logo from '../../../assets/images/logo.png';
import Colors from '../../../theme/Colors';
import loaderImg from '../../../assets/images/loader.gif';

const RedirectPage = () => {
  const history = useHistory();
  useEffect(() => {
    document.title = 'SIRP';
  }, []);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: Colors.white }} spin />
  );

  useEffect(() => {
    const accessToken = localStorage.getItem('AccessToken');
    if (accessToken === null) {
      history.replace('/login');
    }
  });

  return (
    <Container>
      <Content>
        <LogoImage src={Logo} />
        <SpinnerContainer>
          <img src={loaderImg} alt="Loader" />
        </SpinnerContainer>
      </Content>
    </Container>
  );
};

export default RedirectPage;
