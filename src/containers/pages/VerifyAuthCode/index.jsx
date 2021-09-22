import React, { useEffect } from 'react';
import LoginBox from '../../../components/LoginBox';
import Form from './components/Form';

const VerifyAuthCode = () => {
  useEffect(() => {
    document.title = 'Verify AuthCode';
  }, []);
  return (
    <LoginBox>
      <Form />
    </LoginBox>
  );
};

export default VerifyAuthCode;
