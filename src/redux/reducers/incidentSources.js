import {
  INCIDENT_SOURCES_LIST_REQUESTED,
  INCIDENT_SOURCES_LIST_PROCESSING,
  INCIDENT_SOURCES_LIST_SUCCESSED,
  INCIDENT_SOURCES_LIST_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  listData: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentSourcesStore = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_SOURCES_LIST_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_SOURCES_LIST_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_SOURCES_LIST_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case INCIDENT_SOURCES_LIST_FAILED: {
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

export default incidentSourcesStore;
