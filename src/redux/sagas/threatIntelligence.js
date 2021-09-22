import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  THREAT_INTELLIGENCE_LIST_SUCCESSED,
  THREAT_INTELLIGENCE_LIST_FAILED,
  THREAT_INTELLIGENCE_LIST_REQUESTED,
  THREAT_INTELLIGENCE_DETAILS_LIST_FAILED,
  THREAT_INTELLIGENCE_DETAILS_LIST_SUCCESSED,
  THREAT_INTELLIGENCE_DETAILS_LIST_REQUESTED,
  //   FILTERED_CASES_SUCCESSED,
  //   FILTERED_CASES_FAILED,
  DELETE_THREAT_INTELLIGENCE_REQUESTED,
  DELETE_THREAT_INTELLIGENCE_SUCCESSED,
  DELETE_THREAT_INTELLIGENCE_FAILED,
  THREAT_INTELLIGENCE_CATEGORIES_REQUESTED,
  THREAT_INTELLIGENCE_CATEGORIES_SUCCESSED,
  THREAT_INTELLIGENCE_CATEGORIES_FAILED,
  SHOW_LOADER,
  HIDE_LOADER,
  THREAT_INTELLIGENCE_SEVERITY_REQUESTED,
  THREAT_INTELLIGENCE_SEVERITY_SUCCESSED,
  THREAT_INTELLIGENCE_SEVERITY_FAILED,
  THREAT_INTELLIGENCE_ASSET_REQUESTED,
  THREAT_INTELLIGENCE_ASSET_SUCCESSED,
  THREAT_INTELLIGENCE_ASSET_FAILED,
  THREAT_INTELLIGENCE_DEPARTMENTS_REQUESTED,
  THREAT_INTELLIGENCE_DEPARTMENTS_SUCCESSED,
  THREAT_INTELLIGENCE_DEPARTMENTS_FAILED,
  THREAT_INTELLIGENCE_EVIDENCE_REQUESTED,
  THREAT_INTELLIGENCE_EVIDENCE_SUCCESSED,
  THREAT_INTELLIGENCE_EVIDENCE_FAILED,
  THREAT_INTELLIGENCE_DISPOSITION_FAILED,
  THREAT_INTELLIGENCE_DISPOSITION_SUCCESSED,
  THREAT_INTELLIGENCE_DISPOSITION_REQUESTED,
  THREAT_INTELLIGENCE_PRODUCTS_FAILED,
  THREAT_INTELLIGENCE_PRODUCTS_SUCCESSED,
  THREAT_INTELLIGENCE_PRODUCTS_REQUESTED,
  THREAT_INTELLIGENCE_ADVISORY_VENDORS_REQUESTED,
  THREAT_INTELLIGENCE_ADVISORY_VENDORS_SUCCESSED,
  THREAT_INTELLIGENCE_ADVISORY_VENDORS_FAILED,
  THREAT_INTELLIGENCE_EXPORT_PDF_REQUESTED,
  THREAT_INTELLIGENCE_EXPORT_PDF_SUCCESSED,
  THREAT_INTELLIGENCE_EXPORT_PDF_FAILED,
  GET_PRODUCT_LIST_REQUESTED,
  GET_PRODUCT_LIST_SUCCESSED,
  GET_PRODUCT_LIST_FAILED,
  UPDATE_ADVERSORY_DETAILS_SUCCESSED,
  UPDATE_ADVERSORY_DETAILS_FAILED,
  UPDATE_ADVERSORY_DETAILS_PROCESSING,
  UPDATE_ADVERSORY_DETAILS_REQUESTED,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_REQUESTED,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_SUCCESSED,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_FAILED,
  GET_RUN_PLAY_BOOK_DATA_REQUESTED,
  GET_RUN_PLAY_BOOK_DATA_SUCCESSED,
  GET_RUN_PLAY_BOOK_DATA_FAILED,
  THREAT_INTELLIGENCE_CREATE_ADVISORY_REQUESTED,
  THREAT_INTELLIGENCE_CREATE_ADVISORY_FAILED,
  THREAT_INTELLIGENCE_CREATE_ADVISORY_SUCCESSED,
  EXECUTE_PLAY_BOOK_SUCCESSED,
  EXECUTE_PLAY_BOOK_FAILED,
  EXECUTE_PLAY_BOOK_REQUESTED,
  GET_USER_EMAILS_LIST_REQUESTED,
  GET_USER_EMAILS_LIST_SUCCESSED,
  GET_USER_EMAILS_LIST_FAILED,
  SEND_EMAIL_REQUESTED,
  SEND_EMAIL_SUCCESSED,
  SEND_EMAIL_FAILED,
  ADVISORY_SOURCE_FAILED,
  ADVISORY_SOURCE_REQUESTED,
  ADVISORY_SOURCE_SUCCESSED,
  CASES_ADVISORY_LOCATIONS_SUCCESSED,
  CASES_ADVISORY_LOCATIONS_FAILED,
  CASES_ADVISORY_LOCATIONS_REQUESTED,
  OPEN_CASES_REQUESTED,
  OPEN_CASES_FAILED,
  OPEN_CASES_SUCCESSED,
  UPDATE_ARTIFACT_REQUESTED,
  UPDATE_ARTIFACT_SUCCESSED,
  UPDATE_ARTIFACT_FAILED,
  EXECUTE_ACTION_REQUESTED,
  EXECUTE_ACTION_SUCCESSED,
  EXECUTE_ACTION_FAILED,
  MULTI_CONFIG_EXECUTION_REQUESTED,
  MULTI_CONFIG_EXECUTION_SUCCESSED,
  MULTI_CONFIG_EXECUTION_FAILED,
  ADVISORY_ADD_EVIDENCE_REQUESTED,
  ADVISORY_ADD_EVIDENCE_PROCESSING,
  ADVISORY_ADD_EVIDENCE_SUCCESSED,
  ADVISORY_ADD_EVIDENCE_FAILED,



  OPEN_CASES_RESET,
  ADVISORY_ARTIFACT_RAW_DATA_SUCCESSED,
  ADVISORY_ARTIFACT_RAW_DATA_FAILED,
  ADVISORY_ARTIFACT_RAW_DATA_REQUESTED,
  THREAT_INTELLIGENCE_FEED_LIST_REQUESTED,
  THREAT_INTELLIGENCE_FEED_DELETE_REQUESTED,
  THREAT_INTELLIGENCE_FEED_LIST_SUCCESSED,
  THREAT_INTELLIGENCE_FEED_LIST_FAILED,
  THREAT_INTELLIGENCE_SEND_ADVISORY_SUCCESSED,
  THREAT_INTELLIGENCE_SEND_ADVISORY_FAILED,
  THREAT_INTELLIGENCE_SEND_ADVISORY_REQUESTED,
  SET_FEEDBACK_ALERT,
  BULK_UPDATE_REQUESTED,
  BULK_UPDATE_SUCCESSED,
  BULK_UPDATE_FAILED,
  UPDATE_DETAILS_ARTIFACT,
  ADVISORY_DETAILS_PARTIAL_UPDATE_SUCCESSED,
} from '../../constants/actionTypes';

