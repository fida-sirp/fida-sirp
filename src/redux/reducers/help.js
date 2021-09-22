import {
    HELP_LIST_REQUESTED,
    HELP_LIST_PROCESSING,
    HELP_LIST_SUCCESSED,
    HELP_LIST_FAILED,

    HELP_DETAILS_REQUESTED,
    HELP_DETAILS_PROCESSING,
    HELP_DETAILS_SUCCESSED,
    HELP_DETAILS_FAILED,

  } from '../../constants/actionTypes';
   
  const initialState = {
    listData: {},
    singleData:null,
    isUpdated:null,
    isCreated:null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };
  
  export const helpStore = (state = initialState, action) => {
    switch (action.type) {
        case HELP_LIST_REQUESTED: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case HELP_LIST_PROCESSING: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case HELP_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case HELP_LIST_FAILED: {
            return {
                ...state,
                listData: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }
        case HELP_DETAILS_REQUESTED: {
            return {
                ...state,
                singleData: null,
                error: null,
                loading: true,
                requested: true,
            };
        }
        case HELP_DETAILS_PROCESSING: {
            return {
                ...state,
                singleData: null,
                error: null,
                loading: true,
                requested: false,
            };
        }
        case HELP_DETAILS_SUCCESSED: {
            return {
                ...state,
                singleData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case HELP_DETAILS_FAILED: {
            return {
                ...state,
                singleData: null,
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

export default helpStore;
