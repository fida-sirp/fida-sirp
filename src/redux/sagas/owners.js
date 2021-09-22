import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  OWNER_LIST_SUCCESSED,
  OWNER_LIST_FAILED,
  OWNER_LIST_REQUESTED,
  OWNER_DETAILS_REQUESTED,
  OWNER_DETAILS_SUCCESSED,
  OWNER_DETAILS_FAILED,
} from '../../constants/actionTypes';
import {
  listOwnersSaga,
  getSingleOwnerSaga,
} from '../../api/ownersSaga';
 
export function* watchList(action) {
  try {
    const response = yield call(listOwnersSaga, action.payload);
    if (response.success === true) {
      yield put({ type: OWNER_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: OWNER_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: OWNER_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchGetSingle(action) {
  try {
    const response = yield call(getSingleOwnerSaga, action.id);
    if (response.success === true) {
      yield put({ type: OWNER_DETAILS_SUCCESSED, data: response });
    } else {
      yield put({ type: OWNER_DETAILS_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: OWNER_DETAILS_FAILED, data: err?.response?.data?.data });
  }
}



export default function* watcher() {
  yield takeLatest(OWNER_LIST_REQUESTED, watchList);
  yield takeLatest(OWNER_DETAILS_REQUESTED, watchGetSingle);
  
  
}