import {
  threatIntelligenceSaga,
  threatIntelligenceDetailsSaga,
  deleteSaga,
  deleteFeed,
  sendAdviosry,
  threatIntelligenceCategorySaga,
  threatIntelligenceSeveritySaga,
  threatIntelligenceAssetSaga,
  threatIntelligenceDepartmentSaga,
  threatIntelligenceEvidencesaga,
  threatIntelligenceDispositionssaga,
  threatIntelligenceProductsaga,
  threatIntelligenceExportAsPDF,
  getProductDatails,
  updateAdvisoryDetails,
  updatePartialThreatIntelApi,
  getRunPlayBookDataApi,
  createAdvisory,
  executePlayBookAPI,
  getUserEmailListApi,
  sendEmailApi,
  threatIntelligenceVendors,
  threatIntelligenceSources,
  threatIntelligenceCasesAdvisoryLocation,
  threatIntelligenceOpenCaseSaga,
  updateArtifactsApi,
  executeActionApi,
  multiExecuteActionApi,
  addEvidenceSaga,
  rawDataSaga,
  bulkUpdateAPI,
} from '../../api/threatIntelligenceSaga';

import {
  threatIntelligenceDetail,
  threatIntelligenceStore,
} from '../../actions/threatIntelligence';
import { configConsumerProps } from 'antd/lib/config-provider';
import { ConsoleSqlOutlined } from '@ant-design/icons';

