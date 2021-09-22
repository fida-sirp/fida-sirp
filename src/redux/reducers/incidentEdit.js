import {
    INCIDENT_MANAGEMENT_EDIT_REQUESTED,
    INCIDENT_MANAGEMENT_EDIT_PROCESSING,
    INCIDENT_MANAGEMENT_EDIT_SUCCESSED,
    INCIDENT_MANAGEMENT_EDIT_FAILED,

  } from '../../constants/actionTypes';
   
  const initialState = {
    listData: {},
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };
  
  export const incidentEdit = (state = initialState, action) => {
    switch (action.type) {
      case INCIDENT_MANAGEMENT_EDIT_REQUESTED: {
        return {
          ...state,
          listData: null,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
        };
      }
      case INCIDENT_MANAGEMENT_EDIT_PROCESSING: {
        return {
          ...state,
          listData: null,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
        };
      }
      case INCIDENT_MANAGEMENT_EDIT_SUCCESSED: {
        return {
          listData: action.data,
          hasErrors: null,
          isProcessing: false,
          isSuccess: true,
        };
      }
      case INCIDENT_MANAGEMENT_EDIT_FAILED: {
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
  
  export default incidentEdit;
  