import {
  PLAYBOOK_LIST_REQUESTED,
  PLAYBOOKS_LOGS_REQUESTED,
  PLAYBOOK_DELETE_REQUESTED,
  PLAYBOOK_LOG_DELETE_REQUESTED,
  PLAYBOOK_DUPLICATE_REQUESTED,
  PLAYBOOK_RULES_LIST_REQUESTED,
  RESET_DUPLICATION_STORE,
  PLAYBOOK_RULES_CREATE_LIST_REQUESTED,
  PLAYBOOK_RULES_UPDATE_LIST_REQUESTED,
  PLAYBOOK_RULES_DELETE_LIST_REQUESTED,
  PLAYBOOK_CATEOGRY_LIST_REQUESTED,
  PLAYBOOK_SUB_CATEOGRY_LIST_REQUESTED,
  PLAYBOOK_DISPOSITION_LIST_REQUESTED,
  PLAYBOOK_SUB_DISPOSITION_LIST_REQUESTED,
  PLAYBOOK_LOCATION_LIST_REQUESTED,
  PLAYBOOK_RISK_RATING_LIST_REQUESTED,
  PLAYBOOK_DOWNLOAD_REQUESTED,
  PLAYBOOK_QUEUE_LOG_REQUESTED,
  PLAYBOOK_IMPORT_REQUESTED,
} from '../constants/actionTypes';

export function listPlaybook(payload) {
  return {
    type: PLAYBOOK_LIST_REQUESTED,
    payload: payload,
  };
}

export function listPlayBookslogs(payload) {
  return {
    type: PLAYBOOKS_LOGS_REQUESTED,
    payload,
  };
}

export function deletPlaybook(id, query) {
  return {
    type: PLAYBOOK_DELETE_REQUESTED,
    id,
    query,
  };
}

export function deletePlaybookLog(id) {
  return {
    type: PLAYBOOK_LOG_DELETE_REQUESTED,
    id,
  };
}

export function duplicatePlaybook(id, query) {
  return {
    type: PLAYBOOK_DUPLICATE_REQUESTED,
    id,
    query,
  };
}
export function resetDuplicatePlaybookstore() {
  return {
    type: RESET_DUPLICATION_STORE,
  };
}

export function getRulesList(payload) {
  return {
    type: PLAYBOOK_RULES_LIST_REQUESTED,
    payload,
  };
}

export function createRuleList(payload) {
  return {
    type: PLAYBOOK_RULES_CREATE_LIST_REQUESTED,
    payload,
  };
}

export function updateRuleList(payload) {
  return {
    type: PLAYBOOK_RULES_UPDATE_LIST_REQUESTED,
    payload,
  };
}

export function deleteRuleList(payload) {
  return {
    type: PLAYBOOK_RULES_DELETE_LIST_REQUESTED,
    payload,
  };
}
export function categoryList(payload) {
  return {
    type: PLAYBOOK_CATEOGRY_LIST_REQUESTED,
    payload,
  };
}

export function subCategoryList(payload) {
  return {
    type: PLAYBOOK_SUB_CATEOGRY_LIST_REQUESTED,
    payload,
  };
}

export function dispositionList(payload) {
  return {
    type: PLAYBOOK_DISPOSITION_LIST_REQUESTED,
    payload,
  };
}

export function subDispositionList(payload) {
  return {
    type: PLAYBOOK_SUB_DISPOSITION_LIST_REQUESTED,
    payload,
  };
}

export function locationList(payload) {
  return {
    type: PLAYBOOK_LOCATION_LIST_REQUESTED,
    payload,
  };
}

export function riskRatingList(payload) {
  return {
    type: PLAYBOOK_RISK_RATING_LIST_REQUESTED,
    payload,
  };
}

export function playBookDowload(id, playBookName, query) {
  return {
    type: PLAYBOOK_DOWNLOAD_REQUESTED,
    id,
    playBookName,
    query
  };
}

export function playbookQueueLog(queueId, actionId) {
  return {
    type: PLAYBOOK_QUEUE_LOG_REQUESTED,
    queueId,
    actionId
  };
}


export function onImportPlaybook(payload) {
  return {
    type: PLAYBOOK_IMPORT_REQUESTED,
    payload
  };
}
