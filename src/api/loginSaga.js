import axios from 'axios';
import API from '../config/endpoints.config';

export function* loginSaga(loginData) {

  const response = yield axios.get(API.login, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + btoa(loginData.email + ':' + loginData.password),
    },
  });
  return response.data;
}

export function* googleLoginSaga(data) {
  const bodyFormData = new FormData();
  bodyFormData.append('code', data.code);
  const response = yield axios.post(API.googleLogin, bodyFormData, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data' ,
    },
  });
  return response.data;
}

export function* forgotPasswordSaga(data) {

  const response = yield axios.post(API.forgotPassword, data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}


export function* verifyCodeSaga(data) {

  
  const bodyFormData = new FormData();
  if(data.code){
    bodyFormData.append('code', data.code);
  }
  if(data.mastercode){
    bodyFormData.append('mastercode', data.mastercode);
  }

  const userToken = localStorage.getItem('AccessToken');
  const response = yield axios.post(API.verifyCode, bodyFormData, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>' ,
      'Accept':'*/*'
    },
  });
  return response.data;
}






export default { loginSaga, forgotPasswordSaga, verifyCodeSaga };
