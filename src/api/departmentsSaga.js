import axios from 'axios';
import API from '../config/endpoints.config';

export async function listDepartmentsSaga(payload) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.department, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function getDepartmentSaga(id) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.department + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }