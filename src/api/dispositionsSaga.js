import axios from 'axios';
import API from '../config/endpoints.config';

export async function listDispositionsSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.dispositions, {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getSingleDispositionsaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.dispositions + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}