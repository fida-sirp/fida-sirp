import {
  CASE_ARTIFACTS_REQUESTED,
  CASE_ARTIFACTS_PROCESSING,
  CASE_ARTIFACTS_SUCCESSED,
  CASE_ARTIFACTS_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const caseMasterArtifacts = (state = initialState, action) => {
  switch (action.type) {
    case CASE_ARTIFACTS_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case CASE_ARTIFACTS_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case CASE_ARTIFACTS_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case CASE_ARTIFACTS_FAILED: {
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

export default caseMasterArtifacts;
