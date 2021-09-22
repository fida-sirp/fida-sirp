import {
  INCIDENT_TASK_DEPARTMENTS_REQUESTED,
  INCIDENT_TASK_DEPARTMENTS_PROCESSING,
  INCIDENT_TASK_DEPARTMENTS_SUCCESSED,
  INCIDENT_TASK_DEPARTMENTS_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: [],
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
};
 
export const taskDepartments = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_TASK_DEPARTMENTS_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_TASK_DEPARTMENTS_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_TASK_DEPARTMENTS_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case INCIDENT_TASK_DEPARTMENTS_FAILED: {
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

export default taskDepartments;
