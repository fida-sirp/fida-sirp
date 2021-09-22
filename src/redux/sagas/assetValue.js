import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  ASSET_VALUE_LIST_SUCCESSED,
  ASSET_VALUE_LIST_FAILED,
  ASSET_VALUE_LIST_REQUESTED,
} from '../../constants/actionTypes';
import {
    listAssetValueSaga
} from '../../api/assetValueSaga';
 
export function* watchList(action) {
  try {
    const response = yield call(listAssetValueSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_VALUE_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_VALUE_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_VALUE_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export default function* watcher() {
  yield takeLatest(ASSET_VALUE_LIST_REQUESTED, watchList);
}
