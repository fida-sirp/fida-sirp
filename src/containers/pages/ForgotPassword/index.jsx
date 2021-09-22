import React, { useEffect } from 'react';
import LoginBox from '../../../components/LoginBox';
import Form from './components/Form';

const ForgotPassword = () => {
  useEffect(() => {
    document.title = 'Forgot Password';
  }, []);
  return (
    <LoginBox>
      <Form />
    </LoginBox>
  );
};

export default ForgotPassword;
