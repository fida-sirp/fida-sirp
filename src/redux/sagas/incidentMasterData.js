import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  INCIDENT_MEMEBER_USER_REQUESTED,
  INCIDENT_MEMEBER_USER_PROCESSING,
  INCIDENT_MEMEBER_USER_SUCCESSED,
  INCIDENT_MEMEBER_USER_FAILED,
  INCIDENT_MEMEBER_USER_GROUP_REQUESTED,
  INCIDENT_MEMEBER_USER_GROUP_PROCESSING,
  INCIDENT_MEMEBER_USER_GROUP_SUCCESSED,
  INCIDENT_MEMEBER_USER_GROUP_FAILED,
  INCIDENT_SEVERITY_FAILED,
  INCIDENT_SEVERITY_SUCCESSED,
  INCIDENT_SEVERITY_REQUESTED,
  INCIDENT_CATEGORY_SUCCESSED,
  INCIDENT_CATEGORY_FAILED,
  INCIDENT_SUBCATEGORY_SUCCESSED,
  INCIDENT_SUBCATEGORY_FAILED,
  INCIDENT_DISPOSITION_SUCCESSED,
  INCIDENT_DISPOSITION_FAILED,
  INCIDENT_SUBDISPOSITION_SUCCESSED,
  INCIDENT_SUBDISPOSITION_FAILED,
  INCIDENT_LOCATION_SUCCESSED,
  INCIDENT_LOCATION_FAILED,
  INCIDENT_DETECTION_METHODS_SUCCESSED,
  INCIDENT_DETECTION_METHODS_FAILED,
  INCIDENT_ARTIFACTS_SUCCESSED,
  INCIDENT_ARTIFACTS_FAILED,
  INCIDENT_ARTIFACTS_REQUESTED,
  INCIDENT_CATEGORY_REQUESTED,
  INCIDENT_SUBCATEGORY_REQUESTED,
  INCIDENT_DISPOSITION_REQUESTED,
  INCIDENT_SUBDISPOSITION_REQUESTED,
  INCIDENT_LOCATION_REQUESTED,
  INCIDENT_DETECTION_METHODS_REQUESTED,
  SHOW_LOADER,
  HIDE_LOADER,
  INCIDENT_ACTION_APPS_SUCCESSED,
  INCIDENT_ACTION_APPS_FAILED,
  INCIDENT_ACTION_APPS_REQUESTED,
  INCIDENT_ACTION_RUN_SUCCESSED,
  INCIDENT_ACTION_RUN_FAILED,
  INCIDENT_ACTION_RUN_REQUESTED,
  INCIDENT_ARTIFACT_ADD_SUCCESSED,
  INCIDENT_ARTIFACT_ADD_FAILED,
  INCIDENT_ARTIFACT_ADD_REQUESTED,
  INCIDENT_ARTIFACTS_LIST_SUCCESSED,
  INCIDENT_ARTIFACTS_LIST_FAILED,
  INCIDENT_ARTIFACTS_LIST_REQUESTED,
  ACTION_ROW_OUTPUT_REQUESTED,
  ACTION_ROW_OUTPUT_SUCCESSED,
  ACTION_ROW_OUTPUT_FAILED,
  ACTION_ROW_OUTPUT_SET,
  SET_FEEDBACK_ALERT,

  INCIDENT_ADD_EVIDENCE_REQUESTED,
  INCIDENT_ADD_EVIDENCE_PROCESSING,
  INCIDENT_ADD_EVIDENCE_SUCCESSED,
  INCIDENT_ADD_EVIDENCE_FAILED,



} from '../../constants/actionTypes';
import {
  listMemberUserGroups,
  listMembersUser,
  getIncidentManagementSeverity,
  getIncidentcategory,
  getIncidentsubCategory,
  getIncidentartifacts,
  getIncidentdetectionMethods,
  getIncidentdisposition,
  getIncidentlocation,
  getIncidentsubDisposition,
  getActionApps,
  runActions,
  getRowOutput,
  addArtifact,
  getIncidentartifactList,
  addEvidenceSaga
} from '../../api/incidentMasterData';
const moduleName = 'incident';