function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

export function* threatIntelligenceList(action) {
  try {
    const threatIntelligenceData = yield call(
      threatIntelligenceSaga,
      action.payload
    );

    if (threatIntelligenceData.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_LIST_SUCCESSED,
        data: threatIntelligenceData,
      });
        yield put({ type: HIDE_LOADER });
    } else {
      yield put({ type: THREAT_INTELLIGENCE_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: THREAT_INTELLIGENCE_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}
export function* watchthreatIntelligenceDetails(action) {
  try {
    yield put({ type: SHOW_LOADER });
    var isEdit= localStorage.getItem('isEdit');
    var cnt = false;
    while(window.location.pathname=="/threatIntelligence/details/"+action.payload && isEdit !=1){
    const response = yield call(threatIntelligenceDetailsSaga, action.payload);
    if (response.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_DETAILS_LIST_SUCCESSED,
        data: response,
      });
        if(cnt){
        yield call(delay, 5000);
        }
    } else {
      yield put({
        type: THREAT_INTELLIGENCE_DETAILS_LIST_FAILED,
        data: null,
      });
    }
      isEdit = localStorage.getItem('isEdit');
      cnt =true
    yield put({ type: HIDE_LOADER });
    }
    if(window.location.pathname.split('/')[1]=="threatIntelligence"){
      const response = yield call(threatIntelligenceDetailsSaga, action.payload);
      if (response.success === true) {
        yield put({
          type: THREAT_INTELLIGENCE_DETAILS_LIST_SUCCESSED,
          data: response,
        });
      } else {
        yield put({
          type: THREAT_INTELLIGENCE_DETAILS_LIST_FAILED,
          data: null,
        });
      }
      yield put({ type: HIDE_LOADER });
    }
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: THREAT_INTELLIGENCE_DETAILS_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

// export function* watchFilteredCasesList(action) {
//   try {
//     const filterData = yield call(filterSaga, action.pathString);

//     if (filterData.success === true) {
//       yield put({ type: FILTERED_CASES_SUCCESSED, data: filterData });
//     } else {
//       yield put({ type: FILTERED_CASES_FAILED, data: null });
//     }
//   } catch (err) {
//     yield put({ type: FILTERED_CASES_FAILED, data: err });
//   }
// }

export function* watchDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const deleteThreatIntelData = yield call(deleteSaga, action.id);

    if (deleteThreatIntelData.success === true) {
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Advisory deleted Successfully!',
          feedbackType: 'success',
          module: 'Threat_Intel',
        },
      });

      yield put({
        type: DELETE_THREAT_INTELLIGENCE_SUCCESSED,
        data: deleteThreatIntelData,
      });
      yield put(
        threatIntelligenceStore({ queryItem: action.query, path: action.path })
      );
    } else {
      yield put({ type: DELETE_THREAT_INTELLIGENCE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: DELETE_THREAT_INTELLIGENCE_FAILED,
      data: err?.response?.data?.data,
    });
  }
}
export function* watchFeedDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(deleteFeed, action.id);

    if (response.success === true) {
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Feed deleted Successfully!',
          feedbackType: 'success',
          module: 'Threat_Intel_Feed',
        },
      });

      yield put({
        type: THREAT_INTELLIGENCE_FEED_LIST_SUCCESSED,
        data: response?.data,
      });
      yield put(
        threatIntelligenceStore({ queryItem: action.query, path: action?.path })
      );
    } else {
      yield put({ type: THREAT_INTELLIGENCE_FEED_LIST_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: THREAT_INTELLIGENCE_FEED_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}
export function* wacthSendAdvisory(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(sendAdviosry, action.id);
    if (response.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_SEND_ADVISORY_SUCCESSED,
        data: response?.data,
      });
      yield put(
        threatIntelligenceStore({ queryItem: action.query, path: action?.path })
      );
    } else {
      yield put({ type: THREAT_INTELLIGENCE_SEND_ADVISORY_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: THREAT_INTELLIGENCE_SEND_ADVISORY_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchCategoryFilter(action) {
  try {
    const categoryData = yield call(threatIntelligenceCategorySaga, action.id);
    if (categoryData.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_CATEGORIES_SUCCESSED,
        data: categoryData?.data,
      });
    } else {
      yield put({ type: THREAT_INTELLIGENCE_CATEGORIES_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: THREAT_INTELLIGENCE_CATEGORIES_FAILED, data: err });
  }
}

export function* watchSeverityFilter(action) {
  try {
    const severityData = yield call(threatIntelligenceSeveritySaga, action.id);
    if (severityData.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_SEVERITY_SUCCESSED,
        data: severityData?.data,
      });
    } else {
      yield put({ type: THREAT_INTELLIGENCE_SEVERITY_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: THREAT_INTELLIGENCE_SEVERITY_FAILED, data: err });
  }
}
export function* watchSources() {
  try {
    const sourceData = yield call(threatIntelligenceSources);
    if (sourceData.success === true) {
      yield put({ type: ADVISORY_SOURCE_SUCCESSED, data: sourceData?.data });
    } else {
      yield put({ type: ADVISORY_SOURCE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ADVISORY_SOURCE_FAILED, data: err });
  }
}

export function* watchOpenCase(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(
      threatIntelligenceOpenCaseSaga,
      action.id,
      action.payload
    );
    if (response.success === true) {
      yield put({ type: OPEN_CASES_SUCCESSED, data: response?.data });
    } else {
      yield put({ type: OPEN_CASES_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: OPEN_CASES_FAILED, data: err });
  }
}

export function* watchAssetFilter(action) {
  try {
    const assetData = yield call(threatIntelligenceAssetSaga, action.id);
    if (assetData.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_ASSET_SUCCESSED,
        data: assetData?.data,
      });
    } else {
      yield put({ type: THREAT_INTELLIGENCE_ASSET_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: THREAT_INTELLIGENCE_ASSET_FAILED, data: err });
  }
}

export function* watchDepartmentsFilter(action) {
  try {
    const departmentData = yield call(
      threatIntelligenceDepartmentSaga,
      action.id
    );
    if (departmentData.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_DEPARTMENTS_SUCCESSED,
        data: departmentData?.data,
      });
    } else {
      yield put({ type: THREAT_INTELLIGENCE_DEPARTMENTS_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: THREAT_INTELLIGENCE_DEPARTMENTS_FAILED, data: err });
  }
}

export function* watchEvidence(action) {
  try {
    const EvidenceSaga = yield call(threatIntelligenceEvidencesaga);
    if (EvidenceSaga.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_EVIDENCE_SUCCESSED,
        data: EvidenceSaga?.data,
      });
    } else {
      yield put({ type: THREAT_INTELLIGENCE_EVIDENCE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: THREAT_INTELLIGENCE_EVIDENCE_FAILED, data: err });
  }
}

