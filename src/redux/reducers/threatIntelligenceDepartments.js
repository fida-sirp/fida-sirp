import {
  THREAT_INTELLIGENCE_DEPARTMENTS_REQUESTED,
  THREAT_INTELLIGENCE_DEPARTMENTS_SUCCESSED,
  THREAT_INTELLIGENCE_DEPARTMENTS_FAILED,
  THREAT_INTELLIGENCE_DEPARTMENTS_PROCESSING,
} from '../../constants/actionTypes';

const initialState = {
  listData: {},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
};
 
export const threatIntelligenceDepartments = (state = initialState, action) => {
  switch (action.type) {
    case THREAT_INTELLIGENCE_DEPARTMENTS_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case THREAT_INTELLIGENCE_DEPARTMENTS_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case THREAT_INTELLIGENCE_DEPARTMENTS_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case THREAT_INTELLIGENCE_DEPARTMENTS_FAILED: {
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

export default threatIntelligenceDepartments;
