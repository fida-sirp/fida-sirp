import {
  INCIDENT_ACTION_RUN_REQUESTED,
  INCIDENT_ACTION_RUN_PROCESSING,
  INCIDENT_ACTION_RUN_SUCCESSED,
  INCIDENT_ACTION_RUN_FAILED,
  INCIDENT_ACTION_CLEAR_REQUESTED 
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterActionRun = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_ACTION_RUN_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_ACTION_RUN_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_ACTION_RUN_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_ACTION_RUN_FAILED: {
      return {
        ...state,
        result: {},
        error: action.data,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_ACTION_CLEAR_REQUESTED:{
      return {
        result: {},
        isProcessing: null,
        isSuccess: null,
        hasErrors: null,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default incidentMasterActionRun;
