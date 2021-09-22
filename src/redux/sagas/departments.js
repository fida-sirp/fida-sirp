import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  DEPARTMENT_LIST_SUCCESSED,
  DEPARTMENT_LIST_FAILED,
  DEPARTMENT_LIST_REQUESTED,
} from '../../constants/actionTypes';
import {
    listDepartmentsSaga
} from '../../api/departmentsSaga';
 
export function* watchList(action) {
  try {
    const response = yield call(listDepartmentsSaga, action.payload);
    if (response.success === true) {
      yield put({ type: DEPARTMENT_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: DEPARTMENT_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: DEPARTMENT_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export default function* watcher() {
  yield takeLatest(DEPARTMENT_LIST_REQUESTED, watchList);
}
