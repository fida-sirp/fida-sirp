import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  ASSET_LIST_SUCCESSED,
  ASSET_LIST_FAILED,
  ASSET_LIST_REQUESTED,
  ASSET_DETAILS_REQUESTED,
  ASSET_DETAILS_SUCCESSED,
  ASSET_DETAILS_FAILED,
  ASSET_CREATE_REQUESTED,
  ASSET_CREATE_SUCCESSED,
  ASSET_CREATE_FAILED,
  ASSET_EDIT_REQUESTED,
  ASSET_EDIT_SUCCESSED,
  ASSET_EDIT_FAILED,
  ASSET_DELETE_REQUESTED,
  ASSET_DELETE_SUCCESSED,
  ASSET_DELETE_FAILED,
  IMPORT_ASSET_REQUESTED,
  IMPORT_ASSET_SUCCESSED,
  IMPORT_ASSET_FAILED,
  ASSET_CLASSIFICATION_LIST_SUCCESSED,
  ASSET_CLASSIFICATION_LIST_FAILED,
  ASSET_CLASSIFICATION_LIST_REQUESTED,
  ASSET_OS_LIST_SUCCESSED,
  ASSET_OS_LIST_FAILED,
  ASSET_OS_LIST_REQUESTED,
  ASSET_TYPE_BY_ID_SUCCESSED,
  ASSET_TYPE_BY_ID_FAILED,
  ASSET_TYPE_BY_ID_REQUESTED,
  ASSET_TYPES_LIST_SUCCESSED,
  ASSET_TYPES_LIST_FAILED,
  ASSET_TYPES_LIST_REQUESTED,
  ASSET_DASHBOARD_REQUESTED,
  ASSET_DASHBOARD_SUCCESSED,
  ASSET_DASHBOARD_FAILED,
  ASSET_CATEGORIES_LIST_SUCCESSED,
  ASSET_CATEGORIES_LIST_FAILED,
  ASSET_CATEGORIES_LIST_REQUESTED,
  ASSET_ENABLE_FIELDS_LIST_SUCCESSED,
  ASSET_ENABLE_FIELDS_LIST_FAILED,
  ASSET_ENABLE_FIELDS_LIST_REQUESTED,

  ASSET_CATEGORY_FIELDS_REQUESTED,
  ASSET_CATEGORY_FIELDS_PROCESSING,
  ASSET_CATEGORY_FIELDS_SUCCESSED,
  ASSET_CATEGORY_FIELDS_FAILED,

  ASSET_TEMPLATE_LIST_REQUESTED,
  ASSET_TEMPLATE_LIST_PROCESSING,
  ASSET_TEMPLATE_LIST_SUCCESSED,
  ASSET_TEMPLATE_LIST_FAILED,

  ASSET_TEMPLATE_CREATE_REQUESTED,
  ASSET_TEMPLATE_CREATE_PROCESSING,
  ASSET_TEMPLATE_CREATE_SUCCESSED,
  ASSET_TEMPLATE_CREATE_FAILED,

  ASSET_TEMPLATE_DRAFT_REQUESTED,
  ASSET_TEMPLATE_DRAFT_PROCESSING,
  ASSET_TEMPLATE_DRAFT_SUCCESSED,
  ASSET_TEMPLATE_DRAFT_FAILED,

  ASSET_IMPORT_PROCESS_REQUESTED,
  ASSET_IMPORT_PROCESS_PROCESSING,
  ASSET_IMPORT_PROCESS_SUCCESSED,
  ASSET_IMPORT_PROCESS_FAILED,

  SHOW_LOADER,
  HIDE_LOADER,
} from '../../constants/actionTypes';
import {
  listSaga,
  getSingleSaga,
  createSaga,
  editSaga,
  deleteSaga,
  importSaga,
  listAssetClassificationSaga,
  listAssetOSSaga,
  getAssetDashboardSaga,
  getAssetTypeById,
  listAssetCategoriesSaga,
  listAssetEnableFieldsSaga,
  listAssetTypesSaga,
  listGetAssetFieldsSaga,
  getAssetTemplates,
  createTemplateSaga,
  assetTemplateDraftSaga,
  assetImportProcessSaga
} from '../../api/assetsSaga';
import { assetImportProcess, listAssets } from '../../actions/assets';
 
