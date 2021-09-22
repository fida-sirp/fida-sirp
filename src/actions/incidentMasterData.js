import {
  INCIDENT_MEMEBER_USER_REQUESTED,
  INCIDENT_MEMEBER_USER_GROUP_REQUESTED,
  INCIDENT_SEVERITY_REQUESTED,
  INCIDENT_CATEGORY_REQUESTED,
  INCIDENT_SUBCATEGORY_REQUESTED,
  INCIDENT_DISPOSITION_REQUESTED,
  INCIDENT_SUBDISPOSITION_REQUESTED,
  INCIDENT_LOCATION_REQUESTED,
  INCIDENT_DETECTION_METHODS_REQUESTED,
  INCIDENT_ARTIFACTS_REQUESTED,
  INCIDENT_ACTION_APPS_REQUESTED,
  INCIDENT_ACTION_RUN_REQUESTED,
  INCIDENT_ACTION_CLEAR_REQUESTED,
  INCIDENT_ARTIFACT_ADD_REQUESTED,
  INCIDENT_ARTIFACTS_LIST_REQUESTED,
  INCIDENT_ADD_EVIDENCE_REQUESTED
} from '../constants/actionTypes';

export function listLocationUsers() {
  return {
    type: INCIDENT_MEMEBER_USER_REQUESTED,
  };
}

export function listLocationUsersGroup() {
  return {
    type: INCIDENT_MEMEBER_USER_GROUP_REQUESTED,
  };
}

export function getIncidentManagementSeverityAction() {
  return {
    type: INCIDENT_SEVERITY_REQUESTED,
  };
}

export function getIncidentManagementcategoryAction() {
  return {
    type: INCIDENT_CATEGORY_REQUESTED,
  };
}

export function getIncidentManagementsubCategoryAction(payload) {
  return {
    type: INCIDENT_SUBCATEGORY_REQUESTED,
    payload,
  };
}

export function getIncidentManagementdispositionAction() {
  return {
    type: INCIDENT_DISPOSITION_REQUESTED,
  };
}

export function getIncidentManagementsubDispositionAction(payload) {
  return {
    type: INCIDENT_SUBDISPOSITION_REQUESTED,
    payload,
  };
}

export function getIncidentManagementlocationAction() {
  return {
    type: INCIDENT_LOCATION_REQUESTED,
  };
}

export function getIncidentManagementdetectionMethodsAction() {
  return {
    type: INCIDENT_DETECTION_METHODS_REQUESTED,
  };
}

export function getIncidentManagementartifactsAction() {
  return {
    type: INCIDENT_ARTIFACTS_REQUESTED,
  };
}

export function getIncidentActionAppAction() {
  return {
    type: INCIDENT_ACTION_APPS_REQUESTED,
  };
}

export function runAction(payload) {
  return {
    type: INCIDENT_ACTION_RUN_REQUESTED,
    payload,
  };
}

export function clearRunAction(payload){
  return {
    type: INCIDENT_ACTION_CLEAR_REQUESTED,
    payload,
  };
}

export function addArtifactAction(payload) {
  return {
    type: INCIDENT_ARTIFACT_ADD_REQUESTED,
    payload,
  };
}

export function getArtifactListAction(payload) {
  return {
    type: INCIDENT_ARTIFACTS_LIST_REQUESTED,
    payload,
  };
}

export const addEvidence = (data, id) => {
  return {
    type: INCIDENT_ADD_EVIDENCE_REQUESTED,
    payload: {
      id,
      data,
    },
  };
};