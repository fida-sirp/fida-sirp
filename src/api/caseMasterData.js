import axios from 'axios';
import API from '../config/endpoints.config';

export async function listMembersUser(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.incidentManagement + '/users', {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function listMemberUserGroups(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetNetworkTypes + '/user-group', {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getCaseManagementSeverity() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagementModule.master.severity,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export async function getCasecategory() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.caseManagementModule.master.category, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getCasesubCategory(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    `${API.caseManagementModule.master.subCategory}?cat_id=${payload?.cat_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export async function getCasedisposition() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.caseManagementModule.master.disposition,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export async function getCasesubDisposition(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    `${API.caseManagementModule.master.subDisposition}?disp_id=${payload?.disp_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export async function getCaselocation() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.caseManagementModule.master.location, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getCasedetectionMethods() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.caseManagementModule.master.detectionMethods,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export async function getActionApps() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.caseManagementModule.actionApp.list, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function runActions(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const url = payload?.url ?? API.caseManagementModule.runActions;
  const response = await axios.post(
    url,
    payload,
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
