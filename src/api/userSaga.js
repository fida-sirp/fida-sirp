import axios from 'axios';
import API from '../config/endpoints.config';

export async function userProfileSaga() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.userProfile, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function userProfileUpdateSaga(payload) {
//  console.log({ payload });
  const f = new FormData();
  for (const key of Object.keys(payload)) {
      f.append(key,  payload[key]);
  }
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(API.userProfile,f,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function userChangePasswordSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(API.changePassword, payload, {
    method: 'PUT',
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


export async function getGoogleQrCodeSaga() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.userQr, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function googleAuthProfileSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(API.googleAuthProfile, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}