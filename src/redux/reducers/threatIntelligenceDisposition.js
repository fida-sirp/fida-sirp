import {
    THREAT_INTELLIGENCE_DISPOSITION_FAILED,
    THREAT_INTELLIGENCE_DISPOSITION_REQUESTED,
    THREAT_INTELLIGENCE_DISPOSITION_PROCESSING,
    THREAT_INTELLIGENCE_DISPOSITION_SUCCESSED,
    } from '../../constants/actionTypes';
    
    const initialState = {
      listData: {},
      isProcessing: false,
      isSuccess: null,
      hasErrors: null,
    };
     
export const threatIntelligenceDisposition= (state = initialState, action) => {
      switch (action.type) {
        case THREAT_INTELLIGENCE_DISPOSITION_REQUESTED: {
          return {
            ...state,
            listData: null,
            hasErrors: null,
            isProcessing: true,
            isSuccess: null,
          };
        }
        case THREAT_INTELLIGENCE_DISPOSITION_PROCESSING: {
          return {
            ...state,
            listData: null,
            hasErrors: null,
            isProcessing: true,
            isSuccess: null,
          };
        }
        case THREAT_INTELLIGENCE_DISPOSITION_SUCCESSED: {
          return {
            listData: action.data,
            hasErrors: null,
            isProcessing: false,
            isSuccess: true,
          };
        }
        case THREAT_INTELLIGENCE_DISPOSITION_FAILED: {
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
    
export default threatIntelligenceDisposition;
    