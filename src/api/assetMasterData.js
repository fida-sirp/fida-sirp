import axios from 'axios';
import API from '../config/endpoints.config';

export async function listAssetSystemTypeSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetSystemTypes, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

export async function listAssetNetworkTypeSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetNetworkTypes, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function listAssetPowerStatusSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetPowerStatus, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function listAssetDocumentTypeSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetDocumentTypes, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function listAssetSiemsSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetSiems, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function listAssetZonesSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetZones, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }
 
  export async function listAssetProductsSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetProducts, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function listAssetVendorsSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetVendors, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }

  export async function listAssetServerSaga(payload) {
   
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.get(API.assetServers, {
      method: 'GET',
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
  }


  