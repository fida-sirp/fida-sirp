import axios from 'axios';
import { isEmpty } from 'lodash';
import API from '../config/endpoints.config';
import { ADMINISTRATION_CREATE_OPERATING_SYSTEM_PROCESSING } from '../constants/actionTypes';

export async function organizationListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'expand=logoImage';
  if (payload.queryItem) {
    api = `${API.administrationModule.organization}?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.organization}?${expData}`;
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

export async function organizationUserListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const expData = 'selectedOrganizations,oguUser,logoImage';
  let api = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.organization}/organizations-users?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.organization}/organizations-users?expand=${expData}`;
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

export async function organizationMemberDetails() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.organization}/organizations-users/users`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function oraganizationslist() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.organization}/organizations-users/org`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createOraganizationUser(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.organization}/organizations-users`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateOraganizationUser(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.organization}/organizations-users/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteOraganizationUser(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.organization}/organizations-users/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function oraganizationTimezone() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.organization}/time-zone`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function oraganizationPost(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.organization}/updateclient`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function getInitOraganizationInfo() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.organization}/updateclient`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function classificationListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload?.queryItem) {
    api = `${API.administrationModule.assets}/asset-classification?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/asset-classification?${expData}`;
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

export async function classificationTitleChange(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(`${API.administrationModule.assets}/asset-classification/change-title`, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function classificationFormulaChange(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(`${API.administrationModule.assets}/asset-classification/asc-formula`, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function classificationGetFormula() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`${API.administrationModule.assets}/asset-classification/asc-formula`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetConfidentialityApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.assets}/confidentiality?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/confidentiality?${expData}`;
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