export function* watchDisposition() {
  try {
    const DispostionSaga = yield call(threatIntelligenceDispositionssaga);
    if (DispostionSaga.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_DISPOSITION_SUCCESSED,
        data: DispostionSaga?.data,
      });
    } else {
      yield put({ type: THREAT_INTELLIGENCE_DISPOSITION_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: THREAT_INTELLIGENCE_DISPOSITION_FAILED, data: err });
  }
}

export function* watchVendors() {
  try {
    const VendorSaga = yield call(threatIntelligenceVendors);
    if (VendorSaga.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_ADVISORY_VENDORS_SUCCESSED,
        data: VendorSaga?.data,
      });
    } else {
      yield put({
        type: THREAT_INTELLIGENCE_ADVISORY_VENDORS_FAILED,
        data: null,
      });
    }
  } catch (err) {
    yield put({ type: THREAT_INTELLIGENCE_ADVISORY_VENDORS_FAILED, data: err });
  }
}

export function* watchExportAsPDF(action) {
  try {
    // yield call(threatIntelligenceExportAsPDF, action.payload)
    yield put({ type: SHOW_LOADER });
    const response = yield call(threatIntelligenceExportAsPDF, action.payload);
    if (response.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_EXPORT_PDF_SUCCESSED,
        data: response?.data,
      });
    } else {
      yield put({ type: THREAT_INTELLIGENCE_EXPORT_PDF_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: THREAT_INTELLIGENCE_EXPORT_PDF_FAILED, data: err });
  }
}

