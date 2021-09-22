import axios from 'axios';
import API from '../config/endpoints.config';

export async function listAssetRemoteAppSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetRemoteApp, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function getAssetRemoteAppSaga(id) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetRemoteApp + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }