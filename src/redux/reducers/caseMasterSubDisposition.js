import {
  CASE_SUBDISPOSITION_REQUESTED,
  CASE_SUBDISPOSITION_PROCESSING,
  CASE_SUBDISPOSITION_SUCCESSED,
  CASE_SUBDISPOSITION_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const caseMasterSubDisposition = (state = initialState, action) => {
  switch (action.type) {
    case CASE_SUBDISPOSITION_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case CASE_SUBDISPOSITION_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case CASE_SUBDISPOSITION_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case CASE_SUBDISPOSITION_FAILED: {
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

export default caseMasterSubDisposition;
