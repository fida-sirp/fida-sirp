import {
  CASE_ACTION_APPS_REQUESTED,
  CASE_ACTION_APPS_PROCESSING,
  CASE_ACTION_APPS_SUCCESSED,
  CASE_ACTION_APPS_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const caseMasterActionApps = (state = initialState, action) => {
  switch (action.type) {
    case CASE_ACTION_APPS_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case CASE_ACTION_APPS_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case CASE_ACTION_APPS_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case CASE_ACTION_APPS_FAILED: {
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

export default caseMasterActionApps;
