import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  USER_PROFILE_SUCCESSED,
  USER_PROFILE_FAILED,
  USER_PROFILE_REQUESTED,
  USER_PROFILE_UPDATE_SUCCESSED,
  USER_PROFILE_UPDATE_FAILED,
  USER_PROFILE_UPDATE_REQUESTED,
  USER_CHANGE_PASSWORD_SUCCESSED,
  USER_CHANGE_PASSWORD_FAILED,
  USER_CHANGE_PASSWORD_REQUESTED,
  USER_GOOGLE_QR_REQUESTED,
  USER_GOOGLE_QR_PROCESSING,
  USER_GOOGLE_QR_SUCCESSED,
  USER_GOOGLE_QR_FAILED,
  USER_GOOGLE_AUTH_REQUESTED,
  USER_GOOGLE_AUTH_PROCESSING,
  USER_GOOGLE_AUTH_SUCCESSED,
  USER_GOOGLE_AUTH_FAILED,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../../constants/actionTypes';
import {
  userChangePasswordSaga,
  userProfileSaga,
  userProfileUpdateSaga,
  getGoogleQrCodeSaga,
  googleAuthProfileSaga,
} from '../../api/userSaga';

export function* watchUserProfileList(action) {
  try {
     yield put({type: SHOW_LOADER});
    const response = yield call(userProfileSaga);
    if (response.success === true) {
      yield put({ type: USER_PROFILE_SUCCESSED, data: response });
      localStorage.setItem('profileFetched', 1);
    } else {
      yield put({ type: USER_PROFILE_FAILED, data: null });
    }
  if (!action.isDashbord) {
    yield put({type: HIDE_LOADER});
    }
  } catch (err) {
    yield put({ type: USER_PROFILE_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchGetGoogleQr(action) {
  try {
    const response = yield call(getGoogleQrCodeSaga);
    if (response.success === true) {
      console.log({ response });
      yield put({ type: USER_GOOGLE_QR_SUCCESSED, data: response });
    } else {
      yield put({ type: USER_GOOGLE_QR_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: USER_GOOGLE_QR_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchChangePassword(action) {
  try {
    const response = yield call(userChangePasswordSaga, action.payload);
    if (response.success === true) {
      yield put({ type: USER_CHANGE_PASSWORD_SUCCESSED, data: response });
    } else {
      yield put({ type: USER_CHANGE_PASSWORD_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: USER_CHANGE_PASSWORD_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchGoogleAuthProfile(action) {
  try {
    const response = yield call(googleAuthProfileSaga, action.payload);
    if (response.success === true) {
      console.log({ response });
      yield put({ type: USER_GOOGLE_AUTH_SUCCESSED, data: response });
    } else {
      yield put({ type: USER_GOOGLE_AUTH_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: USER_GOOGLE_AUTH_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchUserProfileUpdate(action) {
  try {
    const response = yield call(userProfileUpdateSaga, action.payload);
    if (response.success === true) {
      console.log({ response });
      yield put({ type: USER_PROFILE_UPDATE_SUCCESSED, data: response });
    } else {
      yield put({ type: USER_PROFILE_UPDATE_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: USER_PROFILE_UPDATE_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export default function* watcher() {
  yield takeEvery(USER_PROFILE_REQUESTED, watchUserProfileList);
  yield takeLatest(USER_PROFILE_UPDATE_REQUESTED, watchUserProfileUpdate);
  yield takeLatest(USER_GOOGLE_AUTH_REQUESTED, watchGoogleAuthProfile);
  yield takeLatest(USER_GOOGLE_QR_REQUESTED, watchGetGoogleQr);
  yield takeLatest(USER_CHANGE_PASSWORD_REQUESTED, watchChangePassword);
}
