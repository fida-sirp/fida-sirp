import {
  CHECK_IS_MULTI_CONFIG_FAILED,
  CHECK_IS_MULTI_CONFIG_REQUESTED,
  CHECK_IS_MULTI_CONFIG_SUCCESSED,
  GET_APPLICATION_TYPE_LIST_REQUESTED,
  GET_APPLICATION_TYPE_LIST_SUCCESSED,
  GET_APPLICATION_TYPE_LIST_FAILED,
  GET_APPLICATION_PUBLISHERS_LIST_FAILED,
  GET_APPLICATION_PUBLISHERS_LIST_REQUESTED,
  GET_APPLICATION_PUBLISHERS_LIST_SUCCESSED,
  GET_APPLICATION_VENDOR_LIST_FAILED,
  GET_APPLICATION_VENDOR_LIST_REQUESTED,
  GET_APPLICATION_VENDOR_LIST_SUCCESSED,
  GET_APPS_DETAILS_FAILED,
  GET_APPS_DETAILS_REQUESTED,
  GET_APPS_DETAILS_SUCCESSED,
  GET_CONFIGURATION_DETAILS_FAILED,
  GET_CONFIGURATION_DETAILS_REQUESTED,
  GET_CONFIGURATION_DETAILS_SUCCESSED,
  GET_CONFIGURATION_FIELD_VALUE_FAILED,
  GET_CONFIGURATION_FIELD_VALUE_REQUESTED,
  GET_CONFIGURATION_FIELD_VALUE_SUCCESSED,
  SET_FEEDBACK_ALERT,
  UPDATE_APPLICATION_DETAILS_FAILED,
  UPDATE_APPLICATION_DETAILS_REQUESTED,
  UPDATE_APPLICATION_DETAILS_SUCCESSED,
  UPDATE_APPLICATION_STATUS_FAILED,
  UPDATE_APPLICATION_STATUS_REQUESTED,
  UPDATE_APPLICATION_STATUS_SUCCESSED,
  UPDATE_CONFIGURATION_FILEDS_DETAILS_FAILED,
  UPDATE_CONFIGURATION_FILEDS_DETAILS_REQUESTED,
  UPDATE_CONFIGURATION_FILEDS_DETAILS_SUCCESSED,
  GET_APPLICATION_RATE_LIST_REQUESTED,
  GET_APPLICATION_RATE_LIST_SUCCESSED,
  GET_APPLICATION_RATE_LIST_FAILED,
  CREATE_APPLICATION_REQUESTED,
  CREATE_APPLICATION_SUCCESSED,
  CREATE_APPLICATION_FAILED,
  GET_APPROVAL_FLOW_LIST_REQUESTED,
  GET_APPROVAL_FLOW_LIST_SUCCESSED,
  GET_APPROVAL_FLOW_LIST_FAILED,
  GET_PRIMARY_APPROVERS_LIST_REQUESTED,
  GET_PRIMARY_APPROVERS_LIST_SUCCESSED,
  GET_PRIMARY_APPROVERS_LIST_FAILED,
  UPDATE_APPROVAL_WORKFLOW_DETAILS_REQUESTED,
  UPDATE_APPROVAL_WORKFLOW_DETAILS_SUCCESSED,
  UPDATE_APPROVAL_WORKFLOW_DETAILS_FAILED,
  DELETE_APPROVAL_WORKFLOW_REQUESTED,
  DELETE_APPROVAL_WORKFLOW_SUCCESSED,
  DELETE_APPROVAL_WORKFLOW_FAILED,
  CREATE_APPROVAL_WORKFLOW_DETAILS_REQUESTED,
  GET_APPS_ACTION_DETAILS_REQUESTED,
  GET_APPS_ACTION_WORKFLOW_REQUESTED,
  UPDATE_APPS_ACTION_WORKFLOW_REQUESTED,
  UPDATE_MULTI_CONFIGURATION_FILEDS_DETAILS_REQUESTED,
  DELETE_APPLICATION_REQUESTED,
  UPDATE_APPLICATION_REQUESTED,
  UPDATE_APP_WORKFLOW_TOGGLE,
  APP_CONFIG_REQUESTED,
  APP_CONFIG_ADD_REQUESTED,
} from '../constants/actionTypes';

export function getAppsDetailsRequested(payload) {
  return {
    type: GET_APPS_DETAILS_REQUESTED,
    payload: payload,
  };
}

export function getAppsActionDetails(payload) {
  return {
    type: GET_APPS_ACTION_DETAILS_REQUESTED,
    payload: payload,
  };
}

export function getAppsWorkflowDetails() {
  return { type: GET_APPS_ACTION_WORKFLOW_REQUESTED };
}

