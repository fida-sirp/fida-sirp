import {
  INCIDENT_DETECTION_METHODS_REQUESTED,
  INCIDENT_DETECTION_METHODS_PROCESSING,
  INCIDENT_DETECTION_METHODS_SUCCESSED,
  INCIDENT_DETECTION_METHODS_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterDetectionMethods = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case INCIDENT_DETECTION_METHODS_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_DETECTION_METHODS_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_DETECTION_METHODS_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_DETECTION_METHODS_FAILED: {
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

export default incidentMasterDetectionMethods;
