// import * as downloadjs from 'downloadjs';
import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  CASE_DETAILS_REQUESTED,
  CASE_DETAILS_SUCCESSED,
  CASE_DETAILS_FAILED,
  CASE_MANAGEMENT_EDIT_REQUESTED,
  CASE_MANAGEMENT_EDIT_SUCCESSED,
  CASE_MANAGEMENT_EDIT_FAILED,
  CASE_MANAGEMENT_CREATE_REQUESTED,
  CASE_MANAGEMENT_CREATE_SUCCESSED,
  CASE_MANAGEMENT_CREATE_FAILED,
  CASE_EXPORT_PDF_LIST_REQUESTED,
  CASE_EXPORT_PDF_LIST_SUCCESSED,
  CASE_EXPORT_PDF_LIST_FAILED,
  CASE_SEND_EMAIL_REQUESTED,
  CASE_SEND_EMAIL_SUCCESSED,
  CASE_SEND_EMAIL_FAILED,
  CASE_POST_COMMENT_SUCCESSED,
  CASE_POST_COMMENT_FAILED,
  CASE_POST_COMMENT_REQUESTED,
  SHOW_LOADER,
  HIDE_LOADER,
  CASE_ASSET_DELETE_SUCCESSED,
  CASE_ASSET_DELETE_FAILED,
  CASE_ASSET_DELETE_REQUESTED,
  SET_FEEDBACK_ALERT,
} from '../../constants/actionTypes';
import {
  caseDetailsSaga,
  exportPdf,
  sendEmailSaga,
  createSaga,
  editCaseSaga,
  postComment,
  deleteCaseAsset,
} from '../../api/caseManagementSaga';

const moduleName = 'caseModule';


function delay(duration) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}

export function* watchCaseDetails(action) {
  try {
  
    yield put({ type: SHOW_LOADER });
    var isEdit= localStorage.getItem('isEdit');
    var cnt = false;
    while(window.location.pathname=="/cases/details/"+action.id && isEdit !=1){
    const response = yield call(caseDetailsSaga, action.id);
    if (response.success === true) {
      yield put({ type: CASE_DETAILS_SUCCESSED, data: response });
        if(cnt){
        yield call(delay, 5000);
        }
    } else {
      yield put({ type: CASE_DETAILS_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
      isEdit = localStorage.getItem('isEdit');
      cnt =true;
    }
    if(window.location.pathname.split('/')[1]=="cases"){
      const response = yield call(caseDetailsSaga, action.id);
      if (response.success === true) {
        yield put({ type: CASE_DETAILS_SUCCESSED, data: response });
      } else {
        yield put({ type: CASE_DETAILS_FAILED, data: null });
      }
      yield put({ type: HIDE_LOADER });
    }

  } catch (err) {
  
    yield put({
      type: CASE_DETAILS_FAILED,
      // data: err?.response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  }
}

export function* watchCreate(action) {
  try {
    const response = yield call(createSaga, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_MANAGEMENT_CREATE_SUCCESSED, data: response });
    } else {
      yield put({ type: CASE_MANAGEMENT_CREATE_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: CASE_MANAGEMENT_CREATE_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchEdit(action) {
  try {
    console.log({ payload___: action.payload });

    yield put({ type: SHOW_LOADER });

    const response = yield call(editCaseSaga, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_MANAGEMENT_EDIT_SUCCESSED, data: response });
    } else {
      yield put({ type: CASE_MANAGEMENT_EDIT_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Case updated.',
        feedbackType: 'success',
        module: moduleName,
      },
    });
    if (action.payload?.callback) {
      action.payload.callback(response?.data);
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: CASE_MANAGEMENT_EDIT_FAILED,
      data: err?.response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  }
}

export function* watchPdfExport(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(exportPdf, action?.payload);
    if (response.success === true) {
      yield put({ type: CASE_EXPORT_PDF_LIST_SUCCESSED, data: response });
      // downloadjs.download(response.data, 'export.pdf', 'application/pdf');
    } else {
      yield put({ type: CASE_EXPORT_PDF_LIST_FAILED, data: null });
    }
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'PDF downloaded.',
        feedbackType: 'success',
        module: moduleName,
      },
    });
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    console.log(err);
    yield put({ type: HIDE_LOADER });

    yield put({
      type: CASE_EXPORT_PDF_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchSendEmail(action) {
  try {
    const response = yield call(sendEmailSaga, action.payload);

    if (response.success === true) {
      yield put({ type: CASE_SEND_EMAIL_SUCCESSED, data: response });
    } else {
      yield put({ type: CASE_SEND_EMAIL_FAILED, data: null });
    }
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Mail sent.',
        feedbackType: 'success',
        module: moduleName,
      },
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: CASE_SEND_EMAIL_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchPostComment(action) {
  try {
    const response = yield call(postComment, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_POST_COMMENT_SUCCESSED, data: response });
    } else {
      yield put({ type: CASE_POST_COMMENT_FAILED, data: null });
    }
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Comment added.',
        feedbackType: 'success',
        module: moduleName,
      },
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: CASE_POST_COMMENT_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchDeleteAsset(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(deleteCaseAsset, action.payload);
    if (response.success === true) {
      yield put({ type: CASE_ASSET_DELETE_SUCCESSED, data: response });
    } else {
      yield put({ type: CASE_ASSET_DELETE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Asset deleted.',
        feedbackType: 'success',
        module: moduleName,
      },
    });
  } catch (err) {
    console.log({ err });
    yield put({ type: HIDE_LOADER });

    yield put({
      type: CASE_ASSET_DELETE_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export default function* watcher() {
  yield takeLatest(CASE_DETAILS_REQUESTED, watchCaseDetails);
  yield takeLatest(CASE_MANAGEMENT_CREATE_REQUESTED, watchCreate);
  yield takeLatest(CASE_MANAGEMENT_EDIT_REQUESTED, watchEdit);

  yield takeLatest(CASE_EXPORT_PDF_LIST_REQUESTED, watchPdfExport);
  yield takeLatest(CASE_SEND_EMAIL_REQUESTED, watchSendEmail);
  yield takeLatest(CASE_POST_COMMENT_REQUESTED, watchPostComment);
  yield takeLatest(CASE_ASSET_DELETE_REQUESTED, watchDeleteAsset);
}
