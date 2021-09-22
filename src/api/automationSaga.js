import axios from 'axios';
import API from '../config/endpoints.config';

export async function listAutomationUser(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  let statusQuery = '';
  if (payload.path) {
    statusQuery = `AutomationPlaygroundSearch[search]=${payload.path}&`;
  }

  const expData =
    'expand=inaAction.actApp.app_product_name,executionType,inaContainer,actApp.image';
  if (payload.queryItem) {
    api = `${API.automationList}?${expData}&${statusQuery}${payload.queryItem}`;
  } else {
    api = `${API.automationList}?${expData}&${statusQuery}`;
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


export async function automationDetailsSaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const expData =
    'expand=inaAction.actApp.app_product_name,executionType,inaContainer,actApp.image';
  const response = await axios.get(API.automationList + '/result?id=' + id + `&${expData}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationAritifactDelete(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(`${API.automationList}/artifacts/` + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationAritifactUpdate(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(
    `${API.automationList}/artifacts/` + id,
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

export async function automationDeleteSaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(API.automationList + '/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationApplicationSaga() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.automationList + '/application-list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function automationActionSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.automationList + '/action?id=' + data.id,
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
export async function automationInputSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  if (data.id) {
    const response = await axios.get(
      API.automationList + '/input?act_id=' + data.id,
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
  return null;
}

export async function automationCreateSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.automationList, payload, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function listAutomationArtifactUser(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  let statusQuery = '';
  if (payload.path) {
    statusQuery = `AdvisorySearch[adv_status]=${payload.path}&`;
  }

  const expData =
    // 'sort=ina_module,ina_incident_id,ina_id,ina_action_id,ina_input,ina_execution_time,ina_status';
    'expand=itiCount,advCount,caseCount,totalCount,download';
  if (payload.queryItem) {
    api = `${API.automationList}/artifacts?${expData}&${statusQuery}${payload.queryItem}`;
  } else {
    api = `${API.automationList}/artifacts?${expData}&${statusQuery}`;
  }
  const response = await axios.get(api, {
    method: 'GET',
    // params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationArtifactTypeSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.automationList + '/artifacts/type', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function occurenceListAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    `${API.automationList}/artifacts/occurence?id=${data.id}&container=${data.container}`,
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

export async function automationArtifactCreateSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.automationList + '/artifacts',
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

export async function listAutomationApprovalUser(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  let statusQuery = '';
  if (payload.path) {
    statusQuery = `ApplicationApprovalSearch[adv_status]=${payload.path}&`;
  }

  const expData =
    // 'sort=aap_act_name,aap_app_name,aap_source,aap_status,aap_container,aap_approved_by';
    'expand=appContainer,aapApprovedBy';
  if (payload.queryItem) {
    // api = `${API.automationList}/artifacts?${expData}&${statusQuery}`;
    api = `${API.automationList}/approvals?${expData}&${statusQuery}${payload.queryItem}`;
  } else {
    api = `${API.automationList}/approvals?${expData}&${statusQuery}`;
  }
  const response = await axios.get(api, {
    method: 'GET',
    // params: payload,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function automationArtifactExecuteApplicationSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.automationList + '/artifacts/execute?id=' + data,
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

export async function approveRecordSaga(data) {
  const shouldApprove = data?.shouldApprove ? 'approve' : 'decline';
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.automationList + `/approvals/${shouldApprove}?id=${data.id}`,
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

export async function automationArtifactExecuteActionSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.automationList +
    '/artifacts/action?id=' +
    data.id +
    '&artifact=' +
    data.artifact,
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

export async function ArtifactExecuteSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.automationList + '/artifacts/execute-action',
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
