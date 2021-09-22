import axios from 'axios';
import API from '../config/endpoints.config';

export async function taskCreate({ url, payload }) {
  const userToken = localStorage.getItem('AccessToken');

  if (payload.http_method) {
    if (payload.http_method === 'put') {
      const response = await axios.put(url, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      });
      return response.data;
    }
    if (payload.http_method === 'delete') {
      const response = await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userToken,
        },
      });
      return response.data;
    }
  }
  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function listTasks(payload) {
  let  api = API.incidentManagementModule.task.create;
  const fields = [
    'invLaunchedBy', 'invAssignTo','invTaskCategory', 'invIncidents', 'invDepartment'
  ]
  const expanedString = fields.toString();
  api = api+'?expand='+expanedString;
  const userToken = localStorage.getItem('AccessToken');
  if(payload.inv_incidents_id){
    api = api+'&TasksSearch[inv_incidents_id]='+payload.inv_incidents_id;
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


export async function editTaskSaga(data) {
  const  api = API.incidentManagementModule.task.create;
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(api + '/' + data.inv_id, data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}


export async function deleteIncidentTask(payload) {
  const userToken = localStorage.getItem('AccessToken');
 

  const response = await axios.delete( API.incidentManagementModule.task.create + '/' + payload?.id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

 /* if (payload?.callback) {
    const postedComment = response?.data?.data?.data?.[0];
    if (postedComment) {
      postedComment.attachment = response?.data?.data?.[2];
    }

    payload.callback(postedComment);
  }*/
  return response.data;
}


