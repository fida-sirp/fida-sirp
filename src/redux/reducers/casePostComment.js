import {
  CASE_POST_COMMENT_REQUESTED,
  CASE_POST_COMMENT_PROCESSING,
  CASE_POST_COMMENT_SUCCESSED,
  CASE_POST_COMMENT_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
};

export const casePostComment = (state = initialState, action) => {
  switch (action.type) {
    case CASE_POST_COMMENT_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case CASE_POST_COMMENT_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case CASE_POST_COMMENT_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case CASE_POST_COMMENT_FAILED: {
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

export default casePostComment;
