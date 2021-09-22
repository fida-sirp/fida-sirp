import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  ORGANIZATION_LIST_SUCCESSED,
  ORGANIZATION_LIST_FAILED,
  ORGANIZATION_LIST_REQUESTED,
} from '../../constants/actionTypes';
import {
    listOrganizationSaga
} from '../../api/organizationsSaga';
 
export function* watchList(action) {
  try {
    const response = yield call(listOrganizationSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ORGANIZATION_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ORGANIZATION_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ORGANIZATION_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export default function* watcher() {
  yield takeLatest(ORGANIZATION_LIST_REQUESTED, watchList);
}
