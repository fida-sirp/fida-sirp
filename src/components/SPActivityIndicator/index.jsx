import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Colors from '../../theme/Colors';
import loaderImg from '../../assets/images/loader.gif';

const Overlay = styled.div`
position: fixed;
width:100%;
height: 100vh;
display:flex;
justify-content: center;
align-items:center;
background-color: rgba(0, 0, 0, 0.7);
z-index:10000;
`;

const LoaderWrapper = styled.div`
width:70px;
height:70px;
display:flex;
justify-content:center;
align-items:center;

border-radius:10px;
`;

const SPActivityIndicator = ({ appStore }) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 30, color: Colors.primaryGreen }} spin />
  );
  const { showLoader } = appStore;
  return (
    showLoader && <Overlay>
      <LoaderWrapper>
        <img src={loaderImg} alt="Loader" />
        { /* <Spin indicator={antIcon} /> */}
      </LoaderWrapper>
    </Overlay>
  );
};

const mapStateToProps = state => {
  return {
    appStore: state.appStore,
  };
};

export default connect(mapStateToProps)(SPActivityIndicator);