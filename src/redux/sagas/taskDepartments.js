import { put, call, takeLatest } from 'redux-saga/effects';
import {
  SHOW_LOADER,
  HIDE_LOADER,
  INCIDENT_TASK_DEPARTMENTS_FAILED,
  INCIDENT_TASK_DEPARTMENTS_SUCCESSED,
  INCIDENT_TASK_DEPARTMENTS_REQUESTED,
} from '../../constants/actionTypes';

import { getTaskDepartments } from '../../api/taskDepartmentsSaga';
 
export function* watchGetTaskDepartments(action) {
  try {
    const response = yield call(getTaskDepartments, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_TASK_DEPARTMENTS_SUCCESSED, data: response });
    } else {
      yield put({ type: INCIDENT_TASK_DEPARTMENTS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_TASK_DEPARTMENTS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export default function* watcher() {
  yield takeLatest(
    INCIDENT_TASK_DEPARTMENTS_REQUESTED,
    watchGetTaskDepartments
  );
}
