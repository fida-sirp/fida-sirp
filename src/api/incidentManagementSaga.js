import axios from 'axios';
import API from '../config/endpoints.config';

const FileDownload = require('js-file-download');

export async function listSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api;
  const expand = '?expand=itiSource,incidentAssets,itiCategory,itiOpenedBy,itiDisposition,itiSubcategory&';

  if (payload.disposition && payload.disposition !== 'all') {
    api = API.incidentManagement + '/' + payload.disposition + expand;
  } else {
    api = API.incidentManagement + expand;
  }

  if (payload.queryItem) {
    api += payload.queryItem;
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

export async function listIncidentSourcesSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.incidentManagement + '/sources', {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function listIncidentCustomersSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.incidentManagement + '/customer', {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function listIncidentSeveritySaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.incidentManagement + '/severity', {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function listIncidentDispositionSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.incidentManagement + '/disposition', {
    method: 'GET',
    params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function singleExportPdf(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagement + '/export?id=' + id,
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

export async function incidentDetailsSaga(id,isOnlyTask) {
  const userToken = localStorage.getItem('AccessToken');
  var fields = [
    'itiSource',
    'itiCategory',
    'itiDisposition',
    'itiAwareIncident',
    'itiDispositionSubCategory',
    'itiLocation',
    'itiOpenedBy',
    'incidentTasks',
    'incidentTasks.invAssignTo',
    'incidentTasks.invLaunchedBy',
    'incidentTasks.invTaskCategory',
    'incidentTasks.invDepartment',
    'incidentTasks.invAttachment',
    'incidentActions',
    'threatIntelligences',
    'virusTotals',
    'incidentComments',
    'incidentComments.icoAuthor',
    'incidentComments.attachment',
    'members',
    'incidentArtifact',
    'incidentAssets',
    'incidentTimeLine',
    'incidentTimeLine.aloUser',
    'incidentApps',
    'relatedIncidents',
    'evidenceAttachment',
    'itiSubcategory',
    'incidentActionsMapped',
    'treeGraph',
    'incidentComments.icoAuthor.profileImage' 
  ];
  if(isOnlyTask){
     fields = [
      'incidentTasks',
      'incidentTasks.invAssignTo',
      'incidentTasks.invLaunchedBy',
      'incidentTasks.invTaskCategory',
      'incidentTasks.invDepartment',
      'incidentTasks.invAttachment',
    ];
  }


  const expanedString = fields.toString();
  const response = await axios.get(
    API.incidentManagement + '/' + id + '?expand=' + expanedString,
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

export async function createSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.incidentManagement, data?.data, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editIncidentSaga(data) {
  if (data?.data?.atOnce) {
    const url = data?.data?.url;
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.put(url, data?.data?.data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + userToken,
      },
    });

  } else {
    const url = data?.url;
    delete data?.id;
    delete data?.url;
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.put(url, data, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    });

  }
    return response.data;
  }

export async function exportPdf(url = API.incidentManagement + '/export-pdf') {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    responseType: 'blob',
  });
  FileDownload(response.data, 'export.pdf');

  return response.data;
}

export async function exportExcel(url) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    responseType: 'blob',
  });
  FileDownload(response.data, 'export.xlsx');

  return response.data;
}

export async function sendEmailSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.incidentManagement + '/email?id=' + payload.id,
    payload.data,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  console.log(response);
  return response.data;
}

export async function deleteSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(API.incidentManagement + '/' + data?.id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}

export async function postComment({ id, payload }) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.incidentManagementModule.comment.post + '?id=' + id,
    payload?.data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  if (payload?.callback) {
    const postedComment = response?.data?.data?.data?.[0];
    if (postedComment) {
      postedComment.attachment = response?.data?.data?.data?.[2];
      postedComment.icoAuthor = response?.data?.data?.data?.[1];
    }

    payload.callback(postedComment);
  }
  return response.data;
}

export async function deleteIncidentAsset(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.incidentManagementModule.asset.deleteCall + '?id=' + payload?.id,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  if (payload?.callback) {
    const postedComment = response?.data?.data?.data?.[0];
    if (postedComment) {
      postedComment.attachment = response?.data?.data?.[2];
    }

    payload.callback(postedComment);
  }
  return response.data;
}

export async function addMemberToIncident(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.incidentManagementModule.member.add + '?id=' + payload?.id,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  if (payload?.callback) {
    payload.callback();
  }
  return response.data;
}

export async function deleteComment(payload) {
  console.log({ payload });
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    payload?.data?.ico_attachment && payload?.data?.ico_attachment !== ''
      ? API.incidentManagementModule.comment.deleteAttchement
      : API.incidentManagementModule.comment.delete,
    payload?.data,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );

  if (payload?.callback) {
    payload.callback(response);
  }
  return response.data;
}

export async function createIncidentSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const url = API.incidentManagementModule.update;

  const response = await axios.post(url, data?.data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getDispositionKeys(data) {
  const userToken = localStorage.getItem('AccessToken');
  const url = API.incidentManagementModule.dispositionKey;

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  if (data?.callback) {
    data.callback(response.data);
  }
  return response.data;
}

export async function getDispositionFields(data) {
  const userToken = localStorage.getItem('AccessToken');
  const url = `${API.incidentManagementModule.dispositionFields}?type=${data?.type}`;

  const response = await axios.get(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function bulkUpdateIncident(data) {
  const userToken = localStorage.getItem('AccessToken');
  const url = `${API.incidentManagementModule.bulkUpdate}`;

  const response = await axios.post(url, data?.data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


