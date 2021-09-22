import {
  INCIDENT_ARTIFACT_ADD_REQUESTED,
INCIDENT_ARTIFACT_ADD_PROCESSING,
INCIDENT_ARTIFACT_ADD_SUCCESSED,
INCIDENT_ARTIFACT_ADD_FAILED
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentAddArtifact = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_ARTIFACT_ADD_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_ARTIFACT_ADD_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_ARTIFACT_ADD_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_ARTIFACT_ADD_FAILED: {
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

export default incidentAddArtifact;
