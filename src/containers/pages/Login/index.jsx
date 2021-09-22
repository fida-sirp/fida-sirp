import React, { useEffect } from 'react';
import styled from 'styled-components';
import LoginBox from '../../../components/LoginBox';
import Form from './components/Form';

const Login = ({ previousPath }) => {
  useEffect(() => {
    document.title = 'Log In';
  }, []);
  let previousPathItem = "";
  if(previousPath === "/callback/google"){
    previousPathItem = "";
  }else{
    previousPathItem = previousPath;
  }
  return (
    <>
      <LoginBox>
        <Form previousPath={previousPathItem} />
      </LoginBox>
    </>
  );
};

export default Login;