export function updateWorkFlowDetails(payload) {
  return {
    type: UPDATE_APPS_ACTION_WORKFLOW_REQUESTED,
    payload,
  };
}
export function getAppsDetailsSuccess(payload) {
  return {
    type: GET_APPS_DETAILS_SUCCESSED,
    payload: payload,
  };
}

export function getAppsDetailsFailed(payload) {
  return {
    type: GET_APPS_DETAILS_FAILED,
    payload: payload,
  };
}

export function getConfigurationDetailsRequested(payload) {
  return {
    type: GET_CONFIGURATION_DETAILS_REQUESTED,
    payload: payload,
  };
}

export function getAppsConfig(payload) {
  return {
    type: APP_CONFIG_REQUESTED,
    payload: payload,
  };
}
export function addConfig(id, payload, query) {
  return {
    type: APP_CONFIG_ADD_REQUESTED,
    id,
    payload,
    query
  };
}

export function getConfigurationDetailsSuccess(payload) {
  return {
    type: GET_CONFIGURATION_DETAILS_SUCCESSED,
    payload: payload,
  };
}

export function getConfigurationDetailsFailed(payload) {
  return {
    type: GET_CONFIGURATION_DETAILS_FAILED,
    payload: payload,
  };
}

export function getConfigurationFieldsDetailsRequested(payload) {
  return {
    type: GET_CONFIGURATION_FIELD_VALUE_REQUESTED,
    payload: payload,
  };
}

export function getConfigurationFieldsDetailsSuccess(payload) {
  return {
    type: GET_CONFIGURATION_FIELD_VALUE_SUCCESSED,
    payload: payload,
  };
}

export function getConfigurationFieldsDetailsFailed(payload) {
  return {
    type: GET_CONFIGURATION_FIELD_VALUE_FAILED,
    payload: payload,
  };
}

export function updateApplicationDetailsRequested(payload) {
  return {
    type: UPDATE_APPLICATION_DETAILS_REQUESTED,
    payload: payload,
  };
}

export function updateApplicationDetailsSuccess(payload) {
  return {
    type: UPDATE_APPLICATION_DETAILS_SUCCESSED,
    payload: payload,
  };
}

export function updateApplicationDetailsFailed(payload) {
  return {
    type: UPDATE_APPLICATION_DETAILS_FAILED,
    payload: payload,
  };
}

export function updateApplicationStatusRequested(payload) {
  return {
    type: UPDATE_APPLICATION_STATUS_REQUESTED,
    payload: payload,
  };
}

export function updateAppToggle(payload) {
  return {
    type: UPDATE_APP_WORKFLOW_TOGGLE,
    payload,
  };
}

export function updateApplicationStatusSuccess(payload) {
  return {
    type: UPDATE_APPLICATION_STATUS_SUCCESSED,
    payload: payload,
  };
}

export function updateApplicationStatusFailed(payload) {
  return {
    type: UPDATE_APPLICATION_STATUS_FAILED,
    payload: payload,
  };
}

export function updateMultiConfigDetailsRequested(payload) {
  return {
    type: UPDATE_MULTI_CONFIGURATION_FILEDS_DETAILS_REQUESTED,
    payload: payload,
  };
}

export function updateConfigDetailsRequested(payload) {
  return {
    type: UPDATE_CONFIGURATION_FILEDS_DETAILS_REQUESTED,
    payload: payload,
  };
}

export function updateConfigDetailsSuccess(payload) {
  return {
    type: UPDATE_CONFIGURATION_FILEDS_DETAILS_SUCCESSED,
    payload: payload,
  };
}

export function updateConfigDetailsFailed(payload) {
  return {
    type: UPDATE_CONFIGURATION_FILEDS_DETAILS_FAILED,
    payload: payload,
  };
}

export function checkIsMultiConfigRequested(payload) {
  return {
    type: CHECK_IS_MULTI_CONFIG_REQUESTED,
    payload: payload,
  };
}

export function checkIsMultiConfigSuccess(payload) {
  return {
    type: CHECK_IS_MULTI_CONFIG_SUCCESSED,
    payload: payload,
  };
}

export function checkIsMultiConfigFailed(payload) {
  return {
    type: CHECK_IS_MULTI_CONFIG_FAILED,
    payload: payload,
  };
}

export function setFeedbackAction(payload) {
  return {
    type: SET_FEEDBACK_ALERT,
    payload: payload,
  };
}

export function getVendorListRequested(payload) {
  return {
    type: GET_APPLICATION_VENDOR_LIST_REQUESTED,
    payload: payload,
  };
}

export function getVendorListSuccess(payload) {
  return {
    type: GET_APPLICATION_VENDOR_LIST_SUCCESSED,
    payload: payload,
  };
}

