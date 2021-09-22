import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  HIDE_LOADER,
  SHOW_LOADER,
  AUTOMATION_LIST_FAILED,
  AUTOMATION_LIST_REQUESTED,
  AUTOMATION_LIST_SUCCESSED,
  AUTOMATION_DETAILS_LIST_REQUESTED,
  AUTOMATION_DETAILS_LIST_SUCCESSED,
  AUTOMATION_DETAILS_LIST_FAILED,
  DELETE_AUTOMATION_REQUESTED,
  DELETE_AUTOMATION_SUCCESSED,
  DELETE_AUTOMATION_FAILED,
  GET_AUTOMATION_APPLICATION_LIST_REQUESTED,
  GET_AUTOMATION_ACTION_LIST_REQUESTED,
  GET_AUTOMATION_INPUT_LIST_REQUESTED,
  GET_AUTOMATION_APPLICATION_LIST_SUCCESSED,
  GET_AUTOMATION_APPLICATION_LIST_FAILED,
  GET_AUTOMATION_ACTION_LIST_SUCCESSED,
  GET_AUTOMATION_ACTION_LIST_FAILED,
  GET_AUTOMATION_INPUT_LIST_SUCCESSED,
  GET_AUTOMATION_INPUT_LIST_FAILED,
  CREATE_AUTOMATION_REQUESTED,
  CREATE_AUTOMATION_SUCCESSED,
  CREATE_AUTOMATION_FAILED,
  AUTOMATION_ARTIFACT_LIST_REQUESTED,
  AUTOMATION_ARTIFACT_TYPE_LIST_REQUESTED,
  AUTOMATION_ARTIFACT_LIST_SUCCESSED,
  AUTOMATION_ARTIFACT_LIST_FAILED,
  AUTOMATION_ARTIFACT_TYPE_LIST_SUCCESSED,
  AUTOMATION_ARTIFACT_TYPE_LIST_FAILED,
  CREATE_AUTOMATION_ARTIFACT_SUCCESSED,
  AUTOMATION_ARTIFACT_DELETE_REQUESTED,
  AUTOMATION_ARTIFACT_DELETE_SUCCESSED,
  AUTOMATION_ARTIFACT_DELETE_FAILED,
  CREATE_AUTOMATION_ARTIFACT_FAILED,
  CREATE_AUTOMATION_ARTIFACT_REQUESTED,
  AUTOMATION_APPROVAL_LIST_REQUESTED,
  AUTOMATION_APPROVAL_LIST_SUCCESSED,
  GET_AUTOMATION_EXECUTION_APPLICATION_LIST_SUCCESSED,
  GET_AUTOMATION_EXECUTION_APPLICATION_LIST_FAILED,
  GET_AUTOMATION_EXECUTION_APPLICATION_LIST_REQUESTED,
  GET_AUTOMATION_EXECUTION_ACTION_LIST_REQUESTED,
  GET_AUTOMATION_EXECUTION_ACTION_LIST_SUCCESSED,
  GET_AUTOMATION_EXECUTION_ACTION_LIST_FAILED,
  AUTOMATION_EXECUTION_REQUESTED,
  AUTOMATION_EXECUTION_SUCCESSED,
  AUTOMATION_EXECUTION_FAILED,
  AUTOMATION_UPDATE_REQUESTED,
  AUTOMATION_UPDATE_SUCCESSED,
  AUTOMATION_UPDATE_FAILED,
  AUTOMATION_ARTIFACT_OCCURENCE_LIST_REQUESTED,
  AUTOMATION_ARTIFACT_OCCURENCE_LIST_SUCCESSED,
  AUTOMATION_ARTIFACT_OCCURENCE_LIST_FAILED,
  AUTOMATION_RECORD_APPROVE_REQUESTED,
  SET_FEEDBACK_ALERT,
} from '../../constants/actionTypes';
import {
  listAutomationUser,
  automationDetailsSaga,
  automationDeleteSaga,
  automationApplicationSaga,
  automationActionSaga,
  automationInputSaga,
  automationCreateSaga,
  listAutomationArtifactUser,
  automationArtifactTypeSaga,
  automationArtifactCreateSaga,
  listAutomationApprovalUser,
  automationAritifactDelete,
  approveRecordSaga,
  automationArtifactExecuteApplicationSaga,
  automationArtifactExecuteActionSaga,
  ArtifactExecuteSaga,
  automationAritifactUpdate,
  occurenceListAPI,
} from '../../api/automationSaga';
import {
  automationActionList,
  automationArtifactDelete,
  automationArtifactList,
  listAutomationManagement,
} from '../../actions/automation';




function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

