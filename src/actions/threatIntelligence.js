import {
  THREAT_INTELLIGENCE_LIST_REQUESTED,
  FILTERED_CASES_REQUESTED,
  DELETE_THREAT_INTELLIGENCE_REQUESTED,
  THREAT_INTELLIGENCE_DETAILS_LIST_REQUESTED,
  THREAT_INTELLIGENCE_CATEGORIES_REQUESTED,
  THREAT_INTELLIGENCE_SEVERITY_REQUESTED,
  THREAT_INTELLIGENCE_ASSET_REQUESTED,
  THREAT_INTELLIGENCE_DEPARTMENTS_REQUESTED,
  THREAT_INTELLIGENCE_EVIDENCE_REQUESTED,
  THREAT_INTELLIGENCE_DISPOSITION_REQUESTED,
  THREAT_INTELLIGENCE_PRODUCTS_REQUESTED,
  THREAT_INTELLIGENCE_ADVISORY_VENDORS_REQUESTED,
  GET_PRODUCT_LIST_REQUESTED,
  GET_PRODUCT_LIST_SUCCESSED,
  GET_PRODUCT_LIST_FAILED,
  THREAT_INTELLIGENCE_EXPORT_PDF_REQUESTED,
  UPDATE_ADVERSORY_DETAILS_REQUESTED,
  UPDATE_ADVERSORY_DETAILS_RESET,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_REQUESTED,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_RESET,
  GET_RUN_PLAY_BOOK_DATA_REQUESTED,
  GET_RUN_PLAY_BOOK_DATA_SUCCESSED,
  GET_RUN_PLAY_BOOK_DATA_FAILED,
  THREAT_INTELLIGENCE_CREATE_ADVISORY_REQUESTED,
  THREAT_INTELLIGENCE_CREATE_ADVERSORY_DETAILS_RESET,
  EXECUTE_PLAY_BOOK_REQUESTED,
  EXECUTE_PLAY_BOOK_SUCCESSED,
  EXECUTE_PLAY_BOOK_FAILED,
  GET_USER_EMAILS_LIST_REQUESTED,
  GET_USER_EMAILS_LIST_SUCCESSED,
  GET_USER_EMAILS_LIST_FAILED,
  SEND_EMAIL_REQUESTED,
  SEND_EMAIL_SUCCESSED,
  SEND_EMAIL_FAILED,
  ADVISORY_SOURCE_REQUESTED,
  CASES_ADVISORY_LOCATIONS_REQUESTED,
  CASES_ADVISORY_USERS_REQUESTED,
  CASES_ADVISORY_ITEMS_REQUESTED,
  CASES_SUBDISPOSITIONS_REQUESTED,
  CASE_SUB_CATEGORIES_REQUESTED,
  OPEN_CASES_REQUESTED,
  UPDATE_ARTIFACT_REQUESTED,
  UPDATE_ARTIFACT_SUCCESSED,
  UPDATE_ARTIFACT_FAILED,
  EXECUTE_ACTION_REQUESTED,
  EXECUTE_ACTION_SUCCESSED,
  EXECUTE_ACTION_FAILED,
  MULTI_CONFIG_EXECUTION_REQUESTED,
  MULTI_CONFIG_EXECUTION_SUCCESSED,
  MULTI_CONFIG_EXECUTION_FAILED,
  ADVISORY_ADD_EVIDENCE_REQUESTED,
  ADVISORY_ADD_EVIDENCE_PROCESSING,
  ADVISORY_ADD_EVIDENCE_SUCCESSED,
  ADVISORY_ADD_EVIDENCE_FAILED,
  OPEN_CASES_RESET,
  ADVISORY_ARTIFACT_RAW_DATA_REQUESTED,
  ADVISORY_ARTIFACT_RAW_DATA_CLEAR,
  THREAT_INTELLIGENCE_FEED_LIST_REQUESTED,
  THREAT_INTELLIGENCE_FEED_DELETE_REQUESTED,
  THREAT_INTELLIGENCE_SEND_ADVISORY_REQUESTED,
  BULK_UPDATE_REQUESTED,
} from '../constants/actionTypes';

export function threatIntelligenceStore(payload) {
  return {
    type: THREAT_INTELLIGENCE_LIST_REQUESTED,
    payload: payload,
  };
}