export function* watchProduct() {
  try {
    const ProductSaga = yield call(threatIntelligenceProductsaga);
    if (ProductSaga.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_PRODUCTS_SUCCESSED,
        data: ProductSaga?.data,
      });
    } else {
      yield put({ type: THREAT_INTELLIGENCE_PRODUCTS_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: THREAT_INTELLIGENCE_PRODUCTS_FAILED, data: err });
  }
}

export function* watchCaseAdvisoryLocation() {
  try {
    const casesAdvisorylocation = yield call(
      threatIntelligenceCasesAdvisoryLocation
    );
    if (casesAdvisorylocation.success === true) {
      yield put({
        type: CASES_ADVISORY_LOCATIONS_SUCCESSED,
        data: casesAdvisorylocation?.data,
      });
    } else {
      yield put({ type: CASES_ADVISORY_LOCATIONS_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: CASES_ADVISORY_LOCATIONS_FAILED, data: err });
  }
}

export function* getProductDetails(data) {
  try {
    const response = yield call(getProductDatails, data);
    if (response.success === true) {
      yield put({ type: GET_PRODUCT_LIST_SUCCESSED, data: response?.data });
    } else {
      yield put({ type: GET_PRODUCT_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: GET_PRODUCT_LIST_FAILED, data: err });
  }
}



export function* getUpdateAdversoryDetails(action) {
  yield put({ type: SHOW_LOADER });
  try {
    const response = yield call(
      updateAdvisoryDetails,
      action.id,
      action.payload
    );
    if (response.success === true) {
      yield put({
        type: UPDATE_ADVERSORY_DETAILS_SUCCESSED,
        data: response?.data,
      });
      const msg = `Advisory Update Successfully`;
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'ThreatIntel',
        },
      });
      if (action?.isList) {
        yield put(
          threatIntelligenceStore({
            queryItem: action?.query,
            path: action?.path,
          })
        );
      } else {
        yield put(threatIntelligenceDetail(action?.id));
      }
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: "Something Went Wrong",
        feedbackType: 'error',
        module: 'ThreatIntel',
      },
    });
    yield put({ type: UPDATE_ADVERSORY_DETAILS_FAILED, data: err });
  }
}

export function* watchUpdatePartialThreatIntel(action) {
  try {
    const response = yield call(updatePartialThreatIntelApi, action?.payload);
    if (response.success === true) {
      const key = Object.keys(action?.payload.data);
      const label = key.find((item) => item === "adv_asset_or_type")
      yield put({
        type: ADVISORY_DETAILS_PARTIAL_UPDATE_SUCCESSED,
        data: action?.payload?.data,
        label: label || "",
        response: response?.data
      });
      yield put({
        type: UPDATE_PARTIAL_THREAT_INTELLIGENCE_SUCCESSED,
        data: response?.data,
      });
      const msg = `Advisory Updated`;
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'ThreatIntel',
        },
      });
    } else {
      yield put({
        type: UPDATE_PARTIAL_THREAT_INTELLIGENCE_FAILED,
        data: null,
      });
    }
  } catch (err) {
    console.log(">>>err", { err })
    yield put({ type: UPDATE_PARTIAL_THREAT_INTELLIGENCE_FAILED, data: err });
  }
}

