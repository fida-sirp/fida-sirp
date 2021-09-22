import { put, call, takeLatest } from 'redux-saga/effects';
import {
  LOGIN_SUCCESSED,
  LOGIN_FAILED,
  LOGIN_REQUESTED,
  LOGOUT_SUCCESSED,
  LOGOUT_FAILED,
  LOGOUT_REQUESTED,
  SHOW_LOADER,
  HIDE_LOADER,
  FORGOT_PASSWORD_REQUESTED,
  FORGOT_PASSWORD_PROCESSING,
  FORGOT_PASSWORD_SUCCESSED,
  FORGOT_PASSWORD_FAILED,
  VERIFY_CODE_REQUESTED,
  VERIFY_CODE_PROCESSING,
  VERIFY_CODE_SUCCESSED,
  VERIFY_CODE_FAILED,
  GOOGLE_AUTH_LOGIN_REQUESTED,
  GOOGLE_AUTH_LOGIN_PROCESSING,
  GOOGLE_AUTH_LOGIN_SUCCESSED,
  GOOGLE_AUTH_LOGIN_FAILED
} from '../../constants/actionTypes';
import { loginSaga, forgotPasswordSaga, googleLoginSaga, verifyCodeSaga } from '../../api/loginSaga';
import { logoutSaga } from '../../api/logoutSaga';
 
export function* watchLoginDetails(action) {
  try {
    const loginData = yield call(loginSaga, action.payload);
    if (loginData.success === true) {
      localStorage.setItem('AccessToken', loginData.data.token);

      yield put({ type: LOGIN_SUCCESSED, data: loginData });
    } else {
      yield put({ type: LOGIN_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: LOGIN_FAILED, data: err?.response?.data?.data });
  }
}
export function* watchUserLogout(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const logoutData = yield call(logoutSaga, action.payload);
    if (logoutData.success === true) {
      yield put({ type: LOGOUT_SUCCESSED, data: logoutData });
    } else {
      yield put({ type: LOGOUT_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: LOGOUT_FAILED, data: err });
  }
  localStorage.setItem('Logout', 'User is logged out');
}

export function* watchForgotPassword(action) {
  try {
    const forgotData = yield call(forgotPasswordSaga, action.payload);
    if (forgotData.success === true) {
      yield put({ type: FORGOT_PASSWORD_SUCCESSED, data: forgotData });
    } else {
      yield put({ type: FORGOT_PASSWORD_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: FORGOT_PASSWORD_FAILED, data: err?.response?.data?.data });
    alert(err?.response?.data?.data.message);
  }
}

export function* watchgoogleLogin(action) {
  try {
    const gLogin = yield call(googleLoginSaga, action.payload);
    if (gLogin.success === true) {
      if(gLogin.data.token){
        localStorage.setItem('AccessToken', gLogin.data.token);
        yield put({ type: GOOGLE_AUTH_LOGIN_SUCCESSED, data: gLogin });
      }else{
        yield put({ type: GOOGLE_AUTH_LOGIN_FAILED, data: gLogin});
      }
      
     
    } else {
      yield put({ type: GOOGLE_AUTH_LOGIN_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: GOOGLE_AUTH_LOGIN_FAILED, data: err?.response?.data?.data });
    alert(err?.response?.data?.data.message);
  }
}

export function* watchVerifyCode(action) {
  try {
    const forgotData = yield call(verifyCodeSaga, action.payload);
    if (forgotData.success === true) {
      yield put({ type: VERIFY_CODE_SUCCESSED, data: forgotData });
    } else {
      yield put({ type: VERIFY_CODE_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: VERIFY_CODE_FAILED, data: err?.response?.data?.data });
  
  }
}

export default function* watcher() {
  yield takeLatest(LOGIN_REQUESTED, watchLoginDetails);
  yield takeLatest(LOGOUT_REQUESTED, watchUserLogout);
  yield takeLatest(FORGOT_PASSWORD_REQUESTED, watchForgotPassword);
  yield takeLatest(GOOGLE_AUTH_LOGIN_REQUESTED, watchgoogleLogin);
  yield takeLatest(VERIFY_CODE_REQUESTED, watchVerifyCode);
}
