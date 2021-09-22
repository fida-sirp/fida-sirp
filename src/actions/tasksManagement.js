import {
  INCIDENT_TASK_CATEGORIES_REQUESTED,
  INCIDENT_TASK_CREATED_REQUESTED,
  INCIDENT_TASK_DEPARTMENTS_REQUESTED,
  INCIDENT_TASK_LIST_REQUESTED,
  INCIDENT_TASK_EDIT_REQUESTED,
  INCIDENT_TASK_CLEAR_REQUESTED,
  INCIDENT_TASK_USERS_REQUESTED,
} from '../constants/actionTypes';


export function getTaskCategories() {
  return {
    type: INCIDENT_TASK_CATEGORIES_REQUESTED,
  };
}
export function getTaskUsers() {
  return {
    type: INCIDENT_TASK_USERS_REQUESTED,
  };
}
export function getTaskDepartment() {
  return {
    type: INCIDENT_TASK_DEPARTMENTS_REQUESTED,
  };
}

export function createTask(payload) {
  return {
    type: INCIDENT_TASK_CREATED_REQUESTED,
    payload,
  };
}

export function getTasks(payload) {
  return {
    type: INCIDENT_TASK_LIST_REQUESTED,
    payload,
  };
}

export function editTask(payload) {
  return {
    type: INCIDENT_TASK_EDIT_REQUESTED,
    payload,
  };
}

export function clearCreateTaskState(){
  return {
    type: INCIDENT_TASK_CLEAR_REQUESTED,
   
  };
}

