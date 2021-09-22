import React, { useState, useEffect, useParams } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import { forgotPassword } from '../../../../../actions/auth';
import {
  FormContainer,
  FormDiv,
  QueryDiv,
  Query,
  ButtonContainer,
  MyForm,
  AlertBox,
} from './StyledComponents';

const Form = ({ forgotPasswordStore,forgotPasswordAction }) => {
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);

  const history = useHistory();

  useEffect(() => {
    const msg = forgotPasswordStore?.data?.data?.message;
    if (msg === 'Email sent successfully') {
      setTimeout(function(){ history.push('/login') }, 3000);
    }
  }, forgotPasswordStore?.data?.data?.message);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email Format').required('Required'),
    }),
    onSubmit: values => {
      console.log(values);
      const myemail = formik.values.email;
      const myemailError = formik.errors.email;

      if(myemail === ""){
        setIsFieldEmpty(true);
      }

      if (myemailError || !myemail) {
        setEmailError(myemailError);
      }
      if (!myemailError && myemail) {
        const dataItem = {
          usr_email: myemail,
        };
        forgotPasswordAction(dataItem);
        
      }
      return values;
    },
  });

  

  

  const closeError = () =>{
    setIsFieldEmpty(false);
}

  return (
    <FormContainer>
      {forgotPasswordStore.data?.data?.message === "User not found" ? <AlertBox message={forgotPasswordStore.data.data.message} type="error" closable /> : null}
      {forgotPasswordStore.data?.data?.message === "Email sent successfully" ? <AlertBox message={forgotPasswordStore.data.data.message} type="success" /> : null}
      {isFieldEmpty ? <AlertBox message="Email ID  cannot be blank" type="error" closable onClose = {closeError}/> : null}
      <MyForm onSubmit={formik.handleSubmit}>
        <FormDiv>
          <InputBox
            id="emailInput"
            label="Email"
            type="email"
            name="email"
            placeholder="example@email.com"
            onInputChange={formik.handleChange}
            errorMessage={formik.errors.email}
            value={formik.values.email}
            noMargin={true}
          />
          <ButtonContainer>
            <SPButton 
            title="Forgot Password"
            htmlType="submit"
             isLoading={forgotPasswordStore.loading} />
          </ButtonContainer>
          <Link to="/login">
            <QueryDiv>
              <Query>Have an account?</Query>
            </QueryDiv>
          </Link>
        </FormDiv>
      </MyForm>
    </FormContainer>
  );
};

const mapStateToProps = state => {
  return {
    forgotPasswordStore: state.forgotPasswordStore,
   

  };
};

const mapDispatchToProps = dispatch => {
  return {
    forgotPasswordAction: data => {
      return dispatch(forgotPassword(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