export async function updateConfidentialityApi(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/confidentiality/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteConfidentialityApi(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/confidentiality/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createConfidentialityApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/confidentiality`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetIntegrityApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.assets}/integrity?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/integrity?${expData}`;
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
export async function updateIntegrityApi(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/integrity/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function deleteIntegrityApi(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/integrity/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function createIntegrityApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/integrity`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetAvailabilityApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.assets}/availability?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/availability?${expData}`;
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

export async function updateAvailabilityApi(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/availability/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAvailabilityApi(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/availability/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createAvailabilityApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/availability`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function updateClassificationListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-classification/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteClassificationListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-classification/${payload.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createClassificationListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-classification`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function ownersListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-owners`;
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.assets}/asset-owners?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/asset-owners?${expData}`;
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

export async function deleteOwnerListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-owners/${payload.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateOwnerListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-owners/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createOwnerListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-owners`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetsGroupsAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'expand=businessGroups,subGroupsNames,assetTypes,values';
  if (payload.queryItem) {
    api = `${API.administrationModule.assetGroups}?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/assets-group?${expData}&${payload.queryItem}`;
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
export async function createOrganization(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.organization}`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteOrganization(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(
    `${API.administrationModule.organization}/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export async function updateOrganization(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(
    `${API.administrationModule.organization}/${id}`,
    payload,
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

export async function getselectedOraganization() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    `${API.administrationModule.organization}/selectedone`,
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
export async function setselectedOraganization(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    `${API.administrationModule.organization}/selectedone`,
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

export async function assetsSourceListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/assets-group/source-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetsSubGroupListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/assets-group/subgroup-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createAssetGroupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/assets-group`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAssetsGroupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/assets-group/${payload.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetGroupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/assets-group/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'wkfTaskCategory,wkfIncidentCategory';
  if (payload.queryItem) {
    api = `${API.administrationModule[payload?.tabName]}?expand=${expData}&${payload.queryItem
      }`;
  } else {
    api = `${API.administrationModule[payload?.tabName]}?expand=${expData}`;
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

export async function administrationCreateListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule[data?.tabName]}`;
  const response = await axios.post(api, data.payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationUpdateListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule[data?.tabName]}/${data.id}`;
  const response = await axios.put(api, data.values, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationDeleteListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule[data?.tabName]}/${data.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationChangeStatusAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule.workflowStatus}?id=${data.id}`;
  const response = await axios.post(api, data.payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetsSubGroupTabAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'expand=assetGroups';
  if (payload.queryItem) {
    api = `${API.administrationModule.assets}/asset-sub-group?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/asset-sub-group?${expData}`;
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

export async function assetsSubGroupDropDownAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-sub-group/astgroup-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createAssetSubGroupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-sub-group`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAssetsSubGroupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-sub-group/${payload.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetSubGroupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-sub-group/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationDuplicateAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule.workflow}/duplicate?id=${data.id}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationDeleteAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule.workflow}/${data.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationWorkflowCategoryListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule.workflow}/category-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationWorkflowSubCategoryListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule.workflow}/sub-category?id=${data.id}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationWorkflowTaskCategoryListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api;
  if (!isEmpty(data)) {
    api = `${API.administrationModule.workflow}/task-category?id=${data.id}`;
  } else api = `${API.administrationModule.workflow}/task-category`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationCreateWorkflowTaskAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule.workflow}`;
  const response = await axios.post(api, data.payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administrationUpdateWorkflowTaskAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const api = `${API.administrationModule.workflow}/${data.id}`;
  const response = await axios.put(api, data.values, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetsValueTabAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.assets}/asset-value?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/asset-value?${expData}`;
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

export async function createAssetValueAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-value`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetValueAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-value/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAssetsValueAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-value/${payload.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetTitleValueAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-value/change-title`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetsOsListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.assets}/asset-os?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/asset-os?${expData}`;
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

export async function createOperatingSystemAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-os`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatRegisterValueApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/severity-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatRegisterVulnerabilityApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/threat-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createRiskManagementThreatRegisterAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}`;
  const response = await axios.post(api, data.payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateRiskManagementThreatRegisterAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/${data.id}`;
  const response = await axios.put(api, data.payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteRiskManagementThreatRegisterAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/${data.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function probabilityGetDefaultAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/probability/formula`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function Riskprobability(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.riskManagement}/probability?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.riskManagement}/probability?${expData}`;
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

export async function updateRiskprobability(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/probability/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function deleteRiskprobability(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/probability/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function createRiskprobability(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/probability`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function changeProbabilityTitle(payload, isRiskScore) {
  const userToken = localStorage.getItem('AccessToken');
  let api = "";
  if (isRiskScore) {
    api = `${API.administrationModule.riskManagement}/risk-score/change-title`;
  } else {
    api = `${API.administrationModule.riskManagement}/probability/change-title`;
  }
  const response = await axios.post(api, payload, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateFormula(payload, isScore) {
  const userToken = localStorage.getItem('AccessToken');
  let api = "";
  if (isScore) {
    api = `${API.administrationModule.riskManagement}/risk-score/formula`;
  } else {
    api = `${API.administrationModule.riskManagement}/probability/formula`;
  }

  const response = await axios.post(api, payload, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getFormula() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-score/formula`;

  const response = await axios.get(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}




export async function updateRiskManagementAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/${data.id}`;
  const response = await axios.put(api, data.payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function RiskManagementBusinesImpactChangeTitleAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagementBusinessImpactChangeTitle}`;
  const response = await axios.post(api, data.payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = [];
  let expData = 'actApp.image,vendorImage';

  if (payload?.tabName === 'automationIngestionSource') {
    expData = `${expData},isConfigured`
  }

  if (payload.queryItem) {
    api = `${API.administrationModule[payload?.tabName]}?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule[payload?.tabName]}?expand=${expData}`;
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
export async function automationCreateListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}`;
  const response = await axios.post(api, data.payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationUpdateListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/${data.id}`;
  const response = await axios.put(api, data.payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationDeleteListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/${data.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationActionIOValidationListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.automationActionsIO}/aiovalidation`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function automationActionDuplication(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.automationActions}/duplicate?id=${id}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function automationActionOutput(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.automationActions}/output?id=${id}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function automationActionConfigurations(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.automationActions}/config?id=${id}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function automationActionConfigurationsPost(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.automationActions}/config?id=${id}`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationViewAction(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.automationActions}/view-script?id=${id}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationActionsMultiPostData(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.ingestionMultiDataPost}?id=${id}`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetOsAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-os/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteOsAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-os/${payload.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetsDepartmentListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.assets}/departments?${expData}${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/departments?${expData}`;
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

export async function createAssetDepartmentAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/departments`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetDepartmentAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/departments/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAssetDepartmentAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/departments/${payload.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesCategory(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/categories?${expData}${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/categories?${expData}`;
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


export async function getContainerList() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.administrationModule.cases + '/sla/container-list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getCasesDespositionList(containerName) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.administrationModule.cases + `/sla/get-disposition?id=${containerName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getCasesCategoriesList(containerName) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.administrationModule.cases + `/sla/get-categories?name=${containerName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesDispositionsItem() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/categories/disposition`;

  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesCategoryDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/categories/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesCategoryUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/categories/${id}`;

  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesCategoryCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/categories`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesSubCategory(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = `expand=mscMainCategory`;
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/subcategories?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/subcategories?${expData}`;
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

export async function administratorCasesCategoryList() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/subcategories/category-list`;

  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesSubCategoryCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/subcategories`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesSubCategoryUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/subcategories/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesSubCategoryDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/subcategories/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesDispositionsList(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/dispositions?${expData}${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/dispositions?${expData}`;
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

export async function administratorCasesDispositionUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/dispositions/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesDispositionCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/dispositions`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorCasesDispositionDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/dispositions/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesSubDispositionsList(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'dscParent';
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/subdispositions?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/subdispositions?expand=${expData}`;
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
export async function administratorSubCasesDispositionDropdownList() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/subdispositions/disposition`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorSubCasesDispositionUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/subdispositions/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesSubDispositionCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/subdispositions`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesSubDispositionDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/subdispositions/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetsBusinessGroupListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.assets}/source?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/source?${expData}`;
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

export async function createAssetBusinessGroupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/source`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetBusinessGroupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/source/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAssetBusinessGroupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/source/${payload.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetBusinessGroupTitleAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/source/change-title`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetsTypeListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'expand=astData,subgroupData,atyValue,atyOwner,atyDepartment';
  if (payload?.queryItem) {
    api = `${API.administrationModule.assets}/asset-type?${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.assets}/asset-type?${expData}`;
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

export async function editAssetTypeTitleAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type/change-title`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetTypeListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAssetTypeAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type/${payload.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesDetectionMethodsList(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/detection-methods?${expData}${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/detection-methods?${expData}`;
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

export async function administratorCasesDetectionMethodUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/detection-methods/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesDetectionMethodCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/detection-methods`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorCasesDetectionMethodDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/detection-methods/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesSlaList(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'expand=status';
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/sla?${expData}${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/sla?${expData}`;
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
export async function administratorCaseseDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/sla/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorCasesSlaUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/sla/${id}`;
  const response = await axios.put(api, payload, {
    method: 'UPDATE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorCasesSlaCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/sla`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorCasesSlaLogs(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/sla/logs?id=${id}`;
  const response = await axios.post(api, payload, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorCasesSlaViewRule(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/sla/view-rules?id=${id}`;
  const response = await axios.post(api, payload, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorCasesNciss(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'nsc';
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/nciss?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/nciss?expand=${expData}`;
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

export async function administratorCasesNcissDelete(id) {
  const userToken = localStorage.getItem('AccessToken')
  let api = `${API.administrationModule.cases}/nciss/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetsDropDownListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type/assets-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function casesNcissDropDownListAPI() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/nciss/category-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesNcissUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/nciss/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorCasesNcissCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/nciss`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesNcisCategories(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/nciss/nciss-categories?${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/nciss/nciss-categories`;
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
export async function administratorNcisCategoryUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/nciss/nciss-categories/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorNcisCategoryCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/nciss/nciss-categories`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorNcisCategoryDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/nciss/nciss-categories/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesNcissPeriorities(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/nciss/nciss-periorities?${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/nciss/nciss-periorities`;
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
export async function administratorCasesNcissPerioritieUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/nciss/nciss-periorities/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesNcissPerioritieCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/nciss/nciss-periorities`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesNcissPerioritieDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/nciss/nciss-periorities/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesLocationsList(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.cases}/locations?${expData}${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.cases}/locations?${expData}`;
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

export async function administratorCasesLocationUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/locations/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorCasesLocationCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/locations`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function administratorCasesLocationDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/locations/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function subGroupDropDownListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type/subgroup-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function ownerDropDownListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type/owners-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function departmentDropDownListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type/departments-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function assetValueDropDownListAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type/astvalue`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createAssetTypeAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type`;
  const response = await axios.post(api, payload.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editAssetTypeAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-type/${payload.id}`;
  const response = await axios.put(api, payload.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function vulnerabilityListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (data.queryItem) {
    api = `${API.administrationModule[data.tabName]}?${expData}&${data.queryItem
      }`;
  } else {
    api = `${API.administrationModule[data.tabName]}?${expData}`;
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

export async function deleteVulnerabilityAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/${data.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createVulnerabilityAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}`;
  const response = await axios.post(api, data.payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateVulnerabilityAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/${data.id}`;
  const response = await axios.put(api, data.values, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (data.queryItem) {
    api = `${API.administrationModule[data.tabName]}?${expData}&${data.queryItem
      }`;
  } else {
    api = `${API.administrationModule[data.tabName]}?${expData}`;
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

export async function createthreatIntelAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}`;
  const response = await axios.post(api, data.payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deletethreatIntelAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/${data.id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateThreatIntelAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}/${data.id}`;
  const response = await axios.put(api, data.values, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function allIngestionAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function ingestionActionAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}?act_id=${data.id}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function enableAdvisoryAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}?id=${data.id}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function addMultiData(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule[data.tabName]}?id=${data.id}`;
  const response = await axios.post(api, data.values, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function sessionPassword(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessSessions}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function sessionPasswordUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessSessions}/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function userAccessUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlUsers}/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function userAccessInviteUser(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlUsers}/invite`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function accessControlGroups(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.accessControlGroups}?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.accessControlGroups}?expand=${expData}`;
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


export async function createAccessControlGroup(payload) {
  const userToken = localStorage.getItem('AccessToken');

  let api = `${API.administrationModule.accessControlGroups}`;

  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateAccessContorlGroup(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlGroups}/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAccessContorlGroup(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlGroups}/${id}`;
  const response = await axios.delete(api, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function accessControlRoles(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';

  if (payload.queryItem) {
    api = `${API.administrationModule.accessControlRoles}?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.accessControlRoles}?expand=${expData}`;
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


export async function createAccessControlRole(payload) {
  const userToken = localStorage.getItem('AccessToken');

  let api = `${API.administrationModule.accessControlRoles}`;

  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateAccessControlRole(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlRoles}/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAccessControlRole(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlRoles}/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function accessControlActions(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'actGroup';

  if (payload.queryItem) {
    api = `${API.administrationModule.accessControlActions}?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.accessControlActions}?expand=${expData}`;
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

export async function accessControlActionsGroup() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlActions}/group`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function createAccessControlAction(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlActions}`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateAccessControlAction(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlActions}/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAccessControlaction(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlActions}/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}



export async function accessControlActionsGroupTab(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';

  if (payload.queryItem) {
    api = `${API.administrationModule.accessControlActionsGroupsTab}?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.accessControlActionsGroupsTab}?expand=${expData}`;
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


export async function createAccessControlActionGroup(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlActionsGroupsTab}`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateAccessControlActionGroup(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlActionsGroupsTab}/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAccessControlActionGroup(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlActionsGroupsTab}/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function accessControlAuthSettings(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'instructionImages';

  if (payload.queryItem) {
    api = `${API.administrationModule.accessControlAuthSetting}?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.accessControlAuthSetting}?expand=${expData}`;
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

export async function accessControlAuthSettingAuthencticationType(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlAuthSetting}/authentication-type`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function accessControlAuthSettingAuthencticationVendors() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlAuthSetting}/authentication-vendor`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function createAccessControlThirdPartyAuth(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlAuthSetting}`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateAccessControlThirdPartyAuth(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlAuthSetting}/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteAccessControlThirdPartyAuth(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlAuthSetting}/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function accessControlPrivileges(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'racRole';

  if (payload.queryItem) {
    api = `${API.administrationModule.accessControlAuthPrivileges}?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.accessControlAuthPrivileges}?expand=${expData}`;
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

export async function accessControlPrivilegeGroup() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlAuthPrivileges}/group`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function accessControlPrivilegeDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlAuthPrivileges}/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function accessControlPrivilegeUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlAuthPrivileges}/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function accessControlPrivilegeCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlAuthPrivileges}`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

// Product Setting
export async function accessControlProductSettingFeedback(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'fdbOrganization,fdbCreatedBy';

  if (payload.queryItem) {
    api = `${API.administrationModule.accessControlProductSetting}/feedback?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.accessControlProductSetting}/feedback?expand=${expData}`;
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
export async function deleteProductSettingFeedback(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/feedback/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function accessControlProductSettingWidgets(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'graGroup';

  if (payload.queryItem) {
    api = `${API.administrationModule.accessControlProductSetting}/widgets?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.accessControlProductSetting}/widgets?expand=${expData}`;
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

export async function accessControlProductSettingBackup(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = 'backupAge,backupTime';

  if (payload.queryItem) {
    api = `${API.administrationModule.accessControlProductSetting}/backup?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.accessControlProductSetting}/backup?expand=${expData}`;
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
export async function notifyUserList() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`${API.administrationModule.accessControlProductSetting}/backup/users-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}



export async function productSettingHealthAPI() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/health`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteProductSettingBackup(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/backup/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getBackupSettingAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/backup/setting`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createBackupList(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(`${API.administrationModule.accessControlProductSetting}/backup`, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function configureRestoreBackupAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(`${API.administrationModule.accessControlProductSetting}/backup/setting`, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function dowloadBackup(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`${API.administrationModule.accessControlProductSetting}/backup/download?id=${id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    responseType: "blob"
  });
  FileDownload(response.data, 'export.zip');
  return response.data;
}


export async function importBackup(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(`${API.administrationModule.accessControlProductSetting}/backup/import-backup`, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function RestoreBackup(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`${API.administrationModule.accessControlProductSetting}/backup/restore?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function accessControlWidgetDataSource() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/widgets/sources`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function accessControlWidgetDataGroup() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/widgets/group`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}



export async function deleteProductSettingWidget(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/widgets/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createProductSettingWidget(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/widgets`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateProductSettingWidget(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/widgets/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function productSettingLicense() {
  const userToken = localStorage.getItem('AccessToken');
  const expData = 'details';
  let api = `${API.administrationModule.accessControlProductSetting}/license?expand=${expData}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function uploadLicenseApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/license/upload`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function getModuleSources() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/license/sources`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function createLicenceRequest(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/license`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function patchUploadRequest(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/license/patch`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function notificationListApi() {
  const userToken = localStorage.getItem('AccessToken');
  const expData = '';
  let api = `${API.administrationModule.accessControlProductSetting}/notifications?expand=${expData}`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function notificationUpdateApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.accessControlProductSetting}/notifications/labels`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function fieldSettingListApi() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-fields`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function fieldSettingUpdateApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.assets}/asset-fields/enable-fields`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function fieldCaseSettingListApi() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/fields`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function caseFieldSettingUpdateApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.cases}/fields`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function caseGetTabsHeadingsApi(payload) {
  let response = { success: false };

  if (payload === 'all' || payload === 'assetsBussinessGroup') {
    const userToken = localStorage.getItem('AccessToken');
    let api = `${API.administration}/assets/source/change-title`;
    const sourceResponse = await axios.get(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });

    response = {
      ...response,
      success: true,
      data: {
        ...response.data,
        assetsBussinessGroup: sourceResponse?.data?.data?.bgp_label
      }
    }
  }

  if (payload === 'all' || payload === 'assetsType') {
    const userToken = localStorage.getItem('AccessToken');
    let api = `${API.administration}/assets/asset-type/change-title`;
    const assetsTypeResponse = await axios.get(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });

    response = {
      ...response,
      success: true,
      data: {
        ...response.data,
        assetsType: assetsTypeResponse?.data?.data?.aty_label
      }
    }
  }

  if (payload === 'all' || payload === 'assetsValue') {
    const userToken = localStorage.getItem('AccessToken');
    let api = `${API.administration}/assets/asset-value/change-title`;
    const assetsValueResponse = await axios.get(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });

    response = {
      ...response,
      success: true,
      data: {
        ...response.data,
        assetsValue: assetsValueResponse?.data?.data
      }
    }
  }

  if (payload === 'all' || payload === 'assetsClassification') {
    const userToken = localStorage.getItem('AccessToken');
    let api = `${API.administration}/assets/asset-classification/change-title`;

    const assetsClassificationResponse = await axios.get(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });

    response = {
      ...response,
      success: true,
      data: {
        ...response.data,
        assetsClassification: assetsClassificationResponse?.data?.data?.asc_label
      }
    }
  }

  if (payload === 'all' || payload === 'riskmanagementProbability') {
    const userToken = localStorage.getItem('AccessToken');
    let api = `${API.administration}/risk-management/probability/change-title`;
    const riskmanagementProbabilityResponse = await axios.get(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });

    response = {
      ...response,
      success: true,
      data: {
        ...response.data,
        riskmanagementProbability: riskmanagementProbabilityResponse?.data?.data
      }
    }
  }

  if (payload === 'all' || payload === 'businessImpact') {
    const userToken = localStorage.getItem('AccessToken');
    let api = `${API.administration}/risk-management/impact/change-title`;
    const businessImpactResponse = await axios.get(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });

    response = {
      ...response,
      success: true,
      data: {
        ...response.data,
        businessImpact: businessImpactResponse?.data?.data
      }
    }
  }

  if (payload === 'all' || payload === 'riskScore') {
    const userToken = localStorage.getItem('AccessToken');
    let api = `${API.administration}/risk-management/risk-score/change-title`;
    const riskScoreResponse = await axios.get(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    });

    response = {
      ...response,
      success: true,
      data: {
        ...response.data,
        riskScore: riskScoreResponse?.data?.data
      }
    }
  }


  return response;
}

export async function getRiskMatrixAPi() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-matrix/color`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getRiskMetaAPI() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-meta`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function riskMetaLabelUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-meta/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function riskMetaUpdateAPI(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-meta`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createRiskMatrixAPi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-matrix`;
  const response = await axios.post(api, payload, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function resetRiskMatrixAPi() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-matrix/reset`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getRiskMatrixRangeFromApi() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-matrix/rangefrom`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getRiskMatrixRangeToApi() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-matrix/rangeto`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getRiskMatrixColorListApi() {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.riskManagement}/risk-matrix/color-list`;
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function technicalSeverityLevel(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';

  if (payload.queryItem) {
    api = `${API.administrationModule.vulnerabilitySeverityLevelList}?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.vulnerabilitySeverityLevelList}?expand=${expData}`;
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
export async function technicalSeverityLevelCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(`${API.administrationModule.vulnerabilitySeverityLevelList}`, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function technicalSeverityLevelDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(`${API.administrationModule.vulnerabilitySeverityLevelList}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function technicalSeverityLevelUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(`${API.administrationModule.vulnerabilitySeverityLevelList}/${id}`, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function NontechnicalSeverityLevel(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (payload.queryItem) {
    api = `${API.administrationModule.vulnerabilityNonTechnicalSeverityLevel}?expand=${expData}&${payload.queryItem}`;
  } else {
    api = `${API.administrationModule.vulnerabilityNonTechnicalSeverityLevel}?expand=${expData}`;
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
export async function NontechnicalSeverityLevelCreated(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(`${API.administrationModule.vulnerabilityNonTechnicalSeverityLevel}`, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function NontechnicalSeverityLevelUpdated(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(`${API.administrationModule.vulnerabilityNonTechnicalSeverityLevel}/${id}`, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function NontechnicalSeverityLevelDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(`${API.administrationModule.vulnerabilityNonTechnicalSeverityLevel}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getThreatActor() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`${API.administrationModule.threatActor}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function getAssociateThreatActor() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`${API.administrationModule.associateThreatActor}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function associateThreatActorListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  const expData = '';
  if (data.queryItem) {
    api = `${API.administrationModule[data.tabName]}?${expData}&${data.queryItem
    }`;
  } else {
    api = `${API.administrationModule[data.tabName]}?${expData}`;
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
export async function administratorThreatActorCreate(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.threatActor}`;
  const response = await axios.post(api, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorThreatActorUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.threatActor}/${id}`;
  const response = await axios.put(api, payload, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function administratorThreatActorDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  let api = `${API.administrationModule.threatActor}/${id}`;
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

