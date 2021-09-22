import {
  INCIDENT_ARTIFACTS_REQUESTED,
  INCIDENT_ARTIFACTS_PROCESSING,
  INCIDENT_ARTIFACTS_SUCCESSED,
  INCIDENT_ARTIFACTS_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterArtifacts = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_ARTIFACTS_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_ARTIFACTS_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_ARTIFACTS_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_ARTIFACTS_FAILED: {
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

export default incidentMasterArtifacts;
