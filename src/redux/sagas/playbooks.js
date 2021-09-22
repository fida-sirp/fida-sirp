import { put, call, takeLatest, takeEvery, delay } from 'redux-saga/effects';
import {
  PLAYBOOK_LIST_SUCCESSED,
  PLAYBOOK_LIST_FAILED,
  SHOW_LOADER,
  HIDE_LOADER,
  PLAYBOOK_LIST_REQUESTED,
  PLAYBOOKS_LOGS_SUCCESSED,
  PLAYBOOKS_LOGS_FAILED,
  PLAYBOOKS_LOGS_REQUESTED,
  CATEGORY_FILTER_FAILED,
  PLAYBOOK_DELETE_SUCCESSED,
  PLAYBOOK_DELETE_FAILED,
  PLAYBOOK_DELETE_REQUESTED,
  PLAYBOOK_LOG_DELETE_SUCCESSED,
  PLAYBOOK_LOG_DELETE_FAILED,
  PLAYBOOK_LOG_DELETE_REQUESTED,
  PLAYBOOK_DUPLICATE_SUCCESSED,
  PLAYBOOK_DUPLICATE_FAILED,
  PLAYBOOK_DUPLICATE_REQUESTED,
  RESET_DUPLICATION_STORE,
  PLAYBOOK_RULES_LIST_REQUESTED,
  PLAYBOOK_RULES_LIST_SUCCESSED,
  PLAYBOOK_RULES_LIST_FAILED,
  PLAYBOOK_RULES_CREATE_LIST_REQUESTED,
  PLAYBOOK_RULES_UPDATE_LIST_REQUESTED,
  PLAYBOOK_RULES_DELETE_LIST_REQUESTED,
  PLAYBOOK_RULES_DELETE_LIST_SUCCESSED,
  PLAYBOOK_RULES_DELETE_LIST_FAILED,
  PLAYBOOK_RULES_UPDATE_LIST_SUCCESSED,
  PLAYBOOK_RULES_UPDATE_LIST_FAILED,
  PLAYBOOK_RULES_CREATE_LIST_SUCCESSED,
  PLAYBOOK_RULES_CREATE_LIST_FAILED,
  PLAYBOOK_CATEOGRY_LIST_REQUESTED,
  PLAYBOOK_SUB_CATEOGRY_LIST_REQUESTED,
  PLAYBOOK_DISPOSITION_LIST_REQUESTED,
  PLAYBOOK_SUB_DISPOSITION_LIST_REQUESTED,
  PLAYBOOK_LOCATION_LIST_REQUESTED,
  PLAYBOOK_RISK_RATING_LIST_REQUESTED,
  PLAYBOOK_CATEOGRY_LIST_SUCCESSED,
  PLAYBOOK_CATEOGRY_LIST_FAILED,
  PLAYBOOK_SUB_CATEOGRY_LIST_FAILED,
  PLAYBOOK_DISPOSITION_LIST_SUCCESSED,
  PLAYBOOK_DISPOSITION_LIST_FAILED,
  PLAYBOOK_SUB_DISPOSITION_LIST_SUCCESSED,
  PLAYBOOK_SUB_DISPOSITION_LIST_FAILED,
  PLAYBOOK_LOCATION_LIST_SUCCESSED,
  PLAYBOOK_LOCATION_LIST_FAILED,
  PLAYBOOK_RISK_RATING_LIST_SUCCESSED,
  PLAYBOOK_RISK_RATING_LIST_FAILED,
  PLAYBOOK_SUB_CATEOGRY_LIST_SUCCESSED,
  PLAYBOOK_DOWNLOAD_SUCCESSED,
  PLAYBOOK_DOWNLOAD_FAILED,
  PLAYBOOK_DOWNLOAD_REQUESTED,
  PLAYBOOK_QUEUE_LOG_SUCCESSED,
  PLAYBOOK_QUEUE_LOG_FAILED,
  PLAYBOOK_QUEUE_LOG_REQUESTED,
  PLAYBOOK_IMPORT_REQUESTED,
  PLAYBOOK_IMPORT_SUCCESSED,
  PLAYBOOK_IMPORT_FAILED,
  SET_FEEDBACK_ALERT,
} from '../../constants/actionTypes';
import {
  playbookLogsSaga,
  playbookSaga,
  deleteplaybookSaga,
  deletePlaybooklogsaga,
  duplicatePlaybooksaga,
  rulesAPI,
  deleteRulesAPI,
  updateRulesAPI,
  createRulesAPI,
  subCategoryListAPI,
  categoryListAPI,
  dispositionListAPI,
  subDispositionListAPI,
  riskRatingAPI,
  locationListAPI,
  dowloadPlayboook,
  plabookQueueViewLogs,
  plabookImportAPI,
} from '../../api/playbooksSaga';
import {
  listPlaybook,
  resetDuplicatePlaybookstore,
  getRulesList
} from '../../actions/playbooks';

