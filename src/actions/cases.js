import {
  CASES_LIST_REQUESTED,
  FILTERED_CASES_REQUESTED,
  DELETE_CASE_REQUESTED,
  CATEGORY_FILTER_REQUESTED,
  CLEAR_DELETE_CASE_REQUESTED,
  ADMINISTRATION_CASES_CONTAINER_LIST_REQUESTED,
  ADMINISTRATION_CASES_DESPOSITION_REQUESTED,
  ADMINISTRATION_CASES_CATEGORY_REQUESTED

} from '../constants/actionTypes';

export function listCases(payload, api) {
  return {
    type: CASES_LIST_REQUESTED,
    payload,
    api
  };
}

export function getFilteredData(pathString) {
  return {
    type: FILTERED_CASES_REQUESTED,
    pathString,
  };
}

export function deleteData(id, pageNo, activeTab) {
  return {
    type: DELETE_CASE_REQUESTED,
    id,
    pageNo,
    activeTab
  };
}

export function getCategory() {
  return {
    type: CATEGORY_FILTER_REQUESTED,
  };
}

export function clearDeleteState(){
  return {
    type: CLEAR_DELETE_CASE_REQUESTED,
  };
}


