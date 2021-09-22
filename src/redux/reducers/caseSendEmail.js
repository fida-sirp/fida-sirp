import {
  CASE_SEND_EMAIL_REQUESTED,
  CASE_SEND_EMAIL_PROCESSING,
  CASE_SEND_EMAIL_SUCCESSED,
  CASE_SEND_EMAIL_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  listData: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const caseSendEmail = (state = initialState, action) => {
  switch (action.type) {
    case CASE_SEND_EMAIL_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case CASE_SEND_EMAIL_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case CASE_SEND_EMAIL_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case CASE_SEND_EMAIL_FAILED: {
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

export default caseSendEmail;
