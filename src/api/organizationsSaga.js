import axios from 'axios';
import API from '../config/endpoints.config';

export async function listOrganizationSaga(payload) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.organizations, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function getSingleOrganizationSaga(id) {
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.organizations + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }