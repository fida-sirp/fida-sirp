import axios from 'axios';
import API from '../config/endpoints.config';

export function* logoutSaga(logoutData) {
  const userToken = localStorage.getItem('AccessToken');
  const response = yield axios(API.logout, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export default logoutSaga();
