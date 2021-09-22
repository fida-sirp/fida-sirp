import {
  INCIDENT_SUBDISPOSITION_REQUESTED,
  INCIDENT_SUBDISPOSITION_PROCESSING,
  INCIDENT_SUBDISPOSITION_SUCCESSED,
  INCIDENT_SUBDISPOSITION_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterSubDisposition = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_SUBDISPOSITION_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_SUBDISPOSITION_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_SUBDISPOSITION_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_SUBDISPOSITION_FAILED: {
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

export default incidentMasterSubDisposition;
