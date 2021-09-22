import {
  DELETE_COMMENT_REQUESTED,
  DELETE_COMMENT_PROCESSING,
  DELETE_COMMENT_SUCCESSED,
  DELETE_COMMENT_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const deleteComment = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case DELETE_COMMENT_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case DELETE_COMMENT_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case DELETE_COMMENT_FAILED: {
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

export default deleteComment;
