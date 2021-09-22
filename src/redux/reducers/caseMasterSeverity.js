import {
  CASE_SEVERITY_REQUESTED,
  CASE_SEVERITY_PROCESSING,
  CASE_SEVERITY_SUCCESSED,
  CASE_SEVERITY_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const caseMasterSeverity = (state = initialState, action) => {
  switch (action.type) {
    case CASE_SEVERITY_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case CASE_SEVERITY_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case CASE_SEVERITY_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case CASE_SEVERITY_FAILED: {
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

export default caseMasterSeverity;
