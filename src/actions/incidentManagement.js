import {
  INCIDENT_MANAGEMENT_LIST_REQUESTED,
  INCIDENT_SOURCES_LIST_REQUESTED,
  INCIDENT_CUSTOMERS_LIST_REQUESTED,
  INCIDENT_SEVERITY_LIST_REQUESTED,
  INCIDENT_DISPOSITION_LIST_REQUESTED,
  INCIDENT_SINGLE_EXPORT_PDF_LIST_REQUESTED,
  INCIDENT_DETAILS_REQUESTED,
  INCIDENT_MANAGEMENT_CREATE_REQUESTED,
  INCIDENT_MANAGEMENT_EDIT_REQUESTED,
  INCIDENT_EXPORT_PDF_LIST_REQUESTED,
  INCIDENT_EXPORT_EXCEL_LIST_REQUESTED,
  INCIDENT_SEND_EMAIL_REQUESTED,
  INCIDENT_POST_COMMENT_REQUESTED,
  INCIDENT_ASSET_DELETE_REQUESTED,
  INCIDENT_ADD_MEMBER_REQUESTED,
  DELETE_COMMENT_REQUESTED,
  GET_REPORT_TYPES_REQUESTED,
  GENERATE_REPORT_REQUESTED,
  DOWNLOAD_ARTIFCATS_FILE,
  INCIDENT_DISPOSITION_FIELD_FAILED,
  INCIDENT_DISPOSITION_KEY_REQUESTED,
  INCIDENT_DISPOSITION_FIELD_REQUESTED,
  DELETE_INCIDENT_REQUESTED,
  BULK_UPDATE_INCIDENT_REQUESTED,
  INCIDENT_TASK_DELETED_REQUESTED
} from '../constants/actionTypes';

export function listIncidentManagement(payload) {
  return {
    type: INCIDENT_MANAGEMENT_LIST_REQUESTED,
    payload: payload,
  };
}

export function listIncidentSources() {
  return {
    type: INCIDENT_SOURCES_LIST_REQUESTED,
  };
}

export function listIncidentCustomers() {
  return {
    type: INCIDENT_CUSTOMERS_LIST_REQUESTED,
  };
}

export function listIncidentSeverity() {
  return {
    type: INCIDENT_SEVERITY_LIST_REQUESTED,
  };
}

export function listIncidentDisposition() {
  return {
    type: INCIDENT_DISPOSITION_LIST_REQUESTED,
  };
}

export function singleExportPdf(id) {
  return {
    type: INCIDENT_SINGLE_EXPORT_PDF_LIST_REQUESTED,
    id: id,
  };
}

export function incidentDetails(id,isOnlyTask=false) {
  return {
    type: INCIDENT_DETAILS_REQUESTED,
    id: id,
    isOnlyTask:isOnlyTask
  };
}

export function createIncident(payload) {
  return {
    type: INCIDENT_MANAGEMENT_CREATE_REQUESTED,
    payload,
  };
}

export function editIncident(payload) {
  return {
    type: INCIDENT_MANAGEMENT_EDIT_REQUESTED,
    payload,
  };
}

export function exportPdf(payload) {
  return {
    type: INCIDENT_EXPORT_PDF_LIST_REQUESTED,
    payload,
  };
}

export function exportExcel(payload) {
  return {
    type: INCIDENT_EXPORT_EXCEL_LIST_REQUESTED,
    payload,
  };
}

export function sendEmail({ id, data }) {
  return {
    type: INCIDENT_SEND_EMAIL_REQUESTED,
    payload: { id, data },
  };
}

export function postComment({ id, payload }) {
  return {
    type: INCIDENT_POST_COMMENT_REQUESTED,
    payload: { id, payload },
  };
}

export function deleteIncidentAsset(payload) {
  return {
    type: INCIDENT_ASSET_DELETE_REQUESTED,
    payload,
  };
}

export function addMemberToIncident(payload) {
  return {
    type: INCIDENT_ADD_MEMBER_REQUESTED,
    payload,
  };
}

export function deleteComment(payload) {
  return {
    type: DELETE_COMMENT_REQUESTED,
    payload,
  };
}

export function getReportTypeAction(payload) {
  return {
    type: GET_REPORT_TYPES_REQUESTED,
    payload,
  };
}

export function generateReportTypeAction(payload) {
  return {
    type: GENERATE_REPORT_REQUESTED,
    payload,
  };
}

export function downloadAsset(payload) {
  return {
    type: DOWNLOAD_ARTIFCATS_FILE,
    payload,
  };
}

export function getDispositionKeysAction(payload) {
  return {
    type: INCIDENT_DISPOSITION_KEY_REQUESTED,
    payload,
  };
}

export function getDispositionFieldsAction(payload) {
  return {
    type: INCIDENT_DISPOSITION_FIELD_REQUESTED,
    payload,
  };
}

export function deleteIncidentAction(payload) {
  return {
    type: DELETE_INCIDENT_REQUESTED,
    payload,
  };
}

export function bulkUpdateIncidentAction(payload) {
  return {
    type: BULK_UPDATE_INCIDENT_REQUESTED,
    payload,
  };
}


export function deleteIncidentTaskAction(payload) {
  return {
    type: INCIDENT_TASK_DELETED_REQUESTED,
    payload,
  };
}

//
// export function editAsset(payload) {
//   return {
//     type: INCIDENT_MANAGEMENT_EDIT_REQUESTED,
//     payload,
//   };
// }

// export function deleteAsset(id, page = 1, parameter = '', perPage = 20) {
//   return {
//     type: INCIDENT_MANAGEMENT_DELETE_REQUESTED,
//     payload: { id, page, parameter, perPage },
//   };
// }

// export function listAssetClassification() {
//   return {
//     type: INCIDENT_MANAGEMENT_CLASSIFICATION_LIST_REQUESTED,
//   };
// }

// export function listAssetOS() {
//   return {
//     type: INCIDENT_MANAGEMENT_OS_LIST_REQUESTED,
//   };
// }

// export function getAssetTypeById(id) {
//   return {
//     type: INCIDENT_MANAGEMENT_TYPE_BY_ID_REQUESTED,
//     id,
//   };
// }

// export function assetDashboard(id) {
//   return {
//     type: INCIDENT_MANAGEMENT_DASHBOARD_REQUESTED,
//     id,
//   };
// }

// export function listAssetCategories() {
//   return {
//     type: INCIDENT_MANAGEMENT_CATEGORIES_LIST_REQUESTED,
//   };
// }
// export function listAssetEnableFields() {
//   return {
//     type: INCIDENT_MANAGEMENT_ENABLE_FIELDS_LIST_REQUESTED,
//   };
// }

// export function listAssetTypes() {
//   return {
//     type: INCIDENT_MANAGEMENT_TYPES_LIST_REQUESTED,
//   };
// }
