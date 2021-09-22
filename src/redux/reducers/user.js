import {
  USER_PROFILE_REQUESTED,
  USER_PROFILE_PROCESSING,
  USER_PROFILE_SUCCESSED,
  USER_PROFILE_FAILED,

  USER_RESET_PROFILE_REQUESTED,
   USER_PROFILE_UPDATE_REQUESTED,
  USER_PROFILE_UPDATE_PROCESSING,
  USER_PROFILE_UPDATE_SUCCESSED,
  USER_PROFILE_UPDATE_FAILED,

  USER_GOOGLE_QR_REQUESTED,
  USER_GOOGLE_QR_PROCESSING,
  USER_GOOGLE_QR_SUCCESSED,
  USER_GOOGLE_QR_FAILED,

  USER_GOOGLE_AUTH_REQUESTED,
  USER_GOOGLE_AUTH_PROCESSING,
  USER_GOOGLE_AUTH_SUCCESSED,
  USER_GOOGLE_AUTH_FAILED,
  SET_DEFAULT_DASHBOARD_VALUE,

  } from '../../constants/actionTypes';
   
  const initialState = {
    userProfile: {},
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
    isUpdated: null,
    editAble:null,
    qrData:{},
    googleAuthProfile:{},
    isGoogleAuthUpdate:null,
    hasGoogleAuthError:null,
    isProfileSuccess:false
  };
  
  export const userStore = (state = initialState, action) => {
    switch (action.type) {
      case USER_PROFILE_REQUESTED: {
        return {
          ...state,
          userProfile: null,
          hasErrors: null,
          isProcessing: true,
          isProfileSuccess:false,
          isSuccess: null,
        };
      }
      case USER_PROFILE_PROCESSING: {
        return {
          ...state,
          userProfile: null,
          hasErrors: null,
          isProcessing: true,
          isProfileSuccess:false,
          isSuccess: null,
        };
      }
      case USER_PROFILE_SUCCESSED: {
        return {
          ...state,
          userProfile: action.data,
          hasErrors: null,
          isProcessing: false,
          isProfileSuccess:true,
          isSuccess: true,
        };
      }
    case SET_DEFAULT_DASHBOARD_VALUE: {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          usr_das_default: action.payload
        },
        hasErrors: null,
        isProcessing: false,
        isProfileSuccess: true,
        isSuccess: true,
      };
    }
      case USER_PROFILE_FAILED: {
        return {
          ...state,
          userProfile: null,
          hasErrors: action.data,
          isProcessing: false,
          isProfileSuccess:false,
          isSuccess: false,
        };
      }
      case USER_RESET_PROFILE_REQUESTED:{
        return {
          ...state,
          userProfile: {},
          isProcessing: null,
          isSuccess: null,
          hasErrors: null,
        };
      }
        case USER_PROFILE_UPDATE_REQUESTED: {
        return {
          ...state,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
          isUpdated:false,
        };
      }
      case USER_PROFILE_UPDATE_PROCESSING: {
        return {
          ...state,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
          isUpdated:false,
        };
      }
      case USER_PROFILE_UPDATE_SUCCESSED: {
        return {
          ...state,
          editAble: action.data,
          hasErrors: null,
          isProcessing: false,
          isSuccess: true,
          isUpdated:true,
        };
      }
      case USER_PROFILE_UPDATE_FAILED: {
        return {
           ...state,
          hasErrors: action.data,
          isProcessing: false,
          isSuccess: false,
          isUpdated:false,
        };
      }
      case USER_GOOGLE_QR_REQUESTED: {
        return {
          ...state,
          qrData:{},
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
      };
      }
      case USER_GOOGLE_QR_PROCESSING: {
        return {
          ...state,
          qrData:{},
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
        };
      }
      case USER_GOOGLE_QR_SUCCESSED: {
        return {
          ...state,
          qrData: action.data,
          hasErrors: null,
          isProcessing: false,
          isSuccess: true,
        };
      }
      case USER_GOOGLE_QR_FAILED: {
        return {
           ...state,
          qrData:{},
          hasErrors: action.data,
          isProcessing: false,
          isSuccess: false,
        };
      }
      case USER_GOOGLE_AUTH_REQUESTED: {
        return {
          ...state,
          googleAuthProfile: {},
          hasGoogleAuthError: null,
          isProcessing: true,
          isSuccess: null,
          isGoogleAuthUpdate:false,
        };
      }
      case USER_GOOGLE_AUTH_PROCESSING: {
        return {
          ...state,
          googleAuthProfile: {},
          hasGoogleAuthError: null,
          isProcessing: true,
          isSuccess: null,
          isGoogleAuthUpdate:false,
        };
      }
      case USER_GOOGLE_AUTH_SUCCESSED: {
        return {
          ...state,
          googleAuthProfile: action.data,
          hasGoogleAuthError: null,
          isProcessing: false,
          isSuccess: true,
          isGoogleAuthUpdate:true,
        };
      }
      case USER_GOOGLE_AUTH_FAILED: {
        return {
           ...state,
           googleAuthProfile: {},
           hasGoogleAuthError: action.data,
          isProcessing: false,
          isSuccess: false,
          isGoogleAuthUpdate:false,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  };
  
  export default userStore;
  