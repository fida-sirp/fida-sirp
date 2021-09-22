import axios from 'axios';
import API from '../config/endpoints.config';
const FileDownload = require('js-file-download');

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

export async function addEvidenceSaga(data) {
  console.log(data.data);
  const userToken = localStorage.getItem('AccessToken');
  const payload = {
    heading: data.data.values.heading,
    ina_output_html: data.data.ina_output_html,
  };
  const response = await axios.post(
    API.incidentManagement + '/add-evidence'  + '?id=' + data.id,
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


export async function listMemberUserGroups(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.incidentManagement + '/user-group', {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getIncidentManagementSeverity() {
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

export async function getIncidentcategory() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagementModule.master.category,
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

export async function getIncidentsubCategory(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    `${API.incidentManagementModule.master.subCategory}?cat_id=${payload?.cat_id}`,
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

export async function getIncidentdisposition() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagementModule.master.disposition,
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

export async function getIncidentsubDisposition(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    `${API.incidentManagementModule.master.subDisposition}?disp_id=${payload?.disp_id}`,
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

export async function getIncidentlocation() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagementModule.master.location,
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

export async function getIncidentdetectionMethods() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagementModule.master.detectionMethods,
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

export async function getIncidentartifacts() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagementModule.master.artifacts,
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

export async function getIncidentartifactList() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagementModule.master.artifactList,
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
  const response = await axios.get(
    API.incidentManagementModule.actionApp.list,
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

export async function runActions(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const url = payload?.url ?? API.incidentManagementModule.runActions;
  const response = await axios.post(url, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function addArtifact(payload) {
  const id = payload?.id;
  const url = payload?.url;
  delete payload?.id;
  delete payload?.url;
  delete payload?.type;
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    `${url ?? API.incidentManagementModule.artifact.update}?id=${id}`,
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

export async function getRowOutput(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    `${API.incidentManagementModule.rowOutput}?id=${id}`,
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

export async function reportTypes() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.incidentManagementModule.reportType, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function generateReport(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.incidentManagementModule.generateReport,
    payload,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
      responseType: 'blob',
    }
  );

  console.log({ generateReport: response });
  let ext = 'xlsx';
  if (
    response?.headers?.['content-type'] &&
    response?.headers?.['content-type'].includes('pdf')
  ) {
    ext = 'pdf';
  }

  FileDownload(response.data, `report.${ext}`);
  return response.data;
}

export async function downloadAsset(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(payload?.url, {
    headers: {
      Authorization: 'Bearer ' + userToken,
    },
    responseType: 'blob',
  });
  console.log('testing---------------');
  FileDownload(
    response.data,
    `${payload?.name ?? 'evidence'}.${payload?.ext.split('__')?.[0] ?? 'zip'}`
  );
  return response.data;
}
