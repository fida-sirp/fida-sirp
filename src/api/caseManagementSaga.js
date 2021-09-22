import axios from 'axios';
import API from '../config/endpoints.config';

const FileDownload = require('js-file-download');

export async function caseDetailsSaga(id, param) {
  let api;
  const userToken = localStorage.getItem('AccessToken');
  const fields = [
    'itiCategory',
    'timeLine',
    'itiDisposition',
    'itiAwareIncident',
    'itiDispositionSubCategory',
    'itiLocation',
    'itiOpenedBy',
    'incidentTasks',
    'incidentActions',
    'threatIntelligences',
    'virusTotals',
    'relatedCases',
    'incidentComments',
    'members',
    'incidentArtifact',
    'incidentAssets',
    'incidentTimeLine',
    'vulnerabilities',
    'vulnerabilities.vuaAsset.asset',
    'incidentComments.icoAuthor.profileImage',
    'itiSource',
    'advisories',
    'incidentTasks.invAssignTo',
    'incidentTasks.invLaunchedBy',
    'incidentTasks.invTaskCategory',
    'incidentTasks.invDepartment',
    'incidentTasks.invAttachment',
    'incidentComments.icoAuthor',
    'incidentComments.attachment',
    'incidentTimeLine.aloUser',
    'incidentApps',
    'relatedIncidents',
    'evidenceAttachment',
    'itiSubcategory',
    'incidentActionsMapped',
    'treeGraph',
    'risks',
   
  ];

  const expanedString = fields.toString();

  switch (param.toLowerCase()) {
    case "cases":
      api = API.cases + "/" + id + '?expand=' + expanedString
      break;
    case "incident":
      api = API.baseUrl + "/" + 'incident-management/' + id + '?expand=' + expanedString
      break;
    case "ncident":
      api = API.baseUrl + "/" + 'incident-management/' + id + '?expand=' + expanedString
      break;
    case "vulnerability":
      api = API.baseUrl + "/" + 'cases-vulnerability/' + id + '?expand=' + expanedString
      break;
    case "risk":
      api = API.baseUrl + "/" + 'cases-risk/' + id + '?expand=' + expanedString
      break;
    case "advisory":
      api = API.baseUrl + "/" + 'cases-advisory/' + id + '?expand=' + expanedString
      break;
    default:
      api = API.cases + '/' + id + '?expand=' + expanedString
  }
  const response = await axios.get(api,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  console.log('response.data', response.data);
  return response.data;
}



export async function createSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.caseManagementModule.update, data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function editCaseSaga(data) {
  if (data?.data?.atOnce) {
    let api;
    const { id } = data?.data
    switch (data?.caseType.toLowerCase()) {
      case "cases":
        api = API.cases + "/" + id
        break;
      case "incident":
        api = API.baseUrl + "/" + 'incident-management/' + id
        break;
      case "vulnerability":
        api = API.baseUrl + "/" + 'cases-vulnerability/' + id
        break;
      case "risk":
        api = API.baseUrl + "/" + 'cases-risk/' + id
        break;
      case "advisory":
        api = API.baseUrl + "/" + 'cases-advisory/' + id
        break;
      default:
        api = API.cases + '/' + id
    }
    const userToken = localStorage.getItem('AccessToken');
    const response = await axios.put(api, data?.data?.data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + userToken,
      },
    });
    return response.data;
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
    return response.data;
  }
}

export async function exportPdf(url = API.cases + '/export-pdf') {
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
  let api;
  switch (payload?.caseType.toLowerCase()) {
    case "cases":
      api = API.cases + "/email/?id=" + payload.id
      break;
    case "incident":
      api = API.baseUrl + "/" + 'incident-management/email/?id=' + payload.id
      break;
    case "vulnerability":
      api = API.baseUrl + "/" + 'cases-vulnerability/email/?id=' + payload.id
      break;
    case "risk":
      api = API.baseUrl + "/" + 'cases-risk/email/?id=' + payload.id
      break;
    case "advisory":
      api = API.baseUrl + "/" + 'cases-advisory/email/?id=' + payload.id
      break;
    default:
      api = API.cases + '/email/?id=' + payload.id
  }

  const response = await axios.post(
    api,
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

export async function postComment({ id, payload }) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.caseManagementModule.comment.post + '?id=' + id,
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
    }

    payload.callback(postedComment);
  }
  return response.data;
}

export async function deleteCaseAsset(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.caseManagementModule.asset.deleteCall + '?id=' + payload?.id,
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

export async function addMemberToCase(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.caseManagementModule.member.add + '?id=' + payload?.id,
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
