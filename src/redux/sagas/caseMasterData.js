import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  CASE_MEMEBER_USER_REQUESTED,
  CASE_MEMEBER_USER_SUCCESSED,
  CASE_MEMEBER_USER_FAILED,
  CASE_MEMEBER_USER_GROUP_REQUESTED,
  CASE_MEMEBER_USER_GROUP_SUCCESSED,
  CASE_MEMEBER_USER_GROUP_FAILED,
  CASE_SEVERITY_FAILED,
  CASE_SEVERITY_SUCCESSED,
  CASE_SEVERITY_REQUESTED,
  CASE_CATEGORY_SUCCESSED,
  CASE_CATEGORY_FAILED,
  CASE_SUBCATEGORY_SUCCESSED,
  CASE_SUBCATEGORY_FAILED,
  CASE_DISPOSITION_SUCCESSED,
  CASE_DISPOSITION_FAILED,
  CASE_SUBDISPOSITION_SUCCESSED,
  CASE_SUBDISPOSITION_FAILED,
  CASE_LOCATION_SUCCESSED,
  CASE_LOCATION_FAILED,
  CASE_DETECTION_METHODS_SUCCESSED,
  CASE_DETECTION_METHODS_FAILED,
  CASE_CATEGORY_REQUESTED,
  CASE_SUBCATEGORY_REQUESTED,
  CASE_DISPOSITION_REQUESTED,
  CASE_SUBDISPOSITION_REQUESTED,
  CASE_LOCATION_REQUESTED,
  CASE_DETECTION_METHODS_REQUESTED,
  CASE_ACTION_APPS_SUCCESSED,
  CASE_ACTION_APPS_FAILED,
  CASE_ACTION_APPS_REQUESTED,
  CASE_ACTION_RUN_SUCCESSED,
  CASE_ACTION_RUN_FAILED,
  CASE_ACTION_RUN_REQUESTED,
  SHOW_LOADER,
  HIDE_LOADER,
  SET_FEEDBACK_ALERT,
} from '../../constants/actionTypes';
import {
  listMemberUserGroups,
  listMembersUser,
  getCaseManagementSeverity,
  getCasecategory,
  getCasesubCategory,
  getCasedetectionMethods,
  getCasedisposition,
  getCaselocation,
  getCasesubDisposition,
  getActionApps,
  runActions,
} from '../../api/caseMasterData';

const moduleName = 'caseModule';

export function* watchUsersList(action) {
  try {
    const response = yield call(listMembersUser, action.payload);
    if (response.success === true) {
 
      yield put({ type: CASE_MEMEBER_USER_SUCCESSED, data: response });
    } else {
      yield put({ type: CASE_MEMEBER_USER_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: CASE_MEMEBER_USER_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchMemberGroupsList(action) {
  try {
    const response = yield call(listMemberUserGroups, action.payload);
    if (response.success === true) {
      yield put({
        type: CASE_MEMEBER_USER_GROUP_SUCCESSED,
        data: response,
      });
    } else {
      yield put({ type: CASE_MEMEBER_USER_GROUP_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: CASE_MEMEBER_USER_GROUP_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchCaseManagementSeverity(action) {
  try {
    const response = yield call(getCaseManagementSeverity, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_SEVERITY_SUCCESSED, data: response.data });
    } else {
      yield put({ type: CASE_SEVERITY_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: CASE_SEVERITY_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchCaseManagementcategory(action) {
  try {
    const response = yield call(getCasecategory, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_CATEGORY_SUCCESSED, data: response.data });
    } else {
      yield put({ type: CASE_CATEGORY_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: CASE_CATEGORY_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchCaseManagementsubCategory(action) {
  try {
    yield put({ type: SHOW_LOADER });

    const response = yield call(getCasesubCategory, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_SUBCATEGORY_SUCCESSED, data: response.data });
    } else {
      yield put({ type: CASE_SUBCATEGORY_FAILED, data: null });
    }

    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({
      type: CASE_SUBCATEGORY_FAILED,
      data: err?.response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  }
}

export function* watchCaseManagementdisposition(action) {
  try {
    const response = yield call(getCasedisposition, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_DISPOSITION_SUCCESSED, data: response.data });
    } else {
      yield put({ type: CASE_DISPOSITION_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: CASE_DISPOSITION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchCaseManagementsubDisposition(action) {
  try {
    const response = yield call(getCasesubDisposition, action.payload);
    if (response.success === true) {
      yield put({
        type: CASE_SUBDISPOSITION_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: CASE_SUBDISPOSITION_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: CASE_SUBDISPOSITION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchCaseManagementlocation(action) {
  try {
    const response = yield call(getCaselocation, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_LOCATION_SUCCESSED, data: response.data });
    } else {
      yield put({ type: CASE_LOCATION_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: CASE_LOCATION_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchCaseManagementdetectionMethods(action) {
  try {
    const response = yield call(getCasedetectionMethods, action.payload);
    if (response.success === true) {
      yield put({
        type: CASE_DETECTION_METHODS_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: CASE_DETECTION_METHODS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: CASE_DETECTION_METHODS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchCaseManagementActionsApps(action) {
  try {
    const response = yield call(getActionApps, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_ACTION_APPS_SUCCESSED, data: response.data });
    } else {
      yield put({ type: CASE_ACTION_APPS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: CASE_ACTION_APPS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchCaseManagementRunAction(action) {
  try {
    yield put({ type: SHOW_LOADER });

    const response = yield call(runActions, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_ACTION_RUN_SUCCESSED, data: response.data });
    } else {
      yield put({ type: CASE_ACTION_RUN_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Action has been schedule.',
        feedbackType: 'success',
        module: moduleName,
      },
    });
  } catch (err) {
    yield put({
      type: CASE_ACTION_RUN_FAILED,
      data: err?.response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  }
}

export default function* watcher() {
  yield takeLatest(CASE_MEMEBER_USER_REQUESTED, watchUsersList);
  yield takeLatest(CASE_MEMEBER_USER_GROUP_REQUESTED, watchMemberGroupsList);
  yield takeLatest(CASE_SEVERITY_REQUESTED, watchCaseManagementSeverity);
  yield takeLatest(CASE_CATEGORY_REQUESTED, watchCaseManagementcategory);
  yield takeLatest(CASE_SUBCATEGORY_REQUESTED, watchCaseManagementsubCategory);
  yield takeLatest(CASE_DISPOSITION_REQUESTED, watchCaseManagementdisposition);
  yield takeLatest(
    CASE_SUBDISPOSITION_REQUESTED,
    watchCaseManagementsubDisposition
  );
  yield takeLatest(CASE_LOCATION_REQUESTED, watchCaseManagementlocation);
  yield takeLatest(
    CASE_DETECTION_METHODS_REQUESTED,
    watchCaseManagementdetectionMethods
  );
  yield takeLatest(CASE_ACTION_APPS_REQUESTED, watchCaseManagementActionsApps);

  yield takeLatest(CASE_ACTION_RUN_REQUESTED, watchCaseManagementRunAction);
}