export function* watchUsersList(action) {
  try {
    var cnt = false;
    while(window.location.pathname=="/automationPlayground"){
    const response = yield call(listAutomationUser, action.payload);
    if (response.success === true) {
      yield put({ type: AUTOMATION_LIST_SUCCESSED, data: response });
        if(cnt){
        yield call(delay, 5000);
        }
          yield put({ type: HIDE_LOADER })
    } else {
      yield put({ type: AUTOMATION_LIST_FAILED, data: null });
    }
      cnt = true;
    }
  } catch (err) {
    yield put({
      type: AUTOMATION_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchUsersDetails(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(automationDetailsSaga, action.payload);
    if (response.success === true) {
      yield put({
        type: AUTOMATION_DETAILS_LIST_SUCCESSED,
        data: response,
      });
    } else {
      yield put({
        type: AUTOMATION_DETAILS_LIST_FAILED,
        data: null,
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: AUTOMATION_DETAILS_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchUserDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(automationDeleteSaga, action.payload);
    if (response.success === true) {
      const msg = response?.data?.message || "Automation Playground deleted Successfully!";
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'AutomationPlayground',
        },
      });

      yield put({ type: DELETE_AUTOMATION_SUCCESSED, data: response });
      yield put(listAutomationManagement({ queryItem: action.query }));
    } else {
      yield put({ type: HIDE_LOADER });
      yield put({ type: DELETE_AUTOMATION_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: DELETE_AUTOMATION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchUpdateArtifact(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(
      automationAritifactUpdate,
      action.id,
      action.payload
    );
    if (response.success === true) {
      yield put({ type: AUTOMATION_UPDATE_SUCCESSED, data: response });
      yield put(automationArtifactList({ queryItem: action.query }));
    } else {
      yield put({ type: HIDE_LOADER });
      yield put({ type: AUTOMATION_UPDATE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: AUTOMATION_UPDATE_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchArtifactDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(automationAritifactDelete, action.payload);
    if (response.success === true) {
      const msg = response?.data?.message || "Artifact deleted Successfull";
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'AutomationPlayground',
        },
      });
      yield put({ type: AUTOMATION_ARTIFACT_DELETE_SUCCESSED, data: response });
      yield put(automationArtifactList({ queryItem: action.query }));
    } else {
      yield put({
        type: AUTOMATION_ARTIFACT_DELETE_FAILED,
        data: null,
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: AUTOMATION_ARTIFACT_DELETE_FAILED,
      data: null,
    });
  }
}

export function* watchApplicationList(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(automationApplicationSaga, action.payload);
    if (response.success === true) {
      yield put({
        type: GET_AUTOMATION_APPLICATION_LIST_SUCCESSED,
        data: response,
      });
    } else {
      yield put({
        type: GET_AUTOMATION_APPLICATION_LIST_SUCCESSED,
        data: null,
      });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({
      type: GET_AUTOMATION_APPLICATION_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}
export function* watchActionList(action) {
  try {
    const response = yield call(automationActionSaga, action.payload);
    if (response.success === true) {
      yield put({
        type: GET_AUTOMATION_ACTION_LIST_SUCCESSED,
        data: response,
      });
    } else {
      yield put({
        type: GET_AUTOMATION_ACTION_LIST_FAILED,
        data: null,
      });
    }
  } catch (err) {
    yield put({
      type: GET_AUTOMATION_ACTION_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}
export function* watchInputList(action) {
  try {

    const response = yield call(automationInputSaga, action.payload);
    if (response.success === true) {
      yield put({
        type: GET_AUTOMATION_INPUT_LIST_SUCCESSED,
        data: response,
      });
    } else {
      yield put({
        type: GET_AUTOMATION_INPUT_LIST_SUCCESSED,
        data: null,
      });
    }
  } catch (err) {
    yield put({
      type: GET_AUTOMATION_INPUT_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchArtifactUserCreate(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(automationArtifactCreateSaga, action.payload);
    if (response.success === true) {
      yield put({
        type: CREATE_AUTOMATION_ARTIFACT_SUCCESSED,
        data: response,
      });
      yield put(automationArtifactList({ queryItem: action.query }));
    } else {
      yield put({
        type: CREATE_AUTOMATION_ARTIFACT_SUCCESSED,
        data: null,
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: CREATE_AUTOMATION_ARTIFACT_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchUserCreate(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(automationCreateSaga, action.payload);
    if (response.success === true) {
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Automation playground action executed',
          feedbackType: 'success',
          module: 'AutomationPlayground',
        },
      });
      yield put(
        listAutomationManagement({ queryItem: action?.queryItem })
      );
    } else {
      yield put({
        type: CREATE_AUTOMATION_FAILED,
        data: null,
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: CREATE_AUTOMATION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchApprovalsUserCreate(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(listAutomationApprovalUser, action.payload);
    if (response.success === true) {
      yield put({
        type: AUTOMATION_APPROVAL_LIST_SUCCESSED,
        data: response,
      });
      yield put({ type: HIDE_LOADER });
    } else {
      yield put({
        type: AUTOMATION_APPROVAL_LIST_SUCCESSED,
        data: null,
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: AUTOMATION_APPROVAL_LIST_FAILED,
      data: null,
    });
  }
}

export function* watchApproveRecord(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(approveRecordSaga, action.payload);
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
  }
}

export function* watchArtifactsList(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(listAutomationArtifactUser, action.payload);
    if (response.success === true) {
      yield put({
        type: AUTOMATION_ARTIFACT_LIST_SUCCESSED,
        data: response,
      });
        yield put({ type: HIDE_LOADER });
    } else {
      yield put({
        type: AUTOMATION_ARTIFACT_LIST_FAILED,
        data: null,
      });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({
      type: AUTOMATION_ARTIFACT_LIST_FAILED,
      data: null,
    });
  }
}

export function* watchOccurenceList(action) {
  try {
    const response = yield call(occurenceListAPI, action.payload);
    if (response.success === true) {
      yield put({
        type: AUTOMATION_ARTIFACT_OCCURENCE_LIST_SUCCESSED,
        data: response,
      });
    } else {
      yield put({
        type: AUTOMATION_ARTIFACT_OCCURENCE_LIST_FAILED,
        data: null,
      });
    }
  } catch (err) {
    yield put({
      type: AUTOMATION_ARTIFACT_OCCURENCE_LIST_FAILED,
      data: null,
    });
  }
}

export function* watchArtifactsTypeList(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(automationArtifactTypeSaga, action.payload);
    if (response.success === true) {
      yield put({
        type: AUTOMATION_ARTIFACT_TYPE_LIST_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({
        type: AUTOMATION_ARTIFACT_TYPE_LIST_SUCCESSED,
        data: null,
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: AUTOMATION_ARTIFACT_TYPE_LIST_FAILED,
      data: null,
    });
  }
}

export function* watchExecutionApplicationList(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(
      automationArtifactExecuteApplicationSaga,
      action.payload
    );
    if (response.success === true) {
      yield put({
        type: GET_AUTOMATION_EXECUTION_APPLICATION_LIST_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({
        type: GET_AUTOMATION_EXECUTION_APPLICATION_LIST_FAILED,
        data: null,
      });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({
      type: GET_AUTOMATION_EXECUTION_APPLICATION_LIST_FAILED,
      data: null,
    });
  }
}

export function* watchExecutionActionList(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(
      automationArtifactExecuteActionSaga,
      action.payload
    );
    if (response.success === true) {
      yield put({
        type: GET_AUTOMATION_EXECUTION_ACTION_LIST_SUCCESSED,
        data: response.data,

      });
      yield put({ type: HIDE_LOADER });
    } else {
      yield put({
        type: GET_AUTOMATION_EXECUTION_ACTION_LIST_FAILED,
        data: null,
      });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({
      type: GET_AUTOMATION_EXECUTION_ACTION_LIST_FAILED,
      data: null,
    });
  }
}

export function* watchExecutionUpdate(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(ArtifactExecuteSaga, action.payload);
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: "Artifact successfully executed!",
        feedbackType: 'success',
        module: 'AutomationPlayground',
      },
    });

    if (response.success === true) {
      yield put({
        type: AUTOMATION_EXECUTION_SUCCESSED,
        data: response.data,
      });
    } else {
      yield put({
        type: AUTOMATION_EXECUTION_FAILED,
        data: null,
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: AUTOMATION_EXECUTION_FAILED,
      data: null,
    });
  }
}
export default function* watcher() {
  yield takeLatest(AUTOMATION_LIST_REQUESTED, watchUsersList);
  yield takeLatest(AUTOMATION_DETAILS_LIST_REQUESTED, watchUsersDetails);
  yield takeLatest(AUTOMATION_UPDATE_REQUESTED, watchUpdateArtifact);
  yield takeLatest(DELETE_AUTOMATION_REQUESTED, watchUserDelete);
  yield takeLatest(
    GET_AUTOMATION_APPLICATION_LIST_REQUESTED,
    watchApplicationList
  );
  yield takeLatest(GET_AUTOMATION_ACTION_LIST_REQUESTED, watchActionList);
  yield takeLatest(GET_AUTOMATION_INPUT_LIST_REQUESTED, watchInputList);
  yield takeLatest(CREATE_AUTOMATION_REQUESTED, watchUserCreate);
  yield takeLatest(AUTOMATION_ARTIFACT_LIST_REQUESTED, watchArtifactsList);
  yield takeLatest(
    AUTOMATION_ARTIFACT_OCCURENCE_LIST_REQUESTED,
    watchOccurenceList
  );
  yield takeLatest(AUTOMATION_ARTIFACT_DELETE_REQUESTED, watchArtifactDelete);
  yield takeLatest(
    AUTOMATION_ARTIFACT_TYPE_LIST_REQUESTED,
    watchArtifactsTypeList
  );
  yield takeLatest(
    CREATE_AUTOMATION_ARTIFACT_REQUESTED,
    watchArtifactUserCreate
  );
  yield takeLatest(
    AUTOMATION_APPROVAL_LIST_REQUESTED,
    watchApprovalsUserCreate
  );

  yield takeLatest(
    AUTOMATION_RECORD_APPROVE_REQUESTED,
    watchApproveRecord
  );
  yield takeLatest(
    GET_AUTOMATION_EXECUTION_APPLICATION_LIST_REQUESTED,
    watchExecutionApplicationList
  );
  yield takeLatest(
    GET_AUTOMATION_EXECUTION_ACTION_LIST_REQUESTED,
    watchExecutionActionList
  );
  yield takeLatest(AUTOMATION_EXECUTION_REQUESTED, watchExecutionUpdate);
}
