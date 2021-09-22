import {
  INCIDENT_TASK_CATEGORIES_REQUESTED,
  INCIDENT_TASK_CATEGORIES_PROCESSING,
  INCIDENT_TASK_CATEGORIES_SUCCESSED,
  INCIDENT_TASK_CATEGORIES_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: [],
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
};
 
export const taskCategories = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_TASK_CATEGORIES_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_TASK_CATEGORIES_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_TASK_CATEGORIES_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case INCIDENT_TASK_CATEGORIES_FAILED: {
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

export default taskCategories;
