import {
    THREAT_INTELLIGENCE_LIST_REQUESTED,
    THREAT_INTELLIGENCE_LIST_PROCESSING,
    THREAT_INTELLIGENCE_LIST_SUCCESSED,
    THREAT_INTELLIGENCE_LIST_FAILED,
  } from '../../constants/actionTypes';
  
  const initialState = {
    data: {},
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };
   
  export const threatIntelligenceStore = (state = initialState, action) => {
    switch (action.type) {
      case THREAT_INTELLIGENCE_LIST_REQUESTED: {
        return {
          ...state,
          result: null,
          error: null,
          loading: true,
          requested: true,
        };
      }
      case THREAT_INTELLIGENCE_LIST_PROCESSING: {
        return {
          ...state,
          result: null,
          error: null,
          loading: true,
          requested: false,
        };
      }
      case THREAT_INTELLIGENCE_LIST_SUCCESSED: {
        return {
          result: action.data,
          error: null,
          loading: false,
          requested: false,
        };
      }
      case THREAT_INTELLIGENCE_LIST_FAILED: {
        return {
          result: null,
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
  
  export default threatIntelligenceStore;
  