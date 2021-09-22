import {
    THREAT_INTELLIGENCE_PRODUCTS_REQUESTED,
    THREAT_INTELLIGENCE_PRODUCTS_PROCESSING,
    THREAT_INTELLIGENCE_PRODUCTS_FAILED,
    THREAT_INTELLIGENCE_PRODUCTS_SUCCESSED
    } from '../../constants/actionTypes';
    
    const initialState = {
      listData: {},
      isProcessing: false,
      isSuccess: null,
      hasErrors: null,
    };
 
export const threatIntelligenceProducts = (state = initialState, action) => {
      switch (action.type) {
        case THREAT_INTELLIGENCE_PRODUCTS_REQUESTED: {
          return {
            ...state,
            listData: null,
            hasErrors: null,
            isProcessing: true,
            isSuccess: null,
          };
        }
        case THREAT_INTELLIGENCE_PRODUCTS_PROCESSING: {
          return {
            ...state,
            listData: null,
            hasErrors: null,
            isProcessing: true,
            isSuccess: null,
          };
        }
        case THREAT_INTELLIGENCE_PRODUCTS_SUCCESSED: {
          return {
            listData: action.data,
            hasErrors: null,
            isProcessing: false,
            isSuccess: true,
          };
        }
        case THREAT_INTELLIGENCE_PRODUCTS_FAILED: {
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
    
    export default threatIntelligenceProducts;
    