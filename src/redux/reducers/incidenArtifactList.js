import {
  INCIDENT_ARTIFACTS_LIST_REQUESTED,
  INCIDENT_ARTIFACTS_LIST_PROCESSING,
  INCIDENT_ARTIFACTS_LIST_SUCCESSED,
  INCIDENT_ARTIFACTS_LIST_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidenArtifactList = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_ARTIFACTS_LIST_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_ARTIFACTS_LIST_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_ARTIFACTS_LIST_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_ARTIFACTS_LIST_FAILED: {
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

export default incidenArtifactList;