export function* watchCreateAdversory(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(createAdvisory, action.payload);
    if (response.success === true) {
      yield put({
        type: THREAT_INTELLIGENCE_CREATE_ADVISORY_SUCCESSED,
        data: response?.data,
      });
      const msg = response.data[1] || `Advisory Created Successfully`;
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'ThreatIntel',
        },
      });
      if (action.path === 'pending' || action.path === 'release') {
        yield put(threatIntelligenceStore({ queryItem: action.query }));
      }
    } else {
      yield put({
        type: THREAT_INTELLIGENCE_CREATE_ADVISORY_FAILED,
        data: null,
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: THREAT_INTELLIGENCE_CREATE_ADVISORY_FAILED, data: err });
  }
}
export function* getRunPlayBookData(data) {
  try {
    const response = yield call(getRunPlayBookDataApi, data);
    if (response.success === true) {
      yield put({
        type: GET_RUN_PLAY_BOOK_DATA_SUCCESSED,
        data: response?.data,
      });
    } else {
      yield put({ type: GET_RUN_PLAY_BOOK_DATA_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: GET_RUN_PLAY_BOOK_DATA_FAILED, data: err });
  }
}

export function* executePlayBook(data) {
  try {
    const response = yield call(executePlayBookAPI, data);
    if (response.success === true) {
      yield put({ type: EXECUTE_PLAY_BOOK_SUCCESSED, data: response?.data });
    } else {
      yield put({ type: EXECUTE_PLAY_BOOK_FAILED, data: null });
    }

    if (data?.payload?.callback) {
      data.payload.callback();
    }

    const msg = `Playbook "${data?.payload?.playbookName}" executed!`;

    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: msg,
        feedbackType: 'success',
        module: 'playbookAction',
      },
    });
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: EXECUTE_PLAY_BOOK_FAILED, data: err });
    if (data?.payload?.callback) {
      data.payload.callback();
    }
  }
}

export function* getUserEmailsList(data) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(getUserEmailListApi, data);
    if (response.success === true) {
      yield put({ type: GET_USER_EMAILS_LIST_SUCCESSED, data: response?.data });
    } else {
      yield put({ type: GET_USER_EMAILS_LIST_FAILED, data: null });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({ type: GET_USER_EMAILS_LIST_FAILED, data: err });
  }
}

export function* sendEmail(data) {
  try {
    const response = yield call(sendEmailApi, data);
    if (response.success === true) {
      yield put({ type: SEND_EMAIL_SUCCESSED, data: response?.data });
    } else {
      yield put({ type: SEND_EMAIL_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: SEND_EMAIL_FAILED, data: err });
  }
}

export function* updateArtifacts(data) {
  try {
    const alertType = data?.payload?.type
    const response = yield call(updateArtifactsApi, data);
    if (response.success === true) {
      yield put({ type: UPDATE_DETAILS_ARTIFACT, data: response?.data });
      yield put({ type: UPDATE_ARTIFACT_SUCCESSED, data: response?.data });
      let msg = 'Artifact added.';
      if (alertType === 'delete') {
        msg = 'Artifact deleted.';
      }
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'ThreatIntel',
        },
      });
    } else {
      yield put({ type: UPDATE_ARTIFACT_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: UPDATE_ARTIFACT_FAILED, data: err });
  }
}

export function* executeAction(data) {
  try {
    const response = yield call(executeActionApi, data);
    if (response.success === true) {
      yield put({ type: EXECUTE_ACTION_SUCCESSED, data: response?.data });
    } else {
      yield put({ type: EXECUTE_ACTION_FAILED, data: null });
    }
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Action has been scheduled.',
        feedbackType: 'success',
        module: 'ThreatIntel',
      },
    });
  } catch (err) {
    yield put({ type: EXECUTE_ACTION_FAILED, data: err });
  }
}

