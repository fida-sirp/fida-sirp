import axios from 'axios';
import API from '../config/endpoints.config';
const FileDownload = require('js-file-download');

/* eslint-disable */
export async function playbookSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');

  // let api;
  // if (payload.keyword) {
  //   api = API.playbooks + '/search?parameter="hello';
  // } else {
  //   api = payload.queryItem
  //     ? API.playbooks + '?' + payload.queryItem
  //     : API.playbooks;
  // }

  let api = payload.queryItem
    ? API.playbooks + '?' + payload.queryItem + 'expand=playbookCategory'
    : API.playbooks + '?' + 'expand=playbookCategory';

  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function playbookLogsSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');

  let api = payload.queryItem
    ? API.playbooksLogs +
    '?' +
    'expand=rkaScope,playbookName,plbStatus&' +
    payload.queryItem
    : API.playbooksLogs + '?' + 'expand=rkaScope,playbookName,plbStatus&';

  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function deleteplaybookSaga(id) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.delete(API.playbooks + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deletePlaybooklogsaga(id) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.delete(API.playbooksLogs + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function duplicatePlaybooksaga(id) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.get(API.playbooks + '/' + `duplicate?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function rulesAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  if (payload.queryItem) {
    api = `${API.playbookRules}?id=${payload?.id}&${payload.queryItem}`;
  } else {
    api = `${API.playbookRules}?id=${payload.id}`;
  }
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createRulesAPI(data) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.post(
    API.playbookRules + `?id=${data.recordId}`,
    data.values,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  return response.data;
}

export async function updateRulesAPI(data) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.put(
    API.playbookRules + `/${data.recordId}`,
    data.values,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  return response.data;
}

export async function deleteRulesAPI(id) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.delete(API.playbookRules + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function categoryListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.get(
    `${API.playbooks}/category?module=${data.type}`,
    {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  return response.data;
}

export async function subCategoryListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.get(
    `${API.playbooks}/sub-category?cat_id=${data.id}`,
    {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  return response.data;
}

export async function dispositionListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.get(`${API.playbooks}/disposition`, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function subDispositionListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.get(
    `${API.playbooks}/sub-disposition?disp_id=${data.id}`,
    {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  return response.data;
}

export async function locationListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.get(`${API.playbooks}/location`, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function riskRatingAPI(data) {
  const userToken = localStorage.getItem('AccessToken');

  const response = await axios.get(`${API.playbooks}/risk-rating`, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function dowloadPlayboook(id, playBookName) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`${API.playbooks}/download?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    responseType: 'blob',
  });

  FileDownload(response.data, `${playBookName}.json`);
  return response.data;
}


export async function plabookQueueViewLogs(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`${API.playbooksLogs}/output?pq_id=${payload.queueId}&id=${payload.actionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function plabookImportAPI(fileData) {
  const userToken = localStorage.getItem('AccessToken');

  const data = new FormData();
  data.append('upload', fileData)

  const response = await axios.post(
    API.playbookImport,
    data,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  return response.data;
}