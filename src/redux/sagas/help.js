import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  HELP_LIST_SUCCESSED,
  HELP_LIST_FAILED,
  HELP_LIST_REQUESTED,

  HELP_DETAILS_REQUESTED,
  HELP_DETAILS_SUCCESSED,
  HELP_DETAILS_FAILED,


  SHOW_LOADER,
  HIDE_LOADER,
} from '../../constants/actionTypes';
import {
  listSaga,
  getSingleSaga
} from '../../api/helpSaga';
 
export function* watchList(action) {
  try {
    const response = yield call(listSaga, action.payload);
    if (response.success === true) {
      yield put({ type: HELP_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: HELP_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: HELP_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchGetSingle(action) {
  try {
    const response = yield call(getSingleSaga, action.id);
    if (response.success === true) {
      yield put({ type: HELP_DETAILS_SUCCESSED, data: response });
    } else {
      yield put({ type: HELP_DETAILS_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: HELP_DETAILS_FAILED, data: err?.response?.data?.data });
  }
}



export default function* watcher() {
  yield takeLatest(HELP_LIST_REQUESTED, watchList);
  yield takeLatest(HELP_DETAILS_REQUESTED, watchGetSingle);
}