export function threatIntelligenceStoreResetAfterUpdate() {
  return {
    type: UPDATE_ADVERSORY_DETAILS_RESET,
  };
}

export function threatIntelligenceStoreResetAfterAfterOpenCase() {
  return {
    type: OPEN_CASES_RESET,
  };
}

export function threatIntelligenceStoreResetAfterCreate() {
  return {
    type: THREAT_INTELLIGENCE_CREATE_ADVERSORY_DETAILS_RESET,
  };
}

export function threatIntelligenceDetail(id) {
  return {
    type: THREAT_INTELLIGENCE_DETAILS_LIST_REQUESTED,
    payload: id,
  };
}

export function updateAdvisory(id, payload, query, path, isList = false) {
  return {
    type: UPDATE_ADVERSORY_DETAILS_REQUESTED,
    id,
    payload,
    query,
    path,
    isList,
  };
}

export function sendAdvisory(id, query, path) {
  return {
    type: THREAT_INTELLIGENCE_SEND_ADVISORY_REQUESTED,
    id,
    query,
    path,
  };
}

export function createAdvisoryAction(payload, query, path) {
  return {
    type: THREAT_INTELLIGENCE_CREATE_ADVISORY_REQUESTED,
    payload: payload,
    query,
    path
  };
}

export function getProductDetails(payload) {
  return {
    type: GET_PRODUCT_LIST_REQUESTED,
    payload: payload,
  };
}

export function getCasesAdvisoryItem() {
  return {
    type: CASES_ADVISORY_ITEMS_REQUESTED,
  };
}

export function getSubCategories(id) {
  return {
    type: CASE_SUB_CATEGORIES_REQUESTED,
    id,
  };
}
export function getDisPositionsCategories(id) {
  return {
    type: CASES_SUBDISPOSITIONS_REQUESTED,
    id,
  };
}

export function getCaseAdvisroyUsers() {
  return {
    type: CASES_ADVISORY_USERS_REQUESTED,
  };
}

export function getProductDetailsSuccess(payload) {
  return {
    type: GET_PRODUCT_LIST_SUCCESSED,
    payload: payload,
  };
}

export function getProductDetailsFailure(payload) {
  return {
    type: GET_PRODUCT_LIST_FAILED,
    payload: payload,
  };
}

export function getUserEmailList(payload) {
  return {
    type: GET_USER_EMAILS_LIST_REQUESTED,
    payload: payload,
  };
}

export function getUserEmailListSuccess(payload) {
  return {
    type: GET_USER_EMAILS_LIST_SUCCESSED,
    payload: payload,
  };
}

export function getUserEmailListFailure(payload) {
  return {
    type: GET_USER_EMAILS_LIST_FAILED,
    payload: payload,
  };
}

export function updateArtifacts(payload) {
  return {
    type: UPDATE_ARTIFACT_REQUESTED,
    payload,
  };
}

export function updateArtifactsSuccess(payload) {
  return {
    type: UPDATE_ARTIFACT_SUCCESSED,
    payload: payload,
  };
}

export function updateArtifactsFailure(payload) {
  return {
    type: UPDATE_ARTIFACT_FAILED,
    payload: payload,
  };
}

export function sendEmail(payload) {
  return {
    type: SEND_EMAIL_REQUESTED,
    payload: payload,
  };
}

export function sendEmailSuccess(payload) {
  return {
    type: SEND_EMAIL_SUCCESSED,
    payload: payload,
  };
}

export function sendEmailFailure(payload) {
  return {
    type: SEND_EMAIL_FAILED,
    payload: payload,
  };
}

export function executePlaybook(payload) {
  return {
    type: EXECUTE_PLAY_BOOK_REQUESTED,
    payload: payload,
  };
}

export function executePlaybookSuccess(payload) {
  return {
    type: EXECUTE_PLAY_BOOK_SUCCESSED,
    payload: payload,
  };
}

export function executePlaybookFailure(payload) {
  return {
    type: EXECUTE_PLAY_BOOK_FAILED,
    payload: payload,
  };
}

export function executeAction(payload) {
  return {
    type: EXECUTE_ACTION_REQUESTED,
    payload: payload,
  };
}

export function executeActionSuccess(payload) {
  return {
    type: EXECUTE_ACTION_SUCCESSED,
    payload: payload,
  };
}

