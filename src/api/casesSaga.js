import axios from 'axios';
import API from '../config/endpoints.config';

export async function casesSaga(payload, activeOption) {
  const userToken = localStorage.getItem('AccessToken');
  let  api = "";
  const fields = [
    'incidentTasks.invAssignTo',
    'incidentTasks.invLaunchedBy',
    'incidentTasks.invTaskCategory',
    'incidentTasks.invDepartment',
    'itiDisposition','itiCategory','itiOpenedBy','incidentTasks',
  ]
  const expanedString = fields.toString();

  switch (activeOption) {
    case "filter":
      if (payload.queryItem) {
        api = API.cases + '?expand=' + expanedString + '&' + payload.queryItem
      } else {
        api = API.cases + '?expand=' + expanedString + '&' + payload.queryItem
      }
      break;
    case "incident":
      if (payload.queryItem) {
        api = API.baseUrl + "/" + 'incident-management' + '?expand=' + expanedString + '&' + payload.queryItem
      } else {
        api = API.baseUrl + "/" + 'incident-management' + '?expand=' + expanedString + '&';
      }
      break;
    case "vulnerability":
      if (payload.queryItem) {
        api = API.baseUrl + "/" + 'cases-vulnerability' + '?expand=' + expanedString + '&' + payload.queryItem
      } else {
        api = API.baseUrl + "/" + 'cases-vulnerability' + '?expand=' + expanedString + '&'
      }
      break;
    case "risk":
  if(payload.queryItem){
        api = API.baseUrl + "/" + 'cases-risk' + '?expand=' + expanedString + '&' + payload.queryItem
      } else {
        api = API.baseUrl + "/" + 'cases-risk' + '?expand=' + expanedString + '&'
      }
      break;
    case "advisory":
      if (payload.queryItem) {
        api = API.baseUrl + "/" + 'cases-advisory' + '?expand=' + expanedString + '&' + payload.queryItem
      } else {
        api = API.baseUrl + "/" + 'cases-advisory' + '?expand=' + expanedString + '&';
      }
      break;
    default:
      if (payload.queryItem) {
        api = API.cases + '?expand=' + expanedString + '&' + payload.queryItem
  }else{
        api = API.cases + '?expand=' + expanedString + '&' + payload.queryItem
  }
  }

  // if (payload.queryItem) {
  //   api = API.cases + '?expand=' + expanedString + '&' + payload.queryItem;
  // } else {
  //   api = API.cases + '?expand=' + expanedString + '&';
  // }
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function filterSaga(filterData) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.searchCases + filterData, {
    // method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function deleteSaga(id, activeTab) {
  const userToken = localStorage.getItem('AccessToken');
  let api;
  switch (activeTab.toLowerCase()) {
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
  const response = await axios.delete(api, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function categorySaga(categoryData) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.casesCategory, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


