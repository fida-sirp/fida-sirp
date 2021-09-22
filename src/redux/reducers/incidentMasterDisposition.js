import {
  INCIDENT_DISPOSITION_REQUESTED,
  INCIDENT_DISPOSITION_PROCESSING,
  INCIDENT_DISPOSITION_SUCCESSED,
  INCIDENT_DISPOSITION_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterDisposition = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_DISPOSITION_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_DISPOSITION_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_DISPOSITION_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_DISPOSITION_FAILED: {
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

export default incidentMasterDisposition;
