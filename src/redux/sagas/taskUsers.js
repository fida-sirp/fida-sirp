import { put, call, takeLatest } from 'redux-saga/effects';
import {
  SHOW_LOADER,
  HIDE_LOADER,
  INCIDENT_TASK_USERS_FAILED,
  INCIDENT_TASK_USERS_SUCCESSED,
  INCIDENT_TASK_USERS_REQUESTED,
} from '../../constants/actionTypes';

import { getTaskUsers } from '../../api/taskUsersSaga';

export function* watchGetTaskUsers(action) {
  try {
    const response = yield call(getTaskUsers, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_TASK_USERS_SUCCESSED, data: response });
    } else {
      yield put({ type: INCIDENT_TASK_USERS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_TASK_USERS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export default function* watcher() {
  yield takeLatest(
    INCIDENT_TASK_USERS_REQUESTED,
    watchGetTaskUsers
  );
}
