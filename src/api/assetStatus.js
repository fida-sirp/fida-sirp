import axios from 'axios';
import API from '../config/endpoints.config';

export async function listAssetStatusSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetStatus, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function getAssetStatusSaga(id) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetStatus + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }