import axios from 'axios';
import API from '../config/endpoints.config';

export async function listAssetValueSaga(payload) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetValue, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function getAssetValueSaga(id) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetValue + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }