import React, { useState, useEffect, useParams } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import { verifyCode } from '../../../../../actions/auth';
import { getUserProfile, resetUser} from '../../../../../actions/user';
import {userLogout} from '../../../../../actions/auth';
import {
  FormContainer,
  FormDiv,
  QueryDiv,
  Query,
  ButtonContainer,
  MyForm,
  AlertBox,
} from './StyledComponents';

const Form = ({ verifyCodeStore,verifyCodeAction,resetUserAction,userLogoutAction }) => {
  
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);

  const history = useHistory();

  useEffect(() => {

    if (verifyCodeStore.error && verifyCodeStore.error.code === 401) {
      localStorage.removeItem('AccessToken');
      resetUserAction();
      history.push('/login');
      userLogoutAction();
    }
  }, [verifyCodeStore.error]);

  useEffect(() => {
    console.log(verifyCodeStore.listData);
    if (verifyCodeStore.listData.success) {
      const accessToken = localStorage.getItem('AccessToken');
      if (accessToken !== null) {
          
          history.push('/dashboard');
          
      }
       
    }
    
    
  }, [verifyCodeStore?.listData]);

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: values => {
      console.log(values);
      const codeItem = values.code;
   

      if(codeItem === ""){
        setIsFieldEmpty(true);
      }

      if (codeItem) {
        const dataItem = {
          code: codeItem,
        };
        verifyCodeAction(dataItem);
        
      }
      return values;
    },
  });

  

  

  const closeError = () =>{
    setIsFieldEmpty(false);
}

  return (
    <FormContainer>
      {verifyCodeStore.error?.message  ? <AlertBox message={verifyCodeStore.error?.message} type="error" closable /> : null}
      {isFieldEmpty ? <AlertBox message="Code Field cannot be blank" type="error" closable onClose = {closeError}/> : null}
      <MyForm onSubmit={formik.handleSubmit}>
        <FormDiv>
          <InputBox
            id="code"
            label="Enter Authenticator Code"
            type="code"
            name="code"
            noMargin={true}
            placeholder=""
            onInputChange={formik.handleChange}
            errorMessage={formik.errors.code}
            value={formik.values.code}
          />
          <ButtonContainer>
            <SPButton 
            title="Login"
            htmlType="submit"
             isLoading={verifyCodeStore.loading} />
          </ButtonContainer>
          <Link to="/verify-master-code">
            <QueryDiv>
              <Query>Lost your app?</Query>
            </QueryDiv>
          </Link>
        </FormDiv>
      </MyForm>
    </FormContainer>
  );
};

const mapStateToProps = state => {
  return {
    verifyCodeStore: state.verifyCodeStore,
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyCodeAction: data => {
      return dispatch(verifyCode(data));
    },
    resetUserAction: data => {
      return dispatch(resetUser(data));
    },
    userLogoutAction: data => {
      return dispatch(userLogout(data));
    },
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
