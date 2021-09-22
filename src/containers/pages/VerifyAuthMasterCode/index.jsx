import React, { useEffect } from 'react';
import LoginBox from '../../../components/LoginBox';
import Form from './components/Form';

const VerifyAuthMasterCode = () => {
  useEffect(() => {
    document.title = 'Verify AuthCode';
  }, []);
  return (
    <LoginBox>
      <Form />
    </LoginBox>
  );
};

export default VerifyAuthMasterCode;