export function* watchUsersList(action) {
  try {
    const response = yield call(listMembersUser, action.payload);
    if (response.success === true) {

      yield put({ type: INCIDENT_MEMEBER_USER_SUCCESSED, data: response });
    } else {
      yield put({ type: INCIDENT_MEMEBER_USER_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_MEMEBER_USER_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchMemberGroupsList(action) {
  try {
    const response = yield call(listMemberUserGroups, action.payload);
    if (response.success === true) {
      yield put({
        type: INCIDENT_MEMEBER_USER_GROUP_SUCCESSED,
        data: response,
      });
    } else {
      yield put({ type: INCIDENT_MEMEBER_USER_GROUP_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_MEMEBER_USER_GROUP_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementSeverity(action) {
  try {
    const response = yield call(getIncidentManagementSeverity, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_SEVERITY_SUCCESSED, data: response.data });
    } else {
      yield put({ type: INCIDENT_SEVERITY_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_SEVERITY_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementcategory(action) {
  try {
    const response = yield call(getIncidentcategory, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_CATEGORY_SUCCESSED, data: response.data });
    } else {
      yield put({ type: INCIDENT_CATEGORY_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_CATEGORY_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementsubCategory(action) {
  try {
    const response = yield call(getIncidentsubCategory, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_SUBCATEGORY_SUCCESSED, data: response.data });
    } else {
      yield put({ type: INCIDENT_SUBCATEGORY_FAILED, data: null });
    }

    if (action.payload?.callback) {
      action.payload.callback();
    }
  } catch (err) {
    yield put({
      type: INCIDENT_SUBCATEGORY_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementdisposition(action) {
  try {
    const response = yield call(getIncidentdisposition, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_DISPOSITION_SUCCESSED, data: response.data });
    } else {
      yield put({ type: INCIDENT_DISPOSITION_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_DISPOSITION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementsubDisposition(action) {
  try {
    const response = yield call(getIncidentsubDisposition, action.payload);
    if (response.success === true) {
      yield put({
        type: INCIDENT_SUBDISPOSITION_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: INCIDENT_SUBDISPOSITION_FAILED, data: null });
    }
    if (action.payload?.callback) {
      action.payload.callback();
    }
  } catch (err) {
    yield put({
      type: INCIDENT_SUBDISPOSITION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementlocation(action) {
  try {
    const response = yield call(getIncidentlocation, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_LOCATION_SUCCESSED, data: response.data });
    } else {
      yield put({ type: INCIDENT_LOCATION_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_LOCATION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementdetectionMethods(action) {
  try {
    const response = yield call(getIncidentdetectionMethods, action.payload);
    if (response.success === true) {
      yield put({
        type: INCIDENT_DETECTION_METHODS_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: INCIDENT_DETECTION_METHODS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_DETECTION_METHODS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementartifacts(action) {
  try {
    const response = yield call(getIncidentartifacts, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_ARTIFACTS_SUCCESSED, data: response.data });
    } else {
      yield put({ type: INCIDENT_ARTIFACTS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_ARTIFACTS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementartifactList(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(getIncidentartifactList, action.payload);
    if (response.success === true) {
      yield put({
        type: INCIDENT_ARTIFACTS_LIST_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({ type: INCIDENT_ARTIFACTS_LIST_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: INCIDENT_ARTIFACTS_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementActionsApps(action) {
  try {
    const response = yield call(getActionApps, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_ACTION_APPS_SUCCESSED, data: response.data });
    } else {
      yield put({ type: INCIDENT_ACTION_APPS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_ACTION_APPS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchIncidentManagementRunAction(action) {
  try {
    yield put({ type: SHOW_LOADER });

    const response = yield call(runActions, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_ACTION_RUN_SUCCESSED, data: response.data });
    } else {
      yield put({ type: INCIDENT_ACTION_RUN_FAILED, data: null });
    }
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Action has been scheduled.',
        feedbackType: 'success',
        module: moduleName,
      },
    });

    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({
      type: INCIDENT_ACTION_RUN_FAILED,
      data: err?.response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  }
}

export function* watchIncidentManagementAddArtifact(action) {
  try {
    const typeGiven = action.payload?.type;
    yield put({ type: SHOW_LOADER });

    const response = yield call(addArtifact, action.payload);
    if (response.success === true) {
      yield put({ type: INCIDENT_ARTIFACT_ADD_SUCCESSED, data: response.data });
    } else {
      yield put({ type: INCIDENT_ARTIFACT_ADD_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });

    if (action.payload?.callback) {
      action.payload.callback();
    }
    let msg = 'Artifact added.';
    console.log({ typeGiven });
    if (typeGiven === 'delete') {
      msg = 'Artifact deleted.';
    }
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: msg,
        feedbackType: 'success',
        module: moduleName,
      },
    });
  } catch (err) {
    console.log({ errIs: err });
    yield put({
      type: INCIDENT_ARTIFACT_ADD_FAILED,
      data: err?.response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  }
}

export function* watchGetRowOutput(action) {
  try {
    yield put({ type: SHOW_LOADER });
    yield put({ type: ACTION_ROW_OUTPUT_SET, payload: {} });

    const response = yield call(getRowOutput, action.payload);
    if (response.success === true) {
      yield put({ type: ACTION_ROW_OUTPUT_SUCCESSED, data: response.data });
    } else {
      yield put({ type: ACTION_ROW_OUTPUT_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: ACTION_ROW_OUTPUT_SET, payload: {} });
    yield put({
      type: ACTION_ROW_OUTPUT_FAILED,
      data: err?.response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  }
}

export function* AddEvidence(action) {
  try {
    console.log(action);
    const response = yield call(addEvidenceSaga, action?.payload);
    if (response.success === true) {
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'added to Evidence successflly.',
          feedbackType: 'success',
          module: 'Threat_Intel',
        },
      });

      yield put({
        type: INCIDENT_ADD_EVIDENCE_SUCCESSED,
        data: response?.data,
      });
    } else {
      yield put({ type: INCIDENT_ADD_EVIDENCE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: INCIDENT_ADD_EVIDENCE_FAILED, data: err });
  }
}

export default function* watcher() {
  yield takeLatest(INCIDENT_MEMEBER_USER_REQUESTED, watchUsersList);
  yield takeLatest(
    INCIDENT_MEMEBER_USER_GROUP_REQUESTED,
    watchMemberGroupsList
  );
  yield takeLatest(
    INCIDENT_SEVERITY_REQUESTED,
    watchIncidentManagementSeverity
  );
  yield takeLatest(
    INCIDENT_ARTIFACTS_REQUESTED,
    watchIncidentManagementartifacts
  );
  yield takeLatest(
    INCIDENT_CATEGORY_REQUESTED,
    watchIncidentManagementcategory
  );
  yield takeLatest(
    INCIDENT_SUBCATEGORY_REQUESTED,
    watchIncidentManagementsubCategory
  );
  yield takeLatest(
    INCIDENT_DISPOSITION_REQUESTED,
    watchIncidentManagementdisposition
  );
  yield takeLatest(
    INCIDENT_SUBDISPOSITION_REQUESTED,
    watchIncidentManagementsubDisposition
  );
  yield takeLatest(
    INCIDENT_LOCATION_REQUESTED,
    watchIncidentManagementlocation
  );
  yield takeLatest(
    INCIDENT_DETECTION_METHODS_REQUESTED,
    watchIncidentManagementdetectionMethods
  );
  yield takeLatest(
    INCIDENT_ACTION_APPS_REQUESTED,
    watchIncidentManagementActionsApps
  );

  yield takeLatest(
    INCIDENT_ACTION_RUN_REQUESTED,
    watchIncidentManagementRunAction
  );

  yield takeLatest(
    INCIDENT_ARTIFACT_ADD_REQUESTED,
    watchIncidentManagementAddArtifact
  );

  yield takeLatest(
    INCIDENT_ARTIFACTS_LIST_REQUESTED,
    watchIncidentManagementartifactList
  );
  yield takeEvery(INCIDENT_ADD_EVIDENCE_REQUESTED, AddEvidence);
  yield takeLatest(ACTION_ROW_OUTPUT_REQUESTED, watchGetRowOutput);
}
