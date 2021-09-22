import { put, call, takeLatest } from 'redux-saga/effects';
import {
  GET_APPS_DETAILS_REQUESTED,
  GET_APPS_DETAILS_SUCCESSED,
  GET_APPS_DETAILS_FAILED,
  UPDATE_APPLICATION_DETAILS_REQUESTED,
  UPDATE_APPLICATION_DETAILS_SUCCESSED,
  UPDATE_APPLICATION_DETAILS_FAILED,
  UPDATE_APPLICATION_STATUS_REQUESTED,
  UPDATE_APPLICATION_STATUS_SUCCESSED,
  UPDATE_APPLICATION_STATUS_FAILED,
  GET_CONFIGURATION_DETAILS_REQUESTED,
  GET_CONFIGURATION_DETAILS_SUCCESSED,
  GET_CONFIGURATION_DETAILS_FAILED,
  GET_CONFIGURATION_FIELD_VALUE_REQUESTED,
  GET_CONFIGURATION_FIELD_VALUE_SUCCESSED,
  GET_CONFIGURATION_FIELD_VALUE_FAILED,
  UPDATE_CONFIGURATION_FILEDS_DETAILS_REQUESTED,
  UPDATE_CONFIGURATION_FILEDS_DETAILS_SUCCESSED,
  UPDATE_CONFIGURATION_FILEDS_DETAILS_FAILED,
  CHECK_IS_MULTI_CONFIG_REQUESTED,
  CHECK_IS_MULTI_CONFIG_SUCCESSED,
  CHECK_IS_MULTI_CONFIG_FAILED,
  GET_APPLICATION_VENDOR_LIST_REQUESTED,
  GET_APPLICATION_PUBLISHERS_LIST_REQUESTED,
  GET_APPLICATION_TYPE_LIST_REQUESTED,
  GET_APPLICATION_RATE_LIST_REQUESTED,
  GET_APPLICATION_VENDOR_LIST_SUCCESSED,
  GET_APPLICATION_VENDOR_LIST_FAILED,
  GET_APPLICATION_PUBLISHERS_LIST_SUCCESSED,
  GET_APPLICATION_PUBLISHERS_LIST_FAILED,
  GET_APPLICATION_TYPE_LIST_SUCCESSED,
  GET_APPLICATION_TYPE_LIST_FAILED,
  GET_APPLICATION_RATE_LIST_SUCCESSED,
  GET_APPLICATION_RATE_LIST_FAILED,
  CREATE_APPLICATION_REQUESTED,
  CREATE_APPLICATION_SUCCESSED,
  CREATE_APPLICATION_FAILED,
  GET_APPROVAL_FLOW_LIST_REQUESTED,
  GET_APPROVAL_FLOW_LIST_SUCCESSED,
  GET_APPROVAL_FLOW_LIST_FAILED,
  GET_PRIMARY_APPROVERS_LIST_REQUESTED,
  GET_PRIMARY_APPROVERS_LIST_SUCCESSED,
  GET_PRIMARY_APPROVERS_LIST_FAILED,
  UPDATE_APPROVAL_WORKFLOW_DETAILS_REQUESTED,
  UPDATE_APPROVAL_WORKFLOW_DETAILS_SUCCESSED,
  UPDATE_APPROVAL_WORKFLOW_DETAILS_FAILED,
  DELETE_APPROVAL_WORKFLOW_REQUESTED,
  DELETE_APPROVAL_WORKFLOW_FAILED,
  DELETE_APPROVAL_WORKFLOW_SUCCESSED,
  HIDE_LOADER,
  SHOW_LOADER,
  CREATE_APPROVAL_WORKFLOW_DETAILS_REQUESTED,
  CREATE_APPROVAL_WORKFLOW_DETAILS_SUCCESSED,
  CREATE_APPROVAL_WORKFLOW_DETAILS_FAILED,
  GET_APPS_ACTION_DETAILS_REQUESTED,
  GET_APPS_ACTION_DETAILS_SUCCESSED,
  GET_APPS_ACTION_DETAILS_FAILED,
  GET_APPS_ACTION_WORKFLOW_REQUESTED,
  GET_APPS_ACTION_WORKFLOW_SUCCESSED,
  GET_APPS_ACTION_WORKFLOW_FAILED,
  UPDATE_APPS_ACTION_WORKFLOW_REQUESTED,
  UPDATE_APPS_ACTION_WORKFLOW_SUCCESSED,
  UPDATE_APPS_ACTION_WORKFLOW_FAILED,
  UPDATE_MULTI_CONFIGURATION_FILEDS_DETAILS_REQUESTED,
  UPDATE_MULTI_CONFIGURATION_FILEDS_DETAILS_FAILED,
  UPDATE_MULTI_CONFIGURATION_FILEDS_DETAILS_SUCCESSED,
  DELETE_APPLICATION_REQUESTED,
  DELETE_APPLICATION_SUCCESSED,
  DELETE_APPLICATION_FAILED,
  UPDATE_APPLICATION_REQUESTED,
  UPDATE_APPLICATION_SUCCESSED,
  UPDATE_APPLICATION_FAILED,
  SET_FEEDBACK_ALERT,
  UPDATE_APPS_ACTION_WORKFLOW_UPGRADE_LIST,
  APP_CONFIG_REQUESTED,
  APP_CONFIG_SUCCESSED,
  APP_CONFIG_FAILED,
  APP_CONFIG_ADD_SUCCESSED,
  APP_CONFIG_ADD_REQUESTED,
  APP_CONFIG_ADD_FAILED
} from '../../constants/actionTypes';
import {
  applicationSaga,
  checkIsMultiConfigApi,
  createApplicationApi,
  getApplicationPublishersListApi,
  getApplicationRateLimitApi,
  getApplicationTypeListApi,
  getApplicationVendorListApi,
  getConfigurationDetailsApi,
  getConfigurationFieldsDataApi,
  udpateApplicationDetailsApi,
  udpateApplicationStatusApi,
  udpateConfigurationDetailsApi,
  getApprovalFlowListApi,
  getPrimaryListApi,
  udpateApprovalWorkFlowDetailsApi,
  deleteWorkFlowApi,
  createApprovalWorkFlowApi,
  getActionApi,
  getActionWorkFlowApi,
  updateActionWorkFlowApi,
  updateMultiDataPopupDetailsApi,
  deleteApplicationApi,
  updateApplicationApi,
  getAppsConfigsApi,
  appConfigAdd,
} from '../../api/appsSaga';
import { getApprovalFlowListRequested, getAppsDetailsRequested } from '../../actions/apps';

