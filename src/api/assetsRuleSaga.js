import axios from 'axios';
import API from '../config/endpoints.config';

export async function listSaga(payload) {
 
  const userToken = localStorage.getItem('AccessToken');
  let api = API.assetRules;
  if (payload.parameter) {
    api = API.assetRules+"?AssetRulesSearch[search]="+payload.parameter
  } 
  const response = await axios.get(api, {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function createSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.assetRules, data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(API.assetRules + '/' + data.id, data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteSaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(API.assetRules + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function getAssetRulesResultsSaga(payload) {
 
  const userToken = localStorage.getItem('AccessToken');
  const fields = ["asrrOs","asrrOrganization"];
  const expanedString = fields.toString();
  let api = API.assetRulesResults+"?expand="+expanedString;
  if (payload.parameter) {
    api = api+"&AssetRuleResultsSearch[search]="+payload.parameter
  } 
  const response = await axios.get(api, {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}



export async function deleteAssetRuleViewSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.assetRulesResults+'/remove', data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function bulkSaveAssetRuleViewSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.assetRulesResults+'/bulk-save', data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function deleteSingleAssetRuleViewSaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(API.assetRulesResults + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function singleSaveAssetRuleViewSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.assetRulesResults+'/save', data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function playSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.assetRules + '/play?id=' + data,{} , {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}




