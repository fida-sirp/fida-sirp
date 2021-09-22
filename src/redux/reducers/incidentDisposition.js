import {
  INCIDENT_DISPOSITION_LIST_REQUESTED,
  INCIDENT_DISPOSITION_LIST_PROCESSING,
  INCIDENT_DISPOSITION_LIST_SUCCESSED,
  INCIDENT_DISPOSITION_LIST_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  listData: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentDispositionStore = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_DISPOSITION_LIST_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_DISPOSITION_LIST_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_DISPOSITION_LIST_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case INCIDENT_DISPOSITION_LIST_FAILED: {
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

export default incidentDispositionStore;