export function* getAppsDetails(action) {
  try {
    const response = yield call(applicationSaga, action.payload);
    if (response.success === true) {
      yield put({ type: GET_APPS_DETAILS_SUCCESSED, data: response });
        yield put({ type: HIDE_LOADER });
    } else {
      yield put({ type: GET_APPS_DETAILS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: GET_APPS_DETAILS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* updateApplicationDetails(action) {
  try {
    const response = yield call(udpateApplicationDetailsApi, action.payload);
    if (response.success === true) {
      yield put({ type: UPDATE_APPLICATION_DETAILS_SUCCESSED, data: response });
    } else {
      yield put({ type: UPDATE_APPLICATION_DETAILS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: UPDATE_APPLICATION_DETAILS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* updateApplicationStatus(action) {
  try {
    const response = yield call(udpateApplicationStatusApi, action.payload);
    if (response.success === true) {
      yield put({ type: HIDE_LOADER });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: response?.data[1],
          feedbackType: 'success',
          module: 'Apps',
        },
      });
      const appResponse = yield call(
        applicationSaga,
        action.payload.updatedData
      );
      if (appResponse.success === true) {
        yield put({ type: GET_APPS_DETAILS_SUCCESSED, data: appResponse });
      } else {
        yield put({ type: GET_APPS_DETAILS_FAILED, data: null });
      }
      yield put({ type: UPDATE_APPLICATION_STATUS_SUCCESSED, data: response });
    } else {
      yield put({ type: UPDATE_APPLICATION_STATUS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: UPDATE_APPLICATION_STATUS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* updateConfigDetails(action) {
  try {
    const response = yield call(udpateConfigurationDetailsApi, action.payload);
    if (response) {
      if (action.payload.isConfig === false) {
        const appResponse = yield call(
          applicationSaga,
          action.payload.updatedData
        );
        if (appResponse.success === true) {
          yield put({ type: GET_APPS_DETAILS_SUCCESSED, data: appResponse });
        } else {
          yield put({ type: GET_APPS_DETAILS_FAILED, data: null });
        }
      }
      yield put({
        type: UPDATE_CONFIGURATION_FILEDS_DETAILS_SUCCESSED,
        data: response,
      });
    } else {
      yield put({
        type: UPDATE_CONFIGURATION_FILEDS_DETAILS_FAILED,
        data: null,
      });
    }
  } catch (err) {
    yield put({
      type: UPDATE_CONFIGURATION_FILEDS_DETAILS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* getConfigurationDetails(action) {
  try {
    const response = yield call(getConfigurationDetailsApi, action.payload);
    if (response.success === true) {
      // yield put({
      //   type: SET_FEEDBACK_ALERT,
      //   payload: {
      //     feedbackMessage: response?.data[1],
      //     feedbackType: 'success',
      //     module: 'Apps',
      //   },
      // });
      yield put({ type: GET_CONFIGURATION_DETAILS_SUCCESSED, data: response });
    } else {
      yield put({ type: GET_CONFIGURATION_DETAILS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: GET_CONFIGURATION_DETAILS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* getConfigurationFieldsData(action) {
  try {
    if (action?.payload?.isConfig) {
      const checkResponse = yield call(checkIsMultiConfigApi, action.payload);
      action.payload.multiconfig =
        checkResponse?.data?.app_multi_config_allowed;
    }
    const response = yield call(getConfigurationFieldsDataApi, action.payload);
    if (response.success === true) {
      yield put({
        type: GET_CONFIGURATION_FIELD_VALUE_SUCCESSED,
        data: response,
      });
    } else {
      yield put({ type: GET_CONFIGURATION_FIELD_VALUE_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: GET_CONFIGURATION_FIELD_VALUE_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* checkIsMultiConfig(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(checkIsMultiConfigApi, action.payload);
    if (response.success === true) {
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: response?.data[1],
          feedbackType: 'success',
          module: 'Apps',
        },
      });
      yield put({ type: CHECK_IS_MULTI_CONFIG_SUCCESSED, data: response });
    } else {
      yield put({ type: CHECK_IS_MULTI_CONFIG_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: CHECK_IS_MULTI_CONFIG_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* getVendorsList(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(getApplicationVendorListApi, action.payload);
    if (response.success === true) {
      yield put({
        type: GET_APPLICATION_VENDOR_LIST_SUCCESSED,
        data: response,
      });
    } else {
      yield put({ type: GET_APPLICATION_VENDOR_LIST_FAILED, data: null });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({
      type: GET_APPLICATION_VENDOR_LIST_FAILED,
      data: err?.response?.data?.data,
    });
    // yield put({ type: HIDE_LOADER });
  }
}

export function* getPublishersList(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(
      getApplicationPublishersListApi,
      action.payload
    );
    if (response.success === true) {
      yield put({
        type: GET_APPLICATION_PUBLISHERS_LIST_SUCCESSED,
        data: response,
      });
    } else {
      yield put({ type: GET_APPLICATION_PUBLISHERS_LIST_FAILED, data: null });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({
      type: GET_APPLICATION_PUBLISHERS_LIST_FAILED,
      data: err?.response?.data?.data,
    });
    // yield put({ type: HIDE_LOADER });
  }
}

export function* getTypeList(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(getApplicationTypeListApi, action.payload);
    if (response.success === true) {
      yield put({ type: GET_APPLICATION_TYPE_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: GET_APPLICATION_TYPE_LIST_FAILED, data: null });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({
      type: GET_APPLICATION_TYPE_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* getRateLimitList(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(getApplicationRateLimitApi, action.payload);
    if (response.success === true) {
      yield put({ type: GET_APPLICATION_RATE_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: GET_APPLICATION_RATE_LIST_FAILED, data: null });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({
      type: GET_APPLICATION_RATE_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* createApplication(action) {
  try {
    const response = yield call(createApplicationApi, action.payload);
    if (response.success === true) {
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Application Created Successfully!',
          feedbackType: 'success',
          module: 'Apps',
        },
      });
      yield put({ type: CREATE_APPLICATION_SUCCESSED, data: response });
    } else {
      yield put({ type: CREATE_APPLICATION_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: CREATE_APPLICATION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* updateApplication(action) {
  try {
    const response = yield call(updateApplicationApi, action.payload);
    if (response.success === true) {
      yield put({ type: UPDATE_APPLICATION_SUCCESSED, data: response });
    } else {
      yield put({ type: UPDATE_APPLICATION_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: UPDATE_APPLICATION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* getApprovalFlowList(action) {
  try {
    const response = yield call(getApprovalFlowListApi, action.payload);
    if (response.success === true) {
      yield put({ type: GET_APPROVAL_FLOW_LIST_SUCCESSED, data: response });
        yield put({ type: HIDE_LOADER });
    } else {
      yield put({ type: GET_APPROVAL_FLOW_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: GET_APPROVAL_FLOW_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* getPrimaryApproversList(action) {
  try {
    const response = yield call(getPrimaryListApi, action.payload);
    if (response.success === true) {
      yield put({ type: GET_PRIMARY_APPROVERS_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: GET_PRIMARY_APPROVERS_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: GET_PRIMARY_APPROVERS_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* updateApprovalWorkFlowDetails(action) {
  try {
    const response = yield call(
      udpateApprovalWorkFlowDetailsApi,
      action.payload
    );
    if (response.success === true) {
      yield put({
        type: UPDATE_APPROVAL_WORKFLOW_DETAILS_SUCCESSED,
        data: response,
      });
      const msg = `Workflows Update Successfully`;
      yield put(getApprovalFlowListRequested({ queryItem: action.query }));
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'Ap',
        },
      });
    } else {
      yield put({ type: UPDATE_APPROVAL_WORKFLOW_DETAILS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: UPDATE_APPROVAL_WORKFLOW_DETAILS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* deleteApprovalWorkFlow(action) {
  try {
    const response = yield call(deleteWorkFlowApi, action.payload);
    if (response.success === true) {
      yield put({ type: DELETE_APPROVAL_WORKFLOW_SUCCESSED, data: response });
      const msg = `Workflows Delete Successfully`;
      yield put(getApprovalFlowListRequested({ queryItem: action.query }));
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: response?.data?.message || msg,
          feedbackType: 'success',
          module: 'Ap',
        },
      });
    } else {
      yield put({ type: DELETE_APPROVAL_WORKFLOW_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: DELETE_APPROVAL_WORKFLOW_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* createApproval(action) {
  try {
    const response = yield call(createApprovalWorkFlowApi, action.payload);
    if (response.success === true) {
      yield put({
        type: CREATE_APPROVAL_WORKFLOW_DETAILS_SUCCESSED,
        data: response,
      });
      const msg = `Workflows Create Successfully`;
      yield put(getApprovalFlowListRequested({ queryItem: action.query }));
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: response?.data[1] || msg,
          feedbackType: 'success',
          module: 'Ap',
        },
      });
    } else {
      yield put({ type: CREATE_APPROVAL_WORKFLOW_DETAILS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: CREATE_APPROVAL_WORKFLOW_DETAILS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* getAppActionDetails(action) {
  try {
    const response = yield call(getActionApi, action.payload);
    if (response.success === true) {
      yield put({
        type: GET_APPS_ACTION_DETAILS_SUCCESSED,
        data: response,
      });
    } else {
      yield put({ type: GET_APPS_ACTION_DETAILS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: GET_APPS_ACTION_DETAILS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* getAppActionWorkFlowDetails(action) {
  try {
    const response = yield call(getActionWorkFlowApi);
    if (response.success === true) {
      yield put({
        type: GET_APPS_ACTION_WORKFLOW_SUCCESSED,
        data: response,
      });
    } else {
      yield put({ type: GET_APPS_ACTION_WORKFLOW_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: GET_APPS_ACTION_WORKFLOW_FAILED,
      data: err?.response?.data?.data,
    });
  }
}
export function* configDetails(action) {
  try {
    const response = yield call(getAppsConfigsApi, action.payload);
    if (response.success === true) {
      yield put({
        type: APP_CONFIG_SUCCESSED,
        data: response,
      });
    } else {
      yield put({ type: APP_CONFIG_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: APP_CONFIG_FAILED,
      data: err?.response?.data?.data,
    });
  }
}
export function* addConfigDetails(action) {
  try {
    const response = yield call(appConfigAdd, action.id, action.payload);
    if (response.success === true) {
      yield put({
        type: APP_CONFIG_ADD_SUCCESSED,
        data: response,
      });
      yield put(getAppsDetailsRequested({ queryItem: action.query }))
    } else {
      yield put({ type: APP_CONFIG_ADD_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: APP_CONFIG_ADD_FAILED,
      data: err?.response?.data?.data,
    });
  }
}
export function* updateWorkFlow(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(updateActionWorkFlowApi, action.payload);
    if (response.success === true) {
      yield put({
        type: UPDATE_APPS_ACTION_WORKFLOW_UPGRADE_LIST,
        data: action.payload,
      });
      yield put({
        type: UPDATE_APPS_ACTION_WORKFLOW_SUCCESSED,
        data: response,
      });
    } else {
      yield put({ type: UPDATE_APPS_ACTION_WORKFLOW_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: UPDATE_APPS_ACTION_WORKFLOW_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* updateMultiConfigDetails(action) {
  try {
    const response = yield call(updateMultiDataPopupDetailsApi, action.payload);
    if (response) {
      const appResponse = yield call(
        applicationSaga,
        action.payload.updatedData
      );
      if (appResponse.success === true) {
        yield put({ type: GET_APPS_DETAILS_SUCCESSED, data: appResponse });
      } else {
        yield put({ type: GET_APPS_DETAILS_FAILED, data: null });
      }
      yield put({
        type: UPDATE_MULTI_CONFIGURATION_FILEDS_DETAILS_SUCCESSED,
        data: response,
      });
    } else {
      yield put({
        type: UPDATE_MULTI_CONFIGURATION_FILEDS_DETAILS_FAILED,
        data: null,
      });
    }
  } catch (err) {
    yield put({
      type: UPDATE_MULTI_CONFIGURATION_FILEDS_DETAILS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* deleteApplication(action) {
  try {
    const response = yield call(deleteApplicationApi, action.payload);
    if (response) {
      yield put({
        type: DELETE_APPLICATION_SUCCESSED,
        data: response,
      });
      yield put(getAppsDetailsRequested({ queryItem: action.query }))
    } else {
      yield put({
        type: DELETE_APPLICATION_FAILED,
        data: null,
      });
    }
  } catch (err) {
    yield put({
      type: DELETE_APPLICATION_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export default function* apps() {
  yield takeLatest(GET_APPS_DETAILS_REQUESTED, getAppsDetails);
  yield takeLatest(GET_APPS_ACTION_DETAILS_REQUESTED, getAppActionDetails);
  yield takeLatest(UPDATE_APPS_ACTION_WORKFLOW_REQUESTED, updateWorkFlow);
  yield takeLatest(
    GET_APPS_ACTION_WORKFLOW_REQUESTED,
    getAppActionWorkFlowDetails
  );
  yield takeLatest(
    UPDATE_APPLICATION_DETAILS_REQUESTED,
    updateApplicationDetails
  );
  yield takeLatest(
    UPDATE_APPLICATION_STATUS_REQUESTED,
    updateApplicationStatus
  );
  yield takeLatest(
    GET_CONFIGURATION_DETAILS_REQUESTED,
    getConfigurationDetails
  );
  yield takeLatest(
    GET_CONFIGURATION_FIELD_VALUE_REQUESTED,
    getConfigurationFieldsData
  );
  yield takeLatest(
    UPDATE_CONFIGURATION_FILEDS_DETAILS_REQUESTED,
    updateConfigDetails
  );
  yield takeLatest(
    UPDATE_MULTI_CONFIGURATION_FILEDS_DETAILS_REQUESTED,
    updateMultiConfigDetails
  );
  yield takeLatest(CHECK_IS_MULTI_CONFIG_REQUESTED, checkIsMultiConfig);
  yield takeLatest(GET_APPLICATION_VENDOR_LIST_REQUESTED, getVendorsList);
  yield takeLatest(
    GET_APPLICATION_PUBLISHERS_LIST_REQUESTED,
    getPublishersList
  );
  yield takeLatest(GET_APPLICATION_TYPE_LIST_REQUESTED, getTypeList);
  yield takeLatest(GET_APPLICATION_RATE_LIST_REQUESTED, getRateLimitList);
  yield takeLatest(CREATE_APPLICATION_REQUESTED, createApplication);
  yield takeLatest(UPDATE_APPLICATION_REQUESTED, updateApplication);
  yield takeLatest(GET_APPROVAL_FLOW_LIST_REQUESTED, getApprovalFlowList);
  yield takeLatest(
    GET_PRIMARY_APPROVERS_LIST_REQUESTED,
    getPrimaryApproversList
  );
  yield takeLatest(
    UPDATE_APPROVAL_WORKFLOW_DETAILS_REQUESTED,
    updateApprovalWorkFlowDetails
  );
  yield takeLatest(DELETE_APPROVAL_WORKFLOW_REQUESTED, deleteApprovalWorkFlow);
  yield takeLatest(CREATE_APPROVAL_WORKFLOW_DETAILS_REQUESTED, createApproval);
  yield takeLatest(DELETE_APPLICATION_REQUESTED, deleteApplication);
  yield takeLatest(APP_CONFIG_REQUESTED, configDetails)
  yield takeLatest(APP_CONFIG_ADD_REQUESTED, addConfigDetails)
}