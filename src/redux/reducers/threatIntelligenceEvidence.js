import {
  THREAT_INTELLIGENCE_EVIDENCE_REQUESTED,
  THREAT_INTELLIGENCE_EVIDENCE_PROCESSING,
  THREAT_INTELLIGENCE_EVIDENCE_SUCCESSED,
  THREAT_INTELLIGENCE_EVIDENCE_FAILED
  } from '../../constants/actionTypes';
  
  const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
  };
   
  export const threatIntelligenceEvidence = (state = initialState, action) => {
    switch (action.type) {
      case THREAT_INTELLIGENCE_EVIDENCE_REQUESTED: {
        return {
          ...state,
          listData: null,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
        };
      }
      case THREAT_INTELLIGENCE_EVIDENCE_PROCESSING: {
        return {
          ...state,
          listData: null,
          hasErrors: null,
          isProcessing: true,
          isSuccess: null,
        };
      }
      case THREAT_INTELLIGENCE_EVIDENCE_SUCCESSED: {
        return {
          listData: action.data,
          hasErrors: null,
          isProcessing: false,
          isSuccess: true,
        };
      }
      case THREAT_INTELLIGENCE_EVIDENCE_FAILED: {
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
  
  export default threatIntelligenceEvidence;
  