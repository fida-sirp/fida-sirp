import {
  INCIDENT_TASK_DELETED_REQUESTED,
  INCIDENT_TASK_DELETED_PROCESSING,
  INCIDENT_TASK_DELETED_SUCCESSED,
  INCIDENT_TASK_DELETED_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const deleteIncidentTask = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_TASK_DELETED_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_TASK_DELETED_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_TASK_DELETED_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_TASK_DELETED_FAILED: {
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

export default deleteIncidentTask;
