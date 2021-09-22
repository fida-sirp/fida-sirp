import {
  CASE_DETAILS_REQUESTED,
  CASE_DETAILS_PROCESSING,
  CASE_DETAILS_SUCCESSED,
  CASE_DETAILS_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  listData: {},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
};

export const caseDetails = (state = initialState, action) => {
  switch (action.type) {
    case CASE_DETAILS_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case CASE_DETAILS_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case CASE_DETAILS_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case CASE_DETAILS_FAILED: {
      return {
        listData: action.data,
        hasErrors: true,
        isProcessing: false,
        isSuccess: null,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default caseDetails;
