import axios from 'axios';
import API from '../config/endpoints.config';

export async function listSaga() {
  const fields = [
    'icons'
  ];
  const expanedString = fields.toString();
  const api = API.help+"?expand="+expanedString;
  const userToken = localStorage.getItem('AccessToken');
  
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}


export async function getSingleSaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.help + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


