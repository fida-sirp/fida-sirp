import {
  INCIDENT_TASK_USERS_REQUESTED,
  INCIDENT_TASK_USERS_PROCESSING,
  INCIDENT_TASK_USERS_SUCCESSED,
  INCIDENT_TASK_USERS_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: [],
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
};

export const taskUsers = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_TASK_USERS_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_TASK_USERS_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_TASK_USERS_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case INCIDENT_TASK_USERS_FAILED: {
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

export default taskUsers;
