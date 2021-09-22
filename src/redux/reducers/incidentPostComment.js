import {
  INCIDENT_POST_COMMENT_REQUESTED,
  INCIDENT_POST_COMMENT_PROCESSING,
  INCIDENT_POST_COMMENT_SUCCESSED,
  INCIDENT_POST_COMMENT_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
};

export const incidentPostComment = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_POST_COMMENT_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_POST_COMMENT_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_POST_COMMENT_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case INCIDENT_POST_COMMENT_FAILED: {
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

export default incidentPostComment;
