import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  ASSET_REMOTEAPP_LIST_SUCCESSED,
  ASSET_REMOTEAPP_LIST_FAILED,
  ASSET_REMOTEAPP_LIST_REQUESTED,
} from '../../constants/actionTypes';
import {
    listAssetRemoteAppSaga
} from '../../api/assetRemoteAppSaga';
 
export function* watchList(action) {
   
  try {
    const response = yield call(listAssetRemoteAppSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_REMOTEAPP_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_REMOTEAPP_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_REMOTEAPP_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export default function* watcher() {
  yield takeLatest(ASSET_REMOTEAPP_LIST_REQUESTED, watchList);
}
