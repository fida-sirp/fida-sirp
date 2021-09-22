import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  DISPOSITION_LIST_SUCCESSED,
  DISPOSITION_LIST_FAILED,
  DISPOSITION_LIST_REQUESTED,
} from '../../constants/actionTypes';
import {
    listDispositionsSaga
} from '../../api/dispositionsSaga';
 
export function* watchList(action) {
  try {
    const response = yield call(listDispositionsSaga, action.payload);
    if (response.success === true) {
      yield put({ type: DISPOSITION_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: DISPOSITION_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: DISPOSITION_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export default function* watcher() {
  yield takeLatest(DISPOSITION_LIST_REQUESTED, watchList);
}
