import {
  INCIDENT_ACTION_APPS_REQUESTED,
  INCIDENT_ACTION_APPS_PROCESSING,
  INCIDENT_ACTION_APPS_SUCCESSED,
  INCIDENT_ACTION_APPS_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterActionApps = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_ACTION_APPS_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_ACTION_APPS_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_ACTION_APPS_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_ACTION_APPS_FAILED: {
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

export default incidentMasterActionApps;
