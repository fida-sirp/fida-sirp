import {
  CASE_MANAGEMENT_LIST_REQUESTED,
  CASE_SOURCES_LIST_REQUESTED,
  CASE_CUSTOMERS_LIST_REQUESTED,
  CASE_SEVERITY_LIST_REQUESTED,
  CASE_DISPOSITION_LIST_REQUESTED,
  CASE_SINGLE_EXPORT_PDF_LIST_REQUESTED,
  CASE_DETAILS_REQUESTED,
  CASE_MANAGEMENT_CREATE_REQUESTED,
  CASE_MANAGEMENT_EDIT_REQUESTED,
  CASE_EXPORT_PDF_LIST_REQUESTED,
  CASE_EXPORT_EXCEL_LIST_REQUESTED,
  CASE_SEND_EMAIL_REQUESTED,
  CASE_POST_COMMENT_REQUESTED,
  CASE_ASSET_DELETE_REQUESTED,
  CASE_ADD_MEMBER_REQUESTED,
} from '../constants/actionTypes';

export function listCaseManagement(payload) {
  return {
    type: CASE_MANAGEMENT_LIST_REQUESTED,
    payload: payload,
  };
}

export function listCaseSources() {
  return {
    type: CASE_SOURCES_LIST_REQUESTED,
  };
}

export function listCaseCustomers() {
  return {
    type: CASE_CUSTOMERS_LIST_REQUESTED,
  };
}

export function listCaseSeverity() {
  return {
    type: CASE_SEVERITY_LIST_REQUESTED,
  };
}

export function listCaseDisposition() {
  return {
    type: CASE_DISPOSITION_LIST_REQUESTED,
  };
}

export function singleExportPdf(id) {
  return {
    type: CASE_SINGLE_EXPORT_PDF_LIST_REQUESTED,
    id: id,
  };
}

export function caseDetails(id, param) {
  return {
    type: CASE_DETAILS_REQUESTED,
    id,
    param,
  };
}

export function createCase(payload) {
  return {
    type: CASE_MANAGEMENT_CREATE_REQUESTED,
    payload,
  };
}

export function editCase(payload) {
  return {
    type: CASE_MANAGEMENT_EDIT_REQUESTED,
    payload,
  };
}

export function exportPdf(payload) {
  return {
    type: CASE_EXPORT_PDF_LIST_REQUESTED,
    payload,
  };
}

export function exportExcel(payload) {
  return {
    type: CASE_EXPORT_EXCEL_LIST_REQUESTED,
    payload,
  };
}

export function sendEmail({ id, data, caseType }) {
  return {
    type: CASE_SEND_EMAIL_REQUESTED,
    payload: { id, data, caseType },
  };
}

export function postComment({ id, payload }) {
  return {
    type: CASE_POST_COMMENT_REQUESTED,
    payload: { id, payload },
  };
}

export function deleteCaseAsset(payload) {
  return {
    type: CASE_ASSET_DELETE_REQUESTED,
    payload,
  };
}

export function addMemberToCase(payload) {
  return {
    type: CASE_ADD_MEMBER_REQUESTED,
    payload,
  };
}
