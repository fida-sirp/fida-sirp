import {
  AUTOMATION_DETAILS_LIST_REQUESTED,
  AUTOMATION_LIST_REQUESTED,
  DELETE_AUTOMATION_REQUESTED,
  GET_AUTOMATION_ACTION_LIST_REQUESTED,
  GET_AUTOMATION_APPLICATION_LIST_REQUESTED,
  GET_AUTOMATION_INPUT_LIST_REQUESTED,
  CREATE_AUTOMATION_REQUESTED,
  AUTOMATION_ARTIFACT_TYPE_LIST_REQUESTED,
  AUTOMATION_ARTIFACT_LIST_REQUESTED,
  CREATE_AUTOMATION_ARTIFACT_REQUESTED,
  AUTOMATION_APPROVAL_LIST_REQUESTED,
  AUTOMATION_RECORD_APPROVE_REQUESTED,
  GET_AUTOMATION_EXECUTION_APPLICATION_LIST_REQUESTED,
  AUTOMATION_ARTIFACT_DELETE_REQUESTED,
  GET_AUTOMATION_EXECUTION_ACTION_LIST_REQUESTED,
  AUTOMATION_EXECUTION_REQUESTED,
  AUTOMATION_UPDATE_REQUESTED,
  GET_AUTOMATION_ACTION_LIST_FAILED,
  GET_AUTOMATION_APPLICATION_LIST_FAILED,
  GET_AUTOMATION_INPUT_LIST_FAILED,
  AUTOMATION_ARTIFACT_OCCURENCE_LIST_REQUESTED,
  RESET_AUTOMATION_STORE,
} from '../constants/actionTypes';

export function listAutomationManagement(payload) {
  return {
    type: AUTOMATION_LIST_REQUESTED,
    payload,
  };
}

export function automationDetail(id) {
  return {
    type: AUTOMATION_DETAILS_LIST_REQUESTED,
    payload: id,
  };
}

export function deleteAutomationDetail(id, query) {
  return {
    type: DELETE_AUTOMATION_REQUESTED,
    payload: id,
    query,
  };
}

export function automationArtifectUpdate(id, payload, query) {
  return {
    type: AUTOMATION_UPDATE_REQUESTED,
    id,
    payload,
    query,
  };
}

export function automationApplicationList() {
  return {
    type: GET_AUTOMATION_APPLICATION_LIST_REQUESTED,
  };
}

export function emptyAutomationApplicationList() {
  return {
    type: GET_AUTOMATION_APPLICATION_LIST_FAILED,
  };
}

export function automationActionList(payload) {
  return {
    type: GET_AUTOMATION_ACTION_LIST_REQUESTED,
    payload,
  };
}

export function emptyAutomationActionList() {
  return {
    type: GET_AUTOMATION_ACTION_LIST_FAILED,
  };
}

export function automationInputList(payload) {
  return {
    type: GET_AUTOMATION_INPUT_LIST_REQUESTED,
    payload,
  };
}

export function emptyAutomationInputList() {
  return {
    type: GET_AUTOMATION_INPUT_LIST_FAILED,
  };
}

export function automationCreate(payload, queryItem) {
  return {
    type: CREATE_AUTOMATION_REQUESTED,
    payload,
    queryItem
  };
}

export function automationArtifactList(payload) {
  return {
    type: AUTOMATION_ARTIFACT_LIST_REQUESTED,
    payload,
  };
}
export function automationArtifactDelete(payload, query) {
  return {
    type: AUTOMATION_ARTIFACT_DELETE_REQUESTED,
    payload,
    query,
  };
}

export function automationArtifactType() {
  return {
    type: AUTOMATION_ARTIFACT_TYPE_LIST_REQUESTED,
  };
}

export function automationArtifactCreate(payload, query) {
  return {
    type: CREATE_AUTOMATION_ARTIFACT_REQUESTED,
    payload,
    query
  };
}

export function automationApprovalsList(payload) {
  return {
    type: AUTOMATION_APPROVAL_LIST_REQUESTED,
    payload,
  };
}

export function approveRecord(id, shouldApprove) {
  return {
    type: AUTOMATION_RECORD_APPROVE_REQUESTED,
    payload: {
      id,
      shouldApprove
    },
  };
}

export function automationExecutionApplicationList(payload) {
  return {
    type: GET_AUTOMATION_EXECUTION_APPLICATION_LIST_REQUESTED,
    payload,
  };
}

export function automationExecutionActionList(payload) {
  return {
    type: GET_AUTOMATION_EXECUTION_ACTION_LIST_REQUESTED,
    payload,
  };
}

export function automationExecutionEdit(payload) {
  return {
    type: AUTOMATION_EXECUTION_REQUESTED,
    payload,
  };
}

export function artifactOccuranceList(payload) {
  return {
    type: AUTOMATION_ARTIFACT_OCCURENCE_LIST_REQUESTED,
    payload,
  };
}

export function resetAutomationStore(payload) {
  return {
    type: RESET_AUTOMATION_STORE,
    payload,
  };
}
