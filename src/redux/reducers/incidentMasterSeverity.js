import {
  INCIDENT_SEVERITY_REQUESTED,
  INCIDENT_SEVERITY_PROCESSING,
  INCIDENT_SEVERITY_SUCCESSED,
  INCIDENT_SEVERITY_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterSeverity = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_SEVERITY_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_SEVERITY_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_SEVERITY_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_SEVERITY_FAILED: {
      return {
        ...state,
        result: {},
        error: action.data,
        loading: false,
        requested: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default incidentMasterSeverity;
