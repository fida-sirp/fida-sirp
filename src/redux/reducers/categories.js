import {
    CATEGORY_FILTER_REQUESTED,
    CATEGORY_FILTER_PROCESSING,
    CATEGORY_FILTER_SUCCESSED,
    CATEGORY_FILTER_FAILED,

  } from '../../constants/actionTypes';
  
  const initialState = {
    listData: {},
    singleData:null,
    isUpdated:null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };
 

  export const categoriesStore = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_FILTER_REQUESTED: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case CATEGORY_FILTER_PROCESSING: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case CATEGORY_FILTER_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case CATEGORY_FILTER_FAILED: {
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
  
  export default categoriesStore;
  