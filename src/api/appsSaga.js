import axios from 'axios';
import { isEmpty } from 'lodash';
import API from '../config/endpoints.config';
const FileDownload = require('js-file-download');

export async function applicationSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  let statusQuery = '';
  if (payload?.path) {
    statusQuery = `ApplicationsSearch[search]=${payload.path}&`;
  }

  const expData = 'expand=applicationActions,appProductVendor,image,orgApps';
  if (!isEmpty(payload)) {
    if (payload.queryItem) {
      api = `${API.applications}?sort=app_product_name&${expData}&${statusQuery}${payload.queryItem}`;
    } else {
      api = `${API.applications}?sort=app_product_name&${expData}&${statusQuery}`;
    }
  } else {
    api = `${API.applications}?${expData}`;
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

export async function udpateApplicationDetailsApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const requestBody = {
    [data.filedName]: data.fieldValue,
  };
  const response = await axios.put(
    API.applications + '/' + data.id,
    requestBoday,
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

export async function udpateApplicationStatusApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.applicationsDisable + `?id=${data.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function udpateConfigurationDetailsApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const payload = data?.data;  
  const response = await axios.post(
    API.applicationsConfigIntegrate +
    `?id=${data.id}&multiconfig=${data.multiconfig}`,
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

export async function getConfigurationDetailsApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.applications +
    `/integrate-data?id=${data.id}&multiconfig=${data.multiconfig}`,
    {
      //   const response = await axios.get(API.applicationsConfig + `?id=${data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export async function getConfigurationFieldsDataApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.applications +
    `/integrate-data?id=${data.id}&multiconfig=${data.multiconfig}`,
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

export async function checkIsMultiConfigApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.applications + `/${data.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getMultiDataPopupDetailsApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.applicationsIntegrateMultiData + `?id=${data.id}`,
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

export async function updateMultiDataPopupDetailsApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  let payload = { OrganizationApplications: data?.data };
  const response = await axios.post(
    API.applicationsIntegrateMulti + `?id=${data.id}`,
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
export async function getApplicationVendorListApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.applicationsVendorsList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getApplicationPublishersListApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.applicationsPublishers, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getApplicationTypeListApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.applicationsType, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getApplicationRateLimitApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.applicationsRateLimit, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createApplicationApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const requestBody = {
    app_product_name: data?.app_name,
    app_product_vendor_id: data?.app_product_vendor,
    app_product_website_url: data?.app_product_website_url,
    app_version: data?.app_version,
    app_deprecated: data?.app_is_deprecated,
    app_type: data?.app_type,
    app_publisher_id: data?.app_publisher,
    app_rate_limit: data?.app_rate_limit,
    app_rate_limit_count: data?.app_rate_limit_count,
    app_multi_config_allowed: data?.app_multi_configuration_allowed,
    app_status: data?.app_status,
  };
  const response = await axios.post(API.applications, requestBody, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateApplicationApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(
    `${API.applications}/${data.id}`,
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

export async function getApprovalFlowListApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  let statusQuery = '';
  if (data?.path) {
    statusQuery = `ApplicationWorkflowSearch[search]=${data.path}&`;
  }

  const expData = 'expand=primary,secondary';
  if (data.queryItem) {
    api = `${API.applicationsApprovalWorkFlow}?${expData}&${statusQuery}${data.queryItem}`;
  } else {
    api = `${API.applicationsApprovalWorkFlow}?${expData}&${statusQuery}`;
  }
  const response = await axios.get(api, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;

  //   const userToken = localStorage.getItem('AccessToken');
  //   const response = await axios.get(API.applicationsApprovalWorkFlow, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + userToken,
  //     },
  //   });
  //   return response.data;
}

export async function getPrimaryListApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.applicationsPrimaryApproversList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createApprovalWorkFlowApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.applications + '/approval-workflow',
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

export async function getActionApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  // let api = '';
  // let statusQuery = '';
  // if (data?.path) {
  //   statusQuery = `ApplicationActionsSearch[search]=${data.path}&`;
  // }

  const expData =
    'expand=actApp,actOutputType,actInputType,approvalMapping.apmWorkflow';
  const api = `${API.applicationAction}?ApplicationActionsSearch[act_app_id]=${data.id}&${expData}`;
  // if (data.queryItem) {
  //   api = `${API.applicationAction}/ApplicationActionsSearch[act_app_id]=${data.id}&${expData}&${statusQuery}${data.queryItem}`;
  // } else {
  //   api = `${API.applicationAction}/ApplicationActionsSearch[act_app_id]=${data.id}&${expData}&${statusQuery}`;
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

export async function getActionWorkFlowApi() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(`${API.applicationAction}/work-flow-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateActionWorkFlowApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    `${API.applicationAction}/update-workflow?id=${data.id}`,
    data.payload,
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

export async function udpateApprovalWorkFlowDetailsApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(
    API.applications + '/approval-workflow/' + data.id,
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

export async function deleteWorkFlowApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(
    API.applications + '/approval-workflow/' + data?.id,
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

export async function deleteApplicationApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(`${API.applications}/${data.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });

  return response.data;
}


export async function getAppsConfigsApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.applications +
    `/config-data?id=${data.id}`,
    {
      //   const response = await axios.get(API.applicationsConfig + `?id=${data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export async function appConfigAdd(id, payload) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.applications + `/config?id=${id}`,
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