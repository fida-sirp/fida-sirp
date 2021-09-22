import {
  INCIDENT_TASK_CREATED_REQUESTED,
  INCIDENT_TASK_CREATED_PROCESSING,
  INCIDENT_TASK_CREATED_SUCCESSED,
  INCIDENT_TASK_CREATED_FAILED,

  INCIDENT_TASK_EDIT_REQUESTED,
  INCIDENT_TASK_EDIT_PROCESSING,
  INCIDENT_TASK_EDIT_SUCCESSED,
  INCIDENT_TASK_EDIT_FAILED,
  INCIDENT_TASK_CLEAR_REQUESTED

} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
  isUpdated:false,
};

export const taskCreate = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_TASK_CREATED_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_TASK_CREATED_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_TASK_CREATED_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case INCIDENT_TASK_CREATED_FAILED: {
      return {
        listData: action.data,
        hasErrors: true,
        isProcessing: false,
        isSuccess: null,
      };
    }

    case INCIDENT_TASK_EDIT_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
        isUpdated:false,
      };
    }
    case INCIDENT_TASK_EDIT_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
        isUpdated:false,
      };
    }
    case INCIDENT_TASK_EDIT_SUCCESSED: {
      return {
        ...state,
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
        isUpdated:true,
      };
    }
    case INCIDENT_TASK_EDIT_FAILED: {
      return {
        ...state,
        listData: action.data,
        hasErrors: true,
        isProcessing: false,
        isSuccess: null,
        isUpdated:false,
      };
    }

    case INCIDENT_TASK_CLEAR_REQUESTED:{
      return {
        ...state,
        result: {},
        isProcessing: false,
        isSuccess: null,
        hasErrors: null,
        isUpdated:false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default taskCreate;