export function* rawOutput(action) {
  try {
    const response = yield call(rawDataSaga, action?.payload);
    if (response.success === true) {
      yield put({
        type: ADVISORY_ARTIFACT_RAW_DATA_SUCCESSED,
        data: response?.data,
      });
    } else {
      yield put({ type: ADVISORY_ARTIFACT_RAW_DATA_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ADVISORY_ARTIFACT_RAW_DATA_FAILED, data: err });
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
        type: ADVISORY_ADD_EVIDENCE_SUCCESSED,
        data: response?.data,
      });
    } else {
      yield put({ type: ADVISORY_ADD_EVIDENCE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: ADVISORY_ADD_EVIDENCE_FAILED, data: err });
  }
}
export function* multiConfigExecuteAction(data) {
  try {
    const response = yield call(multiExecuteActionApi, data);
    if (response.success === true) {
      yield put({
        type: MULTI_CONFIG_EXECUTION_SUCCESSED,
        data: response?.data,
      });
    } else {
      yield put({ type: MULTI_CONFIG_EXECUTION_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: MULTI_CONFIG_EXECUTION_FAILED, data: err });
  }
}
export function* addBulkUpdate(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(bulkUpdateAPI, action.payload);
    if (response.success === true) {
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Records updated successfully',
          feedbackType: 'success',
          module: 'ThreatIntel',
        },
      });
      yield put({
        type: BULK_UPDATE_SUCCESSED,
        data: response?.data,
      });
      yield put(
        threatIntelligenceStore({ queryItem: action.query, path: action.path })
      );
    } else {
      yield put({ type: BULK_UPDATE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: BULK_UPDATE_FAILED, data: err });
  }
}
export default function* watcher() {
  yield takeLatest(THREAT_INTELLIGENCE_LIST_REQUESTED, threatIntelligenceList);
  yield takeLatest(
    THREAT_INTELLIGENCE_DETAILS_LIST_REQUESTED,
    watchthreatIntelligenceDetails
  );
  yield takeLatest(
    THREAT_INTELLIGENCE_SEND_ADVISORY_REQUESTED,
    wacthSendAdvisory
  );
  yield takeLatest(DELETE_THREAT_INTELLIGENCE_REQUESTED, watchDelete);
  yield takeLatest(THREAT_INTELLIGENCE_FEED_DELETE_REQUESTED, watchFeedDelete);
  yield takeLatest(
    THREAT_INTELLIGENCE_CATEGORIES_REQUESTED,
    watchCategoryFilter
  );
  yield takeLatest(THREAT_INTELLIGENCE_SEVERITY_REQUESTED, watchSeverityFilter);
  yield takeLatest(THREAT_INTELLIGENCE_ASSET_REQUESTED, watchAssetFilter);
  yield takeLatest(
    THREAT_INTELLIGENCE_DEPARTMENTS_REQUESTED,
    watchDepartmentsFilter
  );
  yield takeLatest(THREAT_INTELLIGENCE_EVIDENCE_REQUESTED, watchEvidence);
  yield takeLatest(THREAT_INTELLIGENCE_DISPOSITION_REQUESTED, watchDisposition);
  yield takeLatest(THREAT_INTELLIGENCE_PRODUCTS_REQUESTED, watchProduct);
  yield takeLatest(
    THREAT_INTELLIGENCE_ADVISORY_VENDORS_REQUESTED,
    watchVendors
  );
  yield takeLatest(THREAT_INTELLIGENCE_EXPORT_PDF_REQUESTED, watchExportAsPDF);
  yield takeLatest(GET_PRODUCT_LIST_REQUESTED, getProductDetails);
  yield takeLatest(GET_PRODUCT_LIST_REQUESTED, getProductDetails);
  yield takeLatest(
    UPDATE_ADVERSORY_DETAILS_REQUESTED,
    getUpdateAdversoryDetails
  );
  yield takeLatest(GET_RUN_PLAY_BOOK_DATA_REQUESTED, getRunPlayBookData);
  yield takeLatest(
    THREAT_INTELLIGENCE_CREATE_ADVISORY_REQUESTED,
    watchCreateAdversory
  );
  yield takeLatest(
    UPDATE_PARTIAL_THREAT_INTELLIGENCE_REQUESTED,
    watchUpdatePartialThreatIntel
  );
  yield takeLatest(EXECUTE_PLAY_BOOK_REQUESTED, executePlayBook);
  yield takeLatest(GET_USER_EMAILS_LIST_REQUESTED, getUserEmailsList);
  yield takeLatest(SEND_EMAIL_REQUESTED, sendEmail);
  yield takeLatest(ADVISORY_SOURCE_REQUESTED, watchSources);
  yield takeLatest(
    CASES_ADVISORY_LOCATIONS_REQUESTED,
    watchCaseAdvisoryLocation
  );
  yield takeLatest(OPEN_CASES_REQUESTED, watchOpenCase);
  yield takeLatest(UPDATE_ARTIFACT_REQUESTED, updateArtifacts);
  yield takeLatest(EXECUTE_ACTION_REQUESTED, executeAction);
  yield takeLatest(MULTI_CONFIG_EXECUTION_REQUESTED, multiConfigExecuteAction);
  yield takeLatest(ADVISORY_ARTIFACT_RAW_DATA_REQUESTED, rawOutput);
  yield takeEvery(ADVISORY_ADD_EVIDENCE_REQUESTED, AddEvidence);
  yield takeLatest(BULK_UPDATE_REQUESTED, addBulkUpdate);
}