export function* watchList(action) {
  try {
    const response = yield call(listSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_LIST_SUCCESSED, data: response });
        yield put({ type: HIDE_LOADER });
    } else {
      yield put({ type: ASSET_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchGetSingle(action) {
  try {
    const response = yield call(getSingleSaga, action.id);
    if (response.success === true) {
      yield put({ type: ASSET_DETAILS_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_DETAILS_FAILED, data: null });
    }
      yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: ASSET_DETAILS_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchGetDashboardSingle(action) {
  try {
    const response = yield call(getAssetDashboardSaga, action.id);
    if (response.success === true) {
      yield put({ type: ASSET_DASHBOARD_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_DASHBOARD_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: ASSET_DASHBOARD_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchCreate(action) {
  try {
    const response = yield call(createSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_CREATE_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_CREATE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_CREATE_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchEdit(action) {
  try {
    const response = yield call(editSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_EDIT_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_EDIT_FAILED, data: null });
    }
  } catch (err) {
    console.log(err);
    yield put({ type: ASSET_EDIT_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });

    const response = yield call(deleteSaga, action.payload.id);

    if (response.success === true) {
      yield put({ type: ASSET_DELETE_SUCCESSED, data: response });
      yield put(
        listAssets(
          action.payload.page,
          action.payload.parameter,
          action.payload.perPage
        )
      );
    } else {
      yield put({ type: ASSET_DELETE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: ASSET_DELETE_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchImport(action) {
  try {
    const response = yield call(importSaga, action.payload);
    if (response.success === true) {
      yield put({ type: IMPORT_ASSET_SUCCESSED, data: response });
    } else {
      yield put({ type: IMPORT_ASSET_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: IMPORT_ASSET_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchAssetClassificationList(action) {
  try {
    const response = yield call(listAssetClassificationSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_CLASSIFICATION_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_CLASSIFICATION_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: ASSET_CLASSIFICATION_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchAssetOSList(action) {
  try {
    const response = yield call(listAssetOSSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_OS_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_OS_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: ASSET_OS_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchAssetTypeByID(action) {
  
  try {
    const response = yield call(getAssetTypeById, action.id);
    if (response.success === true) {
      yield put({ type: ASSET_TYPE_BY_ID_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_TYPE_BY_ID_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: ASSET_TYPE_BY_ID_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchAssetTypesList(action) {
  try {
    const response = yield call(listAssetTypesSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_TYPES_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_TYPES_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: ASSET_TYPES_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchAssetCategoriesList(action) {
  try {
    const response = yield call(listAssetCategoriesSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_CATEGORIES_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_CATEGORIES_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: ASSET_CATEGORIES_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchAssetEnableFieldsList(action) {
  try {
    const response = yield call(listAssetEnableFieldsSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_ENABLE_FIELDS_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_ENABLE_FIELDS_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: ASSET_ENABLE_FIELDS_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchgetAssetFieldsList(action) {
  try {
    const response = yield call(listGetAssetFieldsSaga, action.field);
    if (response.success === true) {
      yield put({ type: ASSET_CATEGORY_FIELDS_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_CATEGORY_FIELDS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: ASSET_CATEGORY_FIELDS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchAssetTemplateList(action){
  console.log(action);
  try {
  
    const response = yield call(getAssetTemplates);
    if (response.success === true) {
      yield put({ type: ASSET_TEMPLATE_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_TEMPLATE_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: ASSET_TEMPLATE_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchCreateTemplate(action) {
  try {
    const response = yield call(createTemplateSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_TEMPLATE_CREATE_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_TEMPLATE_CREATE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_TEMPLATE_CREATE_FAILED, data: err?.response?.data?.data });
  }
}

export function* draftTemplate(action) {
  try {
    const response = yield call(assetTemplateDraftSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_TEMPLATE_DRAFT_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_TEMPLATE_DRAFT_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_TEMPLATE_DRAFT_FAILED, data: err?.response?.data?.data });
  }
}


export function* watchassetImportProcess(action) {
  try {
    const response = yield call(assetImportProcessSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_IMPORT_PROCESS_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_IMPORT_PROCESS_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_IMPORT_PROCESS_FAILED, data: err?.response?.data?.data });
  }
}


export default function* watcher() {
  yield takeLatest(ASSET_LIST_REQUESTED, watchList);
  yield takeLatest(ASSET_DELETE_REQUESTED, watchDelete);
  yield takeLatest(ASSET_EDIT_REQUESTED, watchEdit);
  yield takeLatest(ASSET_CREATE_REQUESTED, watchCreate);
  yield takeLatest(ASSET_DETAILS_REQUESTED, watchGetSingle);
  yield takeLatest(IMPORT_ASSET_REQUESTED, watchImport);
  yield takeLatest(
    ASSET_CLASSIFICATION_LIST_REQUESTED,
    watchAssetClassificationList
  );
  yield takeLatest(ASSET_OS_LIST_REQUESTED, watchAssetOSList);
  yield takeLatest(ASSET_TYPE_BY_ID_REQUESTED, watchAssetTypeByID);
  yield takeLatest(ASSET_DASHBOARD_REQUESTED, watchGetDashboardSingle);
  yield takeLatest(ASSET_CATEGORIES_LIST_REQUESTED, watchAssetCategoriesList);
  yield takeLatest(ASSET_TYPES_LIST_REQUESTED, watchAssetTypesList);
  yield takeLatest(
    ASSET_ENABLE_FIELDS_LIST_REQUESTED,
    watchAssetEnableFieldsList
  );

  yield takeLatest(
    ASSET_CATEGORY_FIELDS_REQUESTED,
    watchgetAssetFieldsList
  );
  yield takeLatest(
    ASSET_TEMPLATE_LIST_REQUESTED,
    watchAssetTemplateList
  );
  yield takeLatest(ASSET_TEMPLATE_CREATE_REQUESTED, watchCreateTemplate);

  yield takeLatest(ASSET_TEMPLATE_DRAFT_REQUESTED, draftTemplate);

  yield takeLatest(ASSET_IMPORT_PROCESS_REQUESTED, watchassetImportProcess);

  
}
