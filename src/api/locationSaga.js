import axios from 'axios';
import API from '../config/endpoints.config';

export async function listLocationSaga(payload) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.locations, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function getSingleLocationSaga(id) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.locations + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }