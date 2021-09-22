import { put, call, takeLatest } from 'redux-saga/effects';
import {
  SHOW_LOADER,
  HIDE_LOADER,
  INCIDENT_TASK_CATEGORIES_FAILED,
  INCIDENT_TASK_CATEGORIES_SUCCESSED,
  INCIDENT_TASK_CATEGORIES_REQUESTED,
} from '../../constants/actionTypes';

import { getTaskCategories } from '../../api/taskCategoriesSaga';
 
export function* watchGetTaskCategories(action) {
  try {
    const response = yield call(getTaskCategories, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_TASK_CATEGORIES_SUCCESSED, data: response });
    } else {
      yield put({ type: INCIDENT_TASK_CATEGORIES_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_TASK_CATEGORIES_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export default function* watcher() {
  yield takeLatest(INCIDENT_TASK_CATEGORIES_REQUESTED, watchGetTaskCategories);
}
