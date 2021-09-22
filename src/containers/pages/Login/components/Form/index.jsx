import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { loginDetails } from '../../../../../actions/auth';
import { getUserProfile } from '../../../../../actions/user';
import googleOAuth2 from '../../../../../actions/googleAuth';
import SPButton from '../../../../../components/SPButton';
import InputBox from '../../../../../components/InputBox';
import GoogleLogInImg from '../../../../../assets/images/GoogleLogIn.png';

import {
  FormContainer,
  FormDiv,
  QueryDiv,
  Query,
  GoogleImage,
  MyForm,
  AlertBox,
} from './StyledComponents';

const Form = ({
  loginStore,
  loginDetailsAction,
  googleOAuth2Action,
  previousPath,
  googleLoginStore,
  getUserProfileAction,
  userStore

}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [isFieldInvalid, setIsFieldInvalid] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const [errorTitle, setErrorTitle] = useState("");

  
  const history = useHistory();

  useEffect(() => {
    const accessToken = localStorage.getItem('AccessToken');
    
     /* 
      if (accessToken !== null) {
          if (previousPath !== null || previousPath === undefined) {
            history.push(previousPath);
          } else {
            history.push('/dashboard');
          }
        }
      */
    
  });

  useEffect(() => {
    if (loginStore.error?.code === 401) {
      setIsFieldInvalid(true);
    }
  }, [loginStore.error]);

  useEffect(() => {
    if (googleLoginStore.error) {
      setIsError(true);
      setErrorTitle(googleLoginStore.error.data.message);
    }
  }, [googleLoginStore.error]);


  useEffect(() => {
    if (loginStore.isSuccess) {
    //  console.log({ previousPath });
      const accessToken = localStorage.getItem('AccessToken');
       
        
          if (accessToken !== null) {
            getUserProfileAction();

          }
        
      

      
      /*
        if (accessToken !== null) {
          if (
            previousPath === null ||
            previousPath === undefined ||
            previousPath === '/login'
          ) {

            history.push('/dashboard');
          } else {
            history.push(previousPath);
          }
        }
      */
      
     
    }
  }, [loginStore.isSuccess]);

  useEffect(() => {
    if (userStore.userProfile && userStore.isProfileSuccess) {
      const profiledata = userStore.userProfile?.data?.profile[0];
      if(profiledata.usr_google_auth_enable === "Disable"){
        if (
          previousPath === null ||
          previousPath === undefined ||
          previousPath === '/login'
        ) {

          history.push('/dashboard');
        } else {
          history.push(previousPath);
        }
      }else{
        history.push('/verify-code');
      }
    }
  }, [userStore.userProfile]);

  

  useEffect(() => {
    if (loginStore.loading === false) {
      document.getElementById('emailInput').disabled = false;
      document.getElementById('passwordInput').disabled = false;
    }
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid Email Format').required('Required'),
      password: Yup.string()
        .min(8, 'Min 8 chars Required')
        .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSubmit = async () => {
    const myemail = formik.values.email;
    const mypassword = formik.values.password;

    const myemailError = formik.errors.email;
    const mypasswordError = formik.errors.password;

    if (myemail === '' || mypassword === '') {
      setIsFieldEmpty(true);
    }

    if (myemailError || mypasswordError || !myemail || !mypassword) {
      setEmailError(myemailError);
      setPasswordError(mypasswordError);
    }
    if (!myemailError && !mypasswordError && myemail && mypassword) {
      const data = {
        email: myemail,
        password: mypassword,
      };
      loginDetailsAction(data);
      document.getElementById('emailInput').disabled = true;
      document.getElementById('passwordInput').disabled = true;
    }
  };

  const keyDown = e => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };
  const directFP = () => {
    history.replace('/forgot-password');
  };

  const closeError = () => {
    setIsFieldEmpty(false);
    setIsFieldInvalid(false);
  };

  const responseGoogle = response => {
     // console.log(response);

    googleOAuth2Action(response);
  };

  

  const handleChange = e => {
    if (isFieldEmpty === true && e.target.value) {
      setIsFieldEmpty(false);
    }
    if (isFieldInvalid === true && e.target.value) {
      setIsFieldInvalid(false);
    }
    formik.handleChange(e);
  };

  return (
    <FormContainer>
      <FormDiv>
        {isFieldInvalid ? (
          <AlertBox
            message="Invalid Credentials"
            type="error"
            closable
            onClose={closeError}
          />
        ) : null}
        {isFieldEmpty ? (
          <AlertBox
            message="Please fill required details"
            type="error"
            closable
            onClose={closeError}
          />
        ) : null}
        {isError ? (
          <AlertBox
            message={errorTitle}
            type="error"
            closable
            onClose={closeError}
          />
        ) : null}
        <MyForm onSubmit={formik.handleSubmit}>
          <InputBox
            id="emailInput"
            label="Email"
            type="email"
            name="email"
            placeholder="example@email.com"
            onInputChange={handleChange}
            errorMessage={formik.errors.email}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            touched={formik.touched.email}
          />
          <InputBox
            id="passwordInput"
            label="Password"
            type="password"
            onKeyHit={e => {
              keyDown(e);
            }}
            name="password"
            placeholder="Password"
            onInputChange={handleChange}
            errorMessage={formik.errors.password}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            touched={formik.touched.password}
          />
          <Link to="/forgot-password" replace>
            <QueryDiv>
              <Query>Forgot Password?</Query>
            </QueryDiv>
          </Link>
          <SPButton
            title="Login"
            onButtonClick={handleSubmit}
            isLoading={loginStore.loading}
          />
        </MyForm>
      </FormDiv>

    { /* <GoogleLogin
        clientId="414624869961-fvm79bgp68cghf49ng7mpffqdk9dfqgo.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      >
        <span> Login with Google</span>
      </GoogleLogin> */ 
      } 
     
      <a href="https://staging.sirp.io/api/v1/google-login/auth?authclient=google" >
        <img src={GoogleLogInImg} alt="Google Auth" className="google-link" />  
      </a>
    </FormContainer>
  );
};

const mapStateToProps = state => {
  return {
    loginStore: state.loginStore,
    googleLoginStore: state.googleLoginStore,
    userStore: state.userStore,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginDetailsAction: data => {
      return dispatch(loginDetails(data));
    },
    googleOAuth2Action: data => {
      return dispatch(googleOAuth2(data));
    },

    getUserProfileAction: data => {
      return dispatch(getUserProfile(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
