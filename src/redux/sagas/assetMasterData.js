import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
    ASSET_SYSTEMTYPES_LIST_REQUESTED,
    ASSET_SYSTEMTYPES_LIST_PROCESSING,
    ASSET_SYSTEMTYPES_LIST_SUCCESSED,
    ASSET_SYSTEMTYPES_LIST_FAILED,

    ASSET_NETWORKTYPE_LIST_REQUESTED,
    ASSET_NETWORKTYPE_LIST_PROCESSING,
    ASSET_NETWORKTYPE_LIST_SUCCESSED,
    ASSET_NETWORKTYPE_LIST_FAILED,

    ASSET_POWERSTATUS_LIST_REQUESTED,
    ASSET_POWERSTATUS_LIST_PROCESSING,
    ASSET_POWERSTATUS_LIST_SUCCESSED,
    ASSET_POWERSTATUS_LIST_FAILED,

    ASSET_DOCUMENTTYPE_LIST_REQUESTED,
    ASSET_DOCUMENTTYPE_LIST_PROCESSING,
    ASSET_DOCUMENTTYPE_LIST_SUCCESSED,
    ASSET_DOCUMENTTYPE_LIST_FAILED,

    ASSET_SIEMS_LIST_REQUESTED,
    ASSET_SIEMS_LIST_PROCESSING,
    ASSET_SIEMS_LIST_SUCCESSED,
    ASSET_SIEMS_LIST_FAILED,

    ASSET_ZONE_LIST_REQUESTED,
    ASSET_ZONE_LIST_PROCESSING,
    ASSET_ZONE_LIST_SUCCESSED,
    ASSET_ZONE_LIST_FAILED,

    ASSET_PRODUCT_LIST_REQUESTED,
    ASSET_PRODUCT_LIST_PROCESSING,
    ASSET_PRODUCT_LIST_SUCCESSED,
    ASSET_PRODUCT_LIST_FAILED,

    ASSET_VENDORS_LIST_REQUESTED,
    ASSET_VENDORS_LIST_PROCESSING,
    ASSET_VENDORS_LIST_SUCCESSED,
    ASSET_VENDORS_LIST_FAILED,

    ASSET_SERVER_LIST_REQUESTED,
    ASSET_SERVER_LIST_PROCESSING,
    ASSET_SERVER_LIST_SUCCESSED,
    ASSET_SERVER_LIST_FAILED,

} from '../../constants/actionTypes';
import {
    listAssetNetworkTypeSaga,
    listAssetSystemTypeSaga,
    listAssetDocumentTypeSaga,
    listAssetPowerStatusSaga,
    listAssetProductsSaga,
    listAssetSiemsSaga,
    listAssetVendorsSaga,
    listAssetZonesSaga,
    listAssetServerSaga
   

} from '../../api/assetMasterData';

 
export function* watchSystemTypeList(action) {
   
  try {
    const response = yield call(listAssetSystemTypeSaga, action.payload);
    if (response.success === true) {

      yield put({ type: ASSET_SYSTEMTYPES_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_SYSTEMTYPES_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_SYSTEMTYPES_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchNetworkTypeList(action) {
   
    try {
      const response = yield call(listAssetNetworkTypeSaga, action.payload);
      if (response.success === true) {
        yield put({ type: ASSET_NETWORKTYPE_LIST_SUCCESSED, data: response });
      } else {
        yield put({ type: ASSET_NETWORKTYPE_LIST_FAILED, data: null });
      }
    } catch (err) {
      yield put({ type: ASSET_NETWORKTYPE_LIST_FAILED, data: err?.response?.data?.data });
    }
  }

  export function* watchPowerStatusList(action) {
   
    try {
      const response = yield call(listAssetPowerStatusSaga, action.payload);
      if (response.success === true) {
        yield put({ type: ASSET_POWERSTATUS_LIST_SUCCESSED, data: response });
      } else {
        yield put({ type: ASSET_POWERSTATUS_LIST_FAILED, data: null });
      }
    } catch (err) {
      yield put({ type: ASSET_POWERSTATUS_LIST_FAILED, data: err?.response?.data?.data });
    }
  }

  export function* watchDocumentTypeList(action) {
   
    try {
      const response = yield call(listAssetDocumentTypeSaga, action.payload);
      if (response.success === true) {
        yield put({ type: ASSET_DOCUMENTTYPE_LIST_SUCCESSED, data: response });
      } else {
        yield put({ type: ASSET_DOCUMENTTYPE_LIST_FAILED, data: null });
      }
    } catch (err) {
      yield put({ type: ASSET_DOCUMENTTYPE_LIST_FAILED, data: err?.response?.data?.data });
    }
  }

  export function* watchSiemsList(action) {
   
    try {
      const response = yield call(listAssetSiemsSaga, action.payload);
      if (response.success === true) {
        yield put({ type: ASSET_SIEMS_LIST_SUCCESSED, data: response });
      } else {
        yield put({ type: ASSET_SIEMS_LIST_FAILED, data: null });
      }
    } catch (err) {
      yield put({ type: ASSET_SIEMS_LIST_FAILED, data: err?.response?.data?.data });
    }
  }

  export function* watchZoneList(action) {
   
    try {
      const response = yield call(listAssetZonesSaga, action.payload);
      if (response.success === true) {
        yield put({ type: ASSET_ZONE_LIST_SUCCESSED, data: response });
      } else {
        yield put({ type: ASSET_ZONE_LIST_FAILED, data: null });
      }
    } catch (err) {
      yield put({ type: ASSET_ZONE_LIST_FAILED, data: err?.response?.data?.data });
    }
  }

  export function* watchProductList(action) {
   
    try {
      const response = yield call(listAssetProductsSaga, action.payload);
      if (response.success === true) {
        yield put({ type: ASSET_PRODUCT_LIST_SUCCESSED, data: response });
      } else {
        yield put({ type: ASSET_PRODUCT_LIST_FAILED, data: null });
      }
    } catch (err) {
      yield put({ type: ASSET_PRODUCT_LIST_FAILED, data: err?.response?.data?.data });
    }
  }

  export function* watchVendorList(action) {
   
    try {
      const response = yield call(listAssetVendorsSaga, action.payload);
      if (response.success === true) {
        yield put({ type: ASSET_VENDORS_LIST_SUCCESSED, data: response });
      } else {
        yield put({ type: ASSET_VENDORS_LIST_FAILED, data: null });
      }
    } catch (err) {
      yield put({ type: ASSET_VENDORS_LIST_FAILED, data: err?.response?.data?.data });
    }
  }

  export function* watchServerList(action) {
   
    try {
      const response = yield call(listAssetServerSaga, action.payload);
      if (response.success === true) {
        yield put({ type: ASSET_SERVER_LIST_SUCCESSED, data: response });
      } else {
        yield put({ type: ASSET_SERVER_LIST_FAILED, data: null });
      }
    } catch (err) {
      yield put({ type: ASSET_SERVER_LIST_FAILED, data: err?.response?.data?.data });
    }
  }




export default function* watcher() {
  yield takeLatest(ASSET_SYSTEMTYPES_LIST_REQUESTED, watchSystemTypeList);
  yield takeLatest(ASSET_NETWORKTYPE_LIST_REQUESTED, watchNetworkTypeList);
  yield takeLatest(ASSET_POWERSTATUS_LIST_REQUESTED, watchPowerStatusList);
  yield takeLatest(ASSET_DOCUMENTTYPE_LIST_REQUESTED, watchDocumentTypeList);
  yield takeLatest(ASSET_SIEMS_LIST_REQUESTED, watchSiemsList);
  yield takeLatest(ASSET_ZONE_LIST_REQUESTED, watchZoneList);
  yield takeLatest(ASSET_PRODUCT_LIST_REQUESTED, watchProductList);
  yield takeLatest(ASSET_VENDORS_LIST_REQUESTED, watchVendorList);
  yield takeLatest(ASSET_SERVER_LIST_REQUESTED, watchServerList);
}