export function executeActionFailure(payload) {
  return {
    type: EXECUTE_ACTION_FAILED,
    payload: payload,
  };
}

export function multiConfigExecution(payload) {
  return {
    type: MULTI_CONFIG_EXECUTION_REQUESTED,
    payload: payload,
  };
}

export function multiConfigExecutionSuccess(payload) {
  return {
    type: MULTI_CONFIG_EXECUTION_SUCCESSED,
    payload: payload,
  };
}

export function multiConfigExecutionFailure(payload) {
  return {
    type: MULTI_CONFIG_EXECUTION_FAILED,
    payload: payload,
  };
}

export function getRunPlaybookData(payload) {
  return {
    type: GET_RUN_PLAY_BOOK_DATA_REQUESTED,
    payload: payload,
  };
}

export function getRunPlaybookDataSuccess(payload) {
  return {
    type: GET_RUN_PLAY_BOOK_DATA_SUCCESSED,
    payload: payload,
  };
}

export function getRunPlaybookDataFailure(payload) {
  return {
    type: GET_RUN_PLAY_BOOK_DATA_FAILED,
    payload: payload,
  };
}

export function getFilteredData(pathString) {
  return {
    type: FILTERED_CASES_REQUESTED,
    pathString,
  };
}

export function deleteData(id, query, path) {
  return {
    type: DELETE_THREAT_INTELLIGENCE_REQUESTED,
    id,
    query,
    path
  };
}
export function deleteFeed(id, query, path) {
  return {
    type: THREAT_INTELLIGENCE_FEED_DELETE_REQUESTED,
    id,
    query,
    path,
  };
}

export function openCasesRequest(id, payload) {
  return {
    type: OPEN_CASES_REQUESTED,
    id,
    payload,
  };
}

export const getCategories = () => ({
  type: THREAT_INTELLIGENCE_CATEGORIES_REQUESTED,
});

export const getSources = () => ({
  type: ADVISORY_SOURCE_REQUESTED,
});

export const getcaseAdvisoryLocation = () => ({
  type: CASES_ADVISORY_LOCATIONS_REQUESTED,
});

export const getSeverity = () => ({
  type: THREAT_INTELLIGENCE_SEVERITY_REQUESTED,
});

export const listAsset = () => ({
  type: THREAT_INTELLIGENCE_ASSET_REQUESTED,
});

// export const  getDepartments = () => ({
//   type: THREAT_INTELLIGENCE_DEPARTMENTS_REQUESTED,
// })
export function getDepartments() {
  return {
    type: THREAT_INTELLIGENCE_DEPARTMENTS_REQUESTED,
  };
}

export function getEvidence() {
  return {
    type: THREAT_INTELLIGENCE_EVIDENCE_REQUESTED,
  };
}

export function getDisposition() {
  return {
    type: THREAT_INTELLIGENCE_DISPOSITION_REQUESTED,
  };
}

export function getAdvisoryVendors() {
  return {
    type: THREAT_INTELLIGENCE_ADVISORY_VENDORS_REQUESTED,
  };
}

export function getProducts() {
  return {
    type: THREAT_INTELLIGENCE_PRODUCTS_REQUESTED,
  };
}

export const advisoryExportAsPDF = payload => ({
  type: THREAT_INTELLIGENCE_EXPORT_PDF_REQUESTED,
  payload,
});

export const updatePartialThreatIntelReset = payload => ({
  type: UPDATE_PARTIAL_THREAT_INTELLIGENCE_RESET,
});

export const updatePartialThreatIntel = (id, data, showMessage) => {
  return {
    type: UPDATE_PARTIAL_THREAT_INTELLIGENCE_REQUESTED,
    payload: {
      id,
      data,
      showMessage
    },
  };
};

export const addEvidence = (data, id) => {
  return {
    type: ADVISORY_ADD_EVIDENCE_REQUESTED,
    payload: {
      id,
      data,
    },
  };
};

export const getRawOutput = payload => {
  return {
    type: ADVISORY_ARTIFACT_RAW_DATA_REQUESTED,
    payload,
  };
};

export const clearRawOutput = () => ({
  type: ADVISORY_ARTIFACT_RAW_DATA_CLEAR,
});

export const addBulkUpdate = (payload, query, path) => {
  return {
    type: BULK_UPDATE_REQUESTED,
    payload,
    query,
    path
  };
};
