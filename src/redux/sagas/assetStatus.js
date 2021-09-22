import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  ASSET_STATUS_LIST_SUCCESSED,
  ASSET_STATUS_LIST_FAILED,
  ASSET_STATUS_LIST_REQUESTED,
} from '../../constants/actionTypes';
import {
    listAssetStatusSaga
} from '../../api/assetStatus';
 
export function* watchList(action) {
   
  try {
    const response = yield call(listAssetStatusSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_STATUS_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_STATUS_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_STATUS_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export default function* watcher() {
  yield takeLatest(ASSET_STATUS_LIST_REQUESTED, watchList);
}