export function getVendorListFailed(payload) {
  return {
    type: GET_APPLICATION_VENDOR_LIST_FAILED,
    payload: payload,
  };
}

export function getPubliserListRequested(payload) {
  return {
    type: GET_APPLICATION_PUBLISHERS_LIST_REQUESTED,
    payload: payload,
  };
}

export function getPubliserListSuccess(payload) {
  return {
    type: GET_APPLICATION_PUBLISHERS_LIST_SUCCESSED,
    payload: payload,
  };
}

export function getPubliserListFailed(payload) {
  return {
    type: GET_APPLICATION_PUBLISHERS_LIST_FAILED,
    payload: payload,
  };
}

export function getTypeListRequested(payload) {
  return {
    type: GET_APPLICATION_TYPE_LIST_REQUESTED,
    payload: payload,
  };
}

export function getTypeListSuccess(payload) {
  return {
    type: GET_APPLICATION_TYPE_LIST_SUCCESSED,
    payload: payload,
  };
}

export function getTypeListFailed(payload) {
  return {
    type: GET_APPLICATION_TYPE_LIST_FAILED,
    payload: payload,
  };
}

export function getRateLimitRequested(payload) {
  return {
    type: GET_APPLICATION_RATE_LIST_REQUESTED,
    payload: payload,
  };
}

export function getRateLimitSuccess(payload) {
  return {
    type: GET_APPLICATION_RATE_LIST_SUCCESSED,
    payload: payload,
  };
}

export function getRateLimitFailed(payload) {
  return {
    type: GET_APPLICATION_RATE_LIST_FAILED,
    payload: payload,
  };
}

export function createApplicationRequested(payload) {
  return {
    type: CREATE_APPLICATION_REQUESTED,
    payload: payload,
  };
}

export function updateApplicationRequested(payload) {
  return {
    type: UPDATE_APPLICATION_REQUESTED,
    payload,
  };
}

export function createApplicationSuccess(payload) {
  return {
    type: CREATE_APPLICATION_SUCCESSED,
    payload: payload,
  };
}

export function createApplicationFailed(payload) {
  return {
    type: CREATE_APPLICATION_FAILED,
    payload: payload,
  };
}

export function getApprovalFlowListRequested(payload) {
  return {
    type: GET_APPROVAL_FLOW_LIST_REQUESTED,
    payload: payload,
  };
}

export function getApprovalFlowListSuccess(payload) {
  return {
    type: GET_APPROVAL_FLOW_LIST_SUCCESSED,
    payload: payload,
  };
}

export function getApprovalFlowListFailed(payload) {
  return {
    type: GET_APPROVAL_FLOW_LIST_FAILED,
    payload: payload,
  };
}

export function getPrimaryApproversListRequested(payload) {
  return {
    type: GET_PRIMARY_APPROVERS_LIST_REQUESTED,
    payload: payload,
  };
}

export function getPrimaryApproversListSuccess(payload) {
  return {
    type: GET_PRIMARY_APPROVERS_LIST_SUCCESSED,
    payload: payload,
  };
}

export function getPrimaryApproversListFailed(payload) {
  return {
    type: GET_PRIMARY_APPROVERS_LIST_FAILED,
    payload: payload,
  };
}

export function updateApprovalWorkFlowDetailsRequested(payload, query) {
  return {
    type: UPDATE_APPROVAL_WORKFLOW_DETAILS_REQUESTED,
    payload: payload,
    query
  };
}

export function updateApprovalWorkFlowDetailsSuccess(payload) {
  return {
    type: UPDATE_APPROVAL_WORKFLOW_DETAILS_SUCCESSED,
    payload: payload,
  };
}

export function updateApprovalWorkFlowDetailsFailed(payload) {
  return {
    type: UPDATE_APPROVAL_WORKFLOW_DETAILS_FAILED,
    payload: payload,
  };
}

export function deleteApprovalWorkFlowRequested(payload, query) {
  return {
    type: DELETE_APPROVAL_WORKFLOW_REQUESTED,
    payload: payload,
    query
  };
}

export function deleteApprovalWorkFlowSuccess(payload) {
  return {
    type: DELETE_APPROVAL_WORKFLOW_SUCCESSED,
    payload: payload,
  };
}

export function deleteApprovalWorkFlowFailed(payload) {
  return {
    type: DELETE_APPROVAL_WORKFLOW_FAILED,
    payload: payload,
  };
}

export function createWorkFlow(payload, query) {
  return {
    type: CREATE_APPROVAL_WORKFLOW_DETAILS_REQUESTED,
    payload,
    query
  };
}

export function deleteApplication(payload, query) {
  return {
    type: DELETE_APPLICATION_REQUESTED,
    payload,
    query
  };
}
