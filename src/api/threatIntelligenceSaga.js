import axios from 'axios';
import API from '../config/endpoints.config';
const FileDownload = require('js-file-download');

export async function threatIntelligenceSaga(payload) {
  const userToken = localStorage.getItem('AccessToken');
  let api = '';
  let statusQuery = '';
  if (payload.path) {
    statusQuery = `AdvisorySearch[adv_status]=${payload.path}&`;
  }
  const expData =
    // 'expand=advDisposition,advCase,advCategory,advOpenedBy,advOrganization,advSource,advisoryComments,advArtifactMapping,advArtifacts,advAsset,advAsset.astOwner,advAssetType,relatedAdvisories,timeLine,advIoc,incidentActions,compromisedAssets.astOwner';
    'expand=advDisposition,advCategory,advOpenedBy,advArtifactMapping,advSource,compromisedAssets,advOrganization';
  if (payload && payload.path && payload.path === 'threat-feeds') {
    api = `${API.advisory}/${payload.path}?${payload.queryItem}`;
  } else if (payload.queryItem) {
    api = `${API.advisory}?${expData}&${statusQuery}${payload.queryItem}`;
  } else {
    api = `${API.advisory}?${expData}&${statusQuery}`;
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
export async function threatIntelligenceDetailsSaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const fields = [
    'advApps',
    'advDisposition',
    'advCase',
    'advCategory',
    'advOpenedBy',
    'advOrganization',
    'advSource',
    'advisoryComments',
    'advArtifactMapping',
    'advArtifacts',
    'advAsset',
    'advAsset.astOwner',
    'advAssetType',
    'relatedAdvisories',
    'timeLine',
    'advIoc',
    'incidentActions',
    'incidentActionsMapped',
    'compromisedAssets.astOwner',
    'treeGraph',
    'compromisedAssets',
  ];

  const expandString = fields.toString();
  const response = await axios.get(
    API.advisory + '/' + id + '?expand=' + expandString,
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

export async function filterSaga(filterData) {
  //   const userToken = localStorage.getItem('AccessToken');
  //   const response = await axios.get(API.searchCases + filterData, {
  //     // method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer ' + userToken,
  //     },
  //   });
  //   return response.data;
}

export async function rawDataSaga(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.advisoryArtifactRawOutput + '?id=' + data.id,
    {
      // method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
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
    API.advisoryAddEvidence + '?id=' + data.id,
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

export async function deleteSaga(deleteCaseData) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(API.advisory + '/' + deleteCaseData, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function deleteFeed(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.delete(`${API.advisory}/threat-feeds/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function sendAdviosry(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    `${API.advisory}/threat-feeds/send-advisory?id=${id}`,
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
export async function threatIntelligenceCategorySaga(categoryData) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisoryCategory, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceCasesSubCategory(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.casesSubcategories + '?cat_id=' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceSubdispositionsSaga(id) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.CasessubDispositions + '?cat_id=' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceSeveritySaga(categoryData) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisorySeverity, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceAssetSaga(categoryData) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.assetList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceDepartmentSaga(categoryData) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisoryDepartments, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceEvidencesaga() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisoryEvidence, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceDispositionssaga() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisoryDispositions, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceOpenCaseSaga(id, requestBody) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(`${API.openCase}?vid=${id}`, requestBody, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceProductsaga() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisoryProducts, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
export async function threatIntelligenceVendors() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisoryVendors, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceSources() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisorySources, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceCasesAdvisoryLocation() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.casesAdvisorylocation, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getProductDatails() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisoryProducts, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getCaseAdvisoryItem() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.caseAdvisoryItems, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function getCaseAdvisoryUsers() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.casesAdvisoryUserList, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function updateAdvisoryDetails(id, data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.put(API.advisory + '/' + id, data, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function createAdvisory(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(API.advisory, data, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function threatIntelligenceExportAsPDF(id) {
  const userToken = localStorage.getItem('AccessToken');

  // const xhr = new XMLHttpRequest();
  // xhr.open('GET', `${API.advisoryExport}?id=${id}`, true);
  // xhr.responseType = 'arraybuffer';
  // xhr.setRequestHeader('Authorization', 'Bearer ' + userToken);
  // xhr.onload = function (e) {
  //   if (this.status === 200) {
  //     const blob = new Blob([this.response], { type: 'application/pdf' });
  //     const link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob);
  //     link.download = 'Report_' + new Date() + '.pdf';
  //     link.click();
  //   }
  // };
  // xhr.send();

  const response = await axios.get(`${API.advisoryExport}?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
    responseType: 'blob',
  });
  FileDownload(response.data, `Report_${new Date()}.pdf`);
  return response.data;
}

export async function updatePartialThreatIntelApi(payload) {
  const userToken = localStorage.getItem('AccessToken');
  const requestBody = payload?.data;
  const response = await axios.post(
    API.advisoryCustomUpdate + '?id=' + payload?.id,
    requestBody,
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

export async function getRunPlayBookDataApi() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisoryPlayBook, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function executePlayBookAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const requestBody = {
    palybookid: data?.payload?.playBookID,
  };
  var baseItem  = API.advisoryPlayBook;
  if(data?.payload?.type == 'incident'){
    baseItem = API.incidentPlayBook;
  }

  const response = await axios.post(
    baseItem + '?id=' + data?.payload?.id,
    requestBody,
    {

      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export async function getUserEmailListApi() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(API.advisoryUserEmail, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}

export async function sendEmailApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const requestBody = {
    send_email_ids: data.payload.data.to,
    send_email_cc_ids: data.payload.data.cc,
    send_email_formats: 'advisory-follow-up',
    email_note: data.payload.data.description,
    send_email_template: data.payload.data.template,
  };

  const response = await axios.post(
    API.advisorySendEmail + '?id=' + data?.payload?.selecteAdvisorieId,
    requestBody,
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

export async function updateArtifactsApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  let payload = "";
  if (data?.payload?.type === "update") {
    const updateArtifactKey = `Artifact_${[data.payload.evidenceLabel]}`;
    payload = {
      [updateArtifactKey]: data?.payload?.updatedArtifact,
    };
  } else {
    console.log(">>>socket",)
    if (Object.keys(data?.payload?.updatedArtifact)[0] === 'Artifact_Header' || Object.keys(data?.payload?.updatedArtifact)[0] === 'Artifact_File') {
      console.log(">>>check")
      payload = {
        ...data.payload.updatedArtifact,
        "status": "0"
      }
    } else {
      payload = {
        ...data.payload.updatedArtifact,
      };
    }
  }
  console.log(">>>freee", payload)

  const response = await axios.post(
    API.advisoryArtifactUpdate + '?id=' + data.payload?.selecteAdvisorieId,
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

export async function executeActionApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const requestBody = {
    act_is_multiinput: data.payload.actionInfo.item.details.act_is_multiinput,
    app_multi_config_allowed:
      data.payload.actionInfo.itemDetails.app_multi_config_allowed,
    t_ID: data.payload.selecteAdvisorieId,
    act: data.payload.actionInfo.item.details.act_id,
    input: data.payload.actionInfo.inputName,
    module: 'Advisory',
    multi_step: '',
    app: data.payload.actionInfo.item.details.app_id,
  };
  const response = await axios.post(
    API.advisoryArtifactExectuteAction,
    requestBody,
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

export async function multiExecuteActionApi(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(
    API.advisoryArtifactMultiConfigExectuteAction,
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

export async function bulkUpdateAPI(data) {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.post(`${API.advisory}/bulk`, data, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userToken,
    },
  });
  return response.data;
}
