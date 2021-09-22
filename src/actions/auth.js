
import {  VERIFY_CODE_REQUESTED, LOGIN_REQUESTED, LOGOUT_REQUESTED, FORGOT_PASSWORD_REQUESTED, GOOGLE_AUTH_LOGIN_REQUESTED } from '../constants/actionTypes';


export function loginDetails(payload) {
  return {
    type: LOGIN_REQUESTED,
    payload,
  };
}


export function userLogout() {
  return {
    type: LOGOUT_REQUESTED,
  };
}

export function forgotPassword(payload) {

  return {
    type: FORGOT_PASSWORD_REQUESTED,
    payload,
  };
}

export function googleLogin(payload) {

  return {
    type: GOOGLE_AUTH_LOGIN_REQUESTED,
    payload,
  };
}

export function verifyCode(payload) {

  return {
    type: VERIFY_CODE_REQUESTED,
    payload,
  };
}


