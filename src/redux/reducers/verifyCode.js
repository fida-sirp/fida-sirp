import {

    VERIFY_CODE_REQUESTED,
    VERIFY_CODE_PROCESSING,
    VERIFY_CODE_SUCCESSED,
    VERIFY_CODE_FAILED,

  } from '../../constants/actionTypes';
  
  const initialState = {
    listData: {},
    singleData:null,
    isUpdated:null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };
 

  export const verifyCodeStore = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_CODE_REQUESTED: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case VERIFY_CODE_PROCESSING: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case VERIFY_CODE_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case VERIFY_CODE_FAILED: {
            return {
                ...state,
                listData: {},
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
  
  export default verifyCodeStore;
  