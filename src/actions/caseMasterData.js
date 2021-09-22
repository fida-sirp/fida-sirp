import {
  CASE_MEMEBER_USER_REQUESTED,
  CASE_MEMEBER_USER_GROUP_REQUESTED,
  CASE_SEVERITY_REQUESTED,
  CASE_CATEGORY_REQUESTED,
  CASE_SUBCATEGORY_REQUESTED,
  CASE_DISPOSITION_REQUESTED,
  CASE_SUBDISPOSITION_REQUESTED,
  CASE_LOCATION_REQUESTED,
  CASE_DETECTION_METHODS_REQUESTED,
  CASE_ARTIFACTS_REQUESTED,
  CASE_ACTION_APPS_REQUESTED,
  CASE_ACTION_RUN_REQUESTED,
  INCIDENT_ARTIFACT_ADD_REQUESTED,
  CLEAR_ACTION_RUN_REQUESTED
} from '../constants/actionTypes';

export function listLocationUsers() {
  return {
    type: CASE_MEMEBER_USER_REQUESTED,
  };
}

export function listLocationUsersGroup() {
  return {
    type: CASE_MEMEBER_USER_GROUP_REQUESTED,
  };
}

export function getCaseManagementSeverityAction() {
  return {
    type: CASE_SEVERITY_REQUESTED,
  };
}

export function getCaseManagementcategoryAction() {
  return {
    type: CASE_CATEGORY_REQUESTED,
  };
}

export function getCaseManagementsubCategoryAction(payload) {
  return {
    type: CASE_SUBCATEGORY_REQUESTED,
    payload,
  };
}

export function getCaseManagementdispositionAction() {
  return {
    type: CASE_DISPOSITION_REQUESTED,
  };
}

export function getCaseManagementsubDispositionAction(payload) {
  return {
    type: CASE_SUBDISPOSITION_REQUESTED,
    payload,
  };
}

export function getCaseManagementlocationAction() {
  return {
    type: CASE_LOCATION_REQUESTED,
  };
}

export function getCaseManagementdetectionMethodsAction() {
  return {
    type: CASE_DETECTION_METHODS_REQUESTED,
  };
}

export function getCaseManagementartifactsAction() {
  return {
    type: CASE_ARTIFACTS_REQUESTED,
  };
}

export function getCaseActionAppAction() {
  return {
    type: CASE_ACTION_APPS_REQUESTED,
  };
}

export function runAction(payload) {
  return {
    type: CASE_ACTION_RUN_REQUESTED,
    payload,
  };
}

export function clearRunAction(payload) {
  return {
    type: CLEAR_ACTION_RUN_REQUESTED,
    payload,
  };
}

export function addArtifactAction(payload) {
  return {
    type: INCIDENT_ARTIFACT_ADD_REQUESTED,
    payload,
  };
}
