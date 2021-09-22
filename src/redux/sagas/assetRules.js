import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  ASSET_RULE_LIST_SUCCESSED,
  ASSET_RULE_LIST_FAILED,
  ASSET_RULE_LIST_REQUESTED,
  ASSET_RULE_CREATE_REQUESTED,
  ASSET_RULE_CREATE_SUCCESSED,
  ASSET_RULE_CREATE_FAILED,
  ASSET_RULE_EDIT_REQUESTED,
  ASSET_RULE_EDIT_SUCCESSED,
  ASSET_RULE_EDIT_FAILED,
  ASSET_RULE_DELETE_REQUESTED,
  ASSET_RULE_DELETE_SUCCESSED,
  ASSET_RULE_DELETE_FAILED,

  
  ASSET_RULE_VIEW_LIST_REQUESTED,
  ASSET_RULE_VIEW_LIST_PROCESSING,
  ASSET_RULE_VIEW_LIST_SUCCESSED,
  ASSET_RULE_VIEW_LIST_FAILED,

  
  ASSET_RULE_VIEW_DELETE_REQUESTED,
  ASSET_RULE_VIEW_DELETE_PROCESSING,
  ASSET_RULE_VIEW_DELETE_SUCCESSED,
  ASSET_RULE_VIEW_DELETE_FAILED,

  ASSET_RULE_VIEW_SAVE_REQUESTED,
  ASSET_RULE_VIEW_SAVE_PROCESSING,
  ASSET_RULE_VIEW_SAVE_SUCCESSED,
  ASSET_RULE_VIEW_SAVE_FAILED,

  
  ASSET_RULE_VIEW_SINGLE_DELETE_REQUESTED,
  ASSET_RULE_VIEW_SINGLE_DELETE_PROCESSING,
  ASSET_RULE_VIEW_SINGLE_DELETE_SUCCESSED,
  ASSET_RULE_VIEW_SINGLE_DELETE_FAILED,

  ASSET_RULE_VIEW_SINGLE_SAVE_REQUESTED,
  ASSET_RULE_VIEW_SINGLE_SAVE_PROCESSING,
  ASSET_RULE_VIEW_SINGLE_SAVE_SUCCESSED,
  ASSET_RULE_VIEW_SINGLE_SAVE_FAILED,
  
  
  ASSET_RULE_PLAY_REQUESTED,
  ASSET_RULE_PLAY_PROCESSING,
  ASSET_RULE_PLAY_SUCCESSED,
  ASSET_RULE_PLAY_FAILED,

  SHOW_LOADER,
  HIDE_LOADER,
} from '../../constants/actionTypes';
import {
  listSaga,
  createSaga,
  editSaga,
  deleteSaga,
  getAssetRulesResultsSaga,
  deleteAssetRuleViewSaga,
  bulkSaveAssetRuleViewSaga,
  deleteSingleAssetRuleViewSaga,
  singleSaveAssetRuleViewSaga,
  playSaga
} from '../../api/assetsRuleSaga';
 
export function* watchList(action) {
  try {
    const response = yield call(listSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_RULE_LIST_SUCCESSED, data: response });
        yield put({ type: HIDE_LOADER });
    } else {
      yield put({ type: ASSET_RULE_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_RULE_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchCreate(action) {
  try {
    const response = yield call(createSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_RULE_CREATE_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_RULE_CREATE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_RULE_CREATE_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchEdit(action) {
  try {
    console.log(action.payload);
    const response = yield call(editSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_RULE_EDIT_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_RULE_EDIT_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_RULE_EDIT_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });

    const response = yield call(deleteSaga, action.id);

    if (response.success === true) {
      yield put({ type: ASSET_RULE_DELETE_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_RULE_DELETE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: ASSET_RULE_DELETE_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchRuleViewList(action) {
  try {
    const response = yield call(getAssetRulesResultsSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_RULE_VIEW_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_RULE_VIEW_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_RULE_VIEW_LIST_FAILED, data: err?.response?.data?.data });
  }
}


export function* watchRuleViewDelete(action) {
  try {
    const response = yield call(deleteAssetRuleViewSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_RULE_VIEW_DELETE_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_RULE_VIEW_DELETE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_RULE_VIEW_DELETE_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchRuleViewSave(action) {
  try {
    const response = yield call(bulkSaveAssetRuleViewSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_RULE_VIEW_SAVE_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_RULE_VIEW_SAVE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_RULE_VIEW_SAVE_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchAssetRuleSingleDelete(action) {
  try {
  

    const response = yield call(deleteSingleAssetRuleViewSaga, action.id);

    if (response.success === true) {
      yield put({ type: ASSET_RULE_VIEW_SINGLE_DELETE_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_RULE_VIEW_SINGLE_DELETE_FAILED, data: null });
    }

  } catch (err) {

    yield put({ type: ASSET_RULE_VIEW_SINGLE_DELETE_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchsingleRuleViewSave(action) {
  try {
    const response = yield call(singleSaveAssetRuleViewSaga, action.payload);
    if (response.success === true) {
      yield put({ type: ASSET_RULE_VIEW_SINGLE_SAVE_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_RULE_VIEW_SINGLE_SAVE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ASSET_RULE_VIEW_SINGLE_SAVE_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchPlay(action) {
  try {
    const response = yield call(playSaga, action.id);
    if (response.success === true) {
      yield put({ type: ASSET_RULE_PLAY_SUCCESSED, data: response });
    } else {
      yield put({ type: ASSET_RULE_PLAY_FAILED, data: null });
    }

  } catch (err) {

    yield put({ type: ASSET_RULE_PLAY_FAILED, data: err?.response?.data?.data });
  }
}

export default function* watcher() {
  yield takeLatest(ASSET_RULE_LIST_REQUESTED, watchList);
  yield takeLatest(ASSET_RULE_DELETE_REQUESTED, watchDelete);
  yield takeLatest(ASSET_RULE_EDIT_REQUESTED, watchEdit);
  yield takeLatest(ASSET_RULE_CREATE_REQUESTED, watchCreate);
  yield takeLatest(ASSET_RULE_VIEW_LIST_REQUESTED, watchRuleViewList);
  yield takeLatest(ASSET_RULE_VIEW_DELETE_REQUESTED, watchRuleViewDelete);
  yield takeLatest(ASSET_RULE_VIEW_SAVE_REQUESTED, watchRuleViewSave);
  yield takeLatest(ASSET_RULE_VIEW_SINGLE_DELETE_REQUESTED, watchAssetRuleSingleDelete);
  yield takeLatest(ASSET_RULE_VIEW_SINGLE_SAVE_REQUESTED, watchsingleRuleViewSave);
  yield takeLatest(ASSET_RULE_PLAY_REQUESTED, watchPlay);
  
}
