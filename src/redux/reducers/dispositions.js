import {

    DISPOSITION_LIST_REQUESTED,
    DISPOSITION_LIST_PROCESSING,
    DISPOSITION_LIST_SUCCESSED,
    DISPOSITION_LIST_FAILED,

  } from '../../constants/actionTypes';
  
  const initialState = {
    listData: {},
    singleData:null,
    isUpdated:null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };
 

  export const dispositionsStore = (state = initialState, action) => {
    switch (action.type) {
        case DISPOSITION_LIST_REQUESTED: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case DISPOSITION_LIST_PROCESSING: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case DISPOSITION_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case DISPOSITION_LIST_FAILED: {
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
  
  export default dispositionsStore;
  