export function* watchPlaybooksList(action) {
  try {
    const playbookData = yield call(playbookSaga, action.payload);

    if (playbookData.success === true) {
      yield put({ type: PLAYBOOK_LIST_SUCCESSED, data: playbookData });
        yield put({ type: HIDE_LOADER });
    } else {
      yield put({ type: PLAYBOOK_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: PLAYBOOK_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchPlayBookslogs(action) {
  try {
    const playbooksLogsData = yield call(playbookLogsSaga, action.payload);
    if (playbooksLogsData.success === true) {
      yield put({ type: PLAYBOOKS_LOGS_SUCCESSED, data: playbooksLogsData });
        yield put({ type: HIDE_LOADER });
    } else {
      yield put({ type: PLAYBOOKS_LOGS_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: PLAYBOOKS_LOGS_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(deleteplaybookSaga, action.id);

    if (response.success === true) {
      yield put({ type: PLAYBOOK_DELETE_SUCCESSED, data: response });

      yield put(listPlaybook({ queryItem: action.query }));
    } else {
      yield put({ type: PLAYBOOK_DELETE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_DELETE_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchLogDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(deletePlaybooklogsaga, action.id);

    if (response.success === true) {
      yield put({ type: PLAYBOOK_LOG_DELETE_SUCCESSED, data: response });
      console.log('THIS IS PAGENO', action.pageNo);
      yield put(listPlaybook(action.pageNo));
    } else {
      yield put({ type: PLAYBOOK_LOG_DELETE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_LOG_DELETE_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchDuplicate(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(duplicatePlaybooksaga, action.id);

    if (response.success === true) {
      yield put({ type: PLAYBOOK_DUPLICATE_SUCCESSED, data: response });
      yield put(listPlaybook({ queryItem: action.query }));
    } else {
      yield put({ type: PLAYBOOK_DUPLICATE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_DUPLICATE_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchRulesList(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(rulesAPI, action.payload);

    if (response.success === true) {
      yield put({ type: PLAYBOOK_RULES_LIST_SUCCESSED, data: response.data });
      yield put(listPlaybook({ queryItem: action.query }));
    } else {
      yield put({ type: PLAYBOOK_RULES_LIST_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_RULES_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchRulesCreateList(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(createRulesAPI, action.payload);
    if (response.success === true) {
      yield put({
        type: PLAYBOOK_RULES_CREATE_LIST_SUCCESSED,
        data: response.data,
      });
      yield put(getRulesList({ id: action?.payload?.rootId, queryItem: action?.payload?.pageQuery }))
    } else {
      yield put({ type: PLAYBOOK_RULES_CREATE_LIST_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_RULES_CREATE_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchRulesUpdateList(action) {

  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(updateRulesAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: PLAYBOOK_RULES_UPDATE_LIST_SUCCESSED,
        data: response.data,
      });
      yield put(getRulesList({ id: action?.payload?.rootId, queryItem: action?.payload?.pageQuery }))
    } else {
      yield put({ type: PLAYBOOK_RULES_UPDATE_LIST_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_RULES_UPDATE_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchRulesDeleteList(action) {
  yield put({ type: SHOW_LOADER });
  try {
    const response = yield call(deleteRulesAPI, action.payload.id);
    if (response.success === true) {
      yield put({
        type: PLAYBOOK_RULES_DELETE_LIST_SUCCESSED,
        data: response.data,
      });
      yield put(getRulesList({ id: action.payload.rootId, queryItem: action.payload.pageQuery }))
    } else {
      yield put({ type: PLAYBOOK_RULES_DELETE_LIST_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_RULES_DELETE_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchCategoryList(action) {
  try {
    const response = yield call(categoryListAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: PLAYBOOK_CATEOGRY_LIST_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: PLAYBOOK_CATEOGRY_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: PLAYBOOK_CATEOGRY_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchSubCategoryList(action) {
  try {
    const response = yield call(subCategoryListAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: PLAYBOOK_SUB_CATEOGRY_LIST_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: PLAYBOOK_SUB_CATEOGRY_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: PLAYBOOK_SUB_CATEOGRY_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchDespositionList(action) {
  try {
    const response = yield call(dispositionListAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: PLAYBOOK_DISPOSITION_LIST_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: PLAYBOOK_DISPOSITION_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: PLAYBOOK_DISPOSITION_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchSubDespositionList(action) {
  try {
    const response = yield call(subDispositionListAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: PLAYBOOK_SUB_DISPOSITION_LIST_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: PLAYBOOK_SUB_DISPOSITION_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: PLAYBOOK_SUB_DISPOSITION_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchLocationList(action) {
  try {
    const response = yield call(locationListAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: PLAYBOOK_LOCATION_LIST_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: PLAYBOOK_LOCATION_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: PLAYBOOK_LOCATION_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchRiskList(action) {
  try {
    const response = yield call(riskRatingAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: PLAYBOOK_RISK_RATING_LIST_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: PLAYBOOK_RISK_RATING_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: PLAYBOOK_RISK_RATING_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchPlaybookDowload(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(dowloadPlayboook, action.id, action.playBookName);
    if (response.success === true) {
      yield put({ type: PLAYBOOK_DOWNLOAD_SUCCESSED, data: response });
      yield put(listPlaybook({ queryItem: action.query }));
    } else {
      yield put({ type: PLAYBOOK_DOWNLOAD_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_DOWNLOAD_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchPlaybookQueue(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(plabookQueueViewLogs, action.queueId, action.actionId);
    if (response.success === true) {
      yield put({ type: PLAYBOOK_QUEUE_LOG_SUCCESSED, data: response });
    } else {
      yield put({ type: PLAYBOOK_QUEUE_LOG_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_QUEUE_LOG_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchPlaybookDownload(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(plabookImportAPI, action.payload);
    if (response.success === true) {
      yield put({ type: PLAYBOOK_IMPORT_SUCCESSED, data: response });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Playbook import successfully',
          feedbackType: 'success',
          module: "Administrator",
        },
      });
  
    } else {
      yield put({ type: PLAYBOOK_IMPORT_FAILED, data: null });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Playbook import failed',
          feedbackType: 'danger',
          module: "Administrator",
        },
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: PLAYBOOK_IMPORT_FAILED,
      data: err?.response?.data?.data,
    });
  }
}


export default function* watcher() {
  yield takeLatest(PLAYBOOK_LIST_REQUESTED, watchPlaybooksList);
  yield takeLatest(PLAYBOOKS_LOGS_REQUESTED, watchPlayBookslogs);
  yield takeEvery(PLAYBOOK_DELETE_REQUESTED, watchDelete);
  yield takeLatest(PLAYBOOK_LOG_DELETE_REQUESTED, watchLogDelete);
  yield takeEvery(PLAYBOOK_DUPLICATE_REQUESTED, watchDuplicate);
  yield takeLatest(PLAYBOOK_RULES_LIST_REQUESTED, watchRulesList);
  yield takeLatest(PLAYBOOK_RULES_CREATE_LIST_REQUESTED, watchRulesCreateList);
  yield takeLatest(PLAYBOOK_RULES_UPDATE_LIST_REQUESTED, watchRulesUpdateList);
  yield takeLatest(PLAYBOOK_RULES_DELETE_LIST_REQUESTED, watchRulesDeleteList);
  yield takeLatest(PLAYBOOK_CATEOGRY_LIST_REQUESTED, watchCategoryList);
  yield takeLatest(PLAYBOOK_SUB_CATEOGRY_LIST_REQUESTED, watchSubCategoryList);
  yield takeLatest(PLAYBOOK_DISPOSITION_LIST_REQUESTED, watchDespositionList);
  yield takeLatest(
    PLAYBOOK_SUB_DISPOSITION_LIST_REQUESTED,
    watchSubDespositionList
  );
  yield takeLatest(PLAYBOOK_LOCATION_LIST_REQUESTED, watchLocationList);
  yield takeLatest(PLAYBOOK_RISK_RATING_LIST_REQUESTED, watchRiskList);
  yield takeLatest(PLAYBOOK_DOWNLOAD_REQUESTED, watchPlaybookDowload);
  yield takeLatest(PLAYBOOK_QUEUE_LOG_REQUESTED, watchPlaybookQueue);
  yield takeLatest(PLAYBOOK_IMPORT_REQUESTED, watchPlaybookDownload);
}
