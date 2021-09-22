import {
    INCIDENT_SEND_EMAIL_REQUESTED,
    INCIDENT_SEND_EMAIL_PROCESSING,
    INCIDENT_SEND_EMAIL_SUCCESSED,
    INCIDENT_SEND_EMAIL_FAILED,

  } from '../../constants/actionTypes';
   
  const initialState = {
    listData: {},
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };
  
  export const incidentSendEmail = (state = initialState, action) => {
    switch (action.type) {
      case INCIDENT_SEND_EMAIL_REQUESTED: {
        return {
          ...state,
          listData: null,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
        };
      }
      case INCIDENT_SEND_EMAIL_PROCESSING: {
        return {
          ...state,
          listData: null,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
        };
      }
      case INCIDENT_SEND_EMAIL_SUCCESSED: {
        return {
          listData: action.data,
          hasErrors: null,
          isProcessing: false,
          isSuccess: true,
        };
      }
      case INCIDENT_SEND_EMAIL_FAILED: {
        return {
          listData: action.data,
          hasErrors: true,
          isProcessing: false,
          isSuccess: null,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  };
  
  export default incidentSendEmail;
  