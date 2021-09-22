import {

    LOCATION_LIST_REQUESTED,
    LOCATION_LIST_PROCESSING,
    LOCATION_LIST_SUCCESSED,
    LOCATION_LIST_FAILED,

  } from '../../constants/actionTypes';
   
  const initialState = {
    listData: {},
    singleData:null,
    isUpdated:null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };


  export const locationsStore = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_LIST_REQUESTED: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case LOCATION_LIST_PROCESSING: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case LOCATION_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case LOCATION_LIST_FAILED: {
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
  
  export default locationsStore;
  