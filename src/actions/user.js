import { USER_PROFILE_REQUESTED,USER_RESET_PROFILE_REQUESTED,USER_PROFILE_UPDATE_REQUESTED,USER_CHANGE_PASSWORD_REQUESTED 
  ,USER_GOOGLE_QR_REQUESTED,USER_GOOGLE_AUTH_REQUESTED
} from '../constants/actionTypes';


export function getUserProfile(isDashbord = false) {
    return {
    type: USER_PROFILE_REQUESTED,
    isDashbord
    };
}

export function resetUser(){

  return {
    type: USER_RESET_PROFILE_REQUESTED
  };
}

export function updateUserProfile(payload) {
    return {
      type: USER_PROFILE_UPDATE_REQUESTED,
      payload:payload,
    };
}

export function changePassword(payload) {
    return {
      type: USER_CHANGE_PASSWORD_REQUESTED,
      payload:payload,
    };
}


export function getGoogleQrCode() {
 
  return {
    type: USER_GOOGLE_QR_REQUESTED
  };
}

export function googleAuthProfile(payload) {
  return {
    type: USER_GOOGLE_AUTH_REQUESTED,
    payload:payload,
  };
}
