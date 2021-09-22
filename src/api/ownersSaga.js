import axios from 'axios';
import API from '../config/endpoints.config';

export async function listOwnersSaga(payload) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetOwners, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }


export async function getSingleOwnerSaga(id) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetOwners + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }