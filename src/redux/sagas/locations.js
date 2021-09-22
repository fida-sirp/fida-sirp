import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  LOCATION_LIST_SUCCESSED,
  LOCATION_LIST_FAILED,
  LOCATION_LIST_REQUESTED,
} from '../../constants/actionTypes';
import {
    listLocationSaga
} from '../../api/locationSaga';
 
export function* watchList(action) {
  try {
    const response = yield call(listLocationSaga, action.payload);
    if (response.success === true) {
      yield put({ type: LOCATION_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: LOCATION_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: LOCATION_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export default function* watcher() {
  yield takeLatest(LOCATION_LIST_REQUESTED, watchList);
}
