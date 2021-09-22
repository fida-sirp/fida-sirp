import axios from 'axios';
import API from '../config/endpoints.config';

export async function listSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const fields = [
    'astLocation', 'astAssetValue', 'astOs', 'astGroup','astClassification', 'astOwners','astTypes','astOwner'
  ];
  const expanedString = fields.toString();
  let api = API.asset+"?expand="+expanedString;
  if (payload.parameter) {
    api = api + '&AssetSearch[search]=' + payload.parameter;
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

export async function getSingleSaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.asset + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.asset, data, {
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
  const response = await axios.put(API.asset + '/' + data.ast_id, data, {
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
  const response = await axios.delete(API.asset + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function importSaga(file) {
  const userToken = localStorage.getItem('AccessToken');
  const f = new FormData();
  f.append('importFile', file);
  const response = await axios.post(API.assetImport, f, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function listAssetClassificationSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetClassification, {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function listAssetOSSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetOS, {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getAssetTypeById(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetType + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getAssetDashboardSaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetDetailsDashboard + '?id=' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function listAssetCategoriesSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetCategories, {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function listAssetEnableFieldsSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetEnableFields, {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function listAssetTypesSaga() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetType, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function listGetAssetFieldsSaga(field) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetFields+'?field='+field, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function getAssetTemplates() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.asset + '/template', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function createTemplateSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.asset + '/template-create', data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetTemplateDraftSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.asset + '/draft-template', data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetImportProcessSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.asset + '/process', data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
