import {
    THREAT_INTELLIGENCE_ADVISORY_VENDORS_REQUESTED,
    THREAT_INTELLIGENCE_ADVISORY_VENDORS_PROCESSING,
    THREAT_INTELLIGENCE_ADVISORY_VENDORS_SUCCESSED,
    THREAT_INTELLIGENCE_ADVISORY_VENDORS_FAILED,
  } from '../../constants/actionTypes';
  
  const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
  };
   
  export const threatIntelligenceVendors = (state = initialState, action) => {
    switch (action.type) {
      case THREAT_INTELLIGENCE_ADVISORY_VENDORS_REQUESTED: {
        return {
          ...state,
          listData: null,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
        };
      }
      case THREAT_INTELLIGENCE_ADVISORY_VENDORS_PROCESSING: {
        return {
          ...state,
          listData: null,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
        };
      }
      case THREAT_INTELLIGENCE_ADVISORY_VENDORS_SUCCESSED: {
        return {
          listData: action.data,
          hasErrors: null,
          isProcessing: false,
          isSuccess: true,
        };
      }
      case THREAT_INTELLIGENCE_ADVISORY_VENDORS_FAILED: {
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
  
  export default threatIntelligenceVendors;
  