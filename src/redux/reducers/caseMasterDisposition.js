import {
  CASE_DISPOSITION_REQUESTED,
  CASE_DISPOSITION_PROCESSING,
  CASE_DISPOSITION_SUCCESSED,
  CASE_DISPOSITION_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const caseMasterDisposition = (state = initialState, action) => {
  switch (action.type) {
    case CASE_DISPOSITION_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case CASE_DISPOSITION_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case CASE_DISPOSITION_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case CASE_DISPOSITION_FAILED: {
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

export default caseMasterDisposition;
