import {    
    USER_CHANGE_PASSWORD_REQUESTED,
    USER_CHANGE_PASSWORD_PROCESSING,
    USER_CHANGE_PASSWORD_SUCCESSED,
    USER_CHANGE_PASSWORD_FAILED,
  } from '../../constants/actionTypes';
  
  const initialState = {
    listData: {},
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };

 
  export const changePasswordStore = (state = initialState, action) => {
    switch (action.type) {
        case USER_CHANGE_PASSWORD_REQUESTED: {
            return {
            ...state,
            listData: {},
            hasErrors: null,
            isProcessing: true,
            isSuccess: null,
            };
        }
        case USER_CHANGE_PASSWORD_PROCESSING: {
            return {
            ...state,
            listData: {},
            hasErrors: null,
            isProcessing: true,
            isSuccess: null,
            };
        }
        case USER_CHANGE_PASSWORD_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                hasErrors: null,
                isProcessing: false,
                isSuccess: true,
            };
        }
        case USER_CHANGE_PASSWORD_FAILED: {
            return {
                ...state,
                listData: {},
                hasErrors: action.data,
                isProcessing: false,
                isSuccess: false,
            };
        }

        default: {
            return {
            ...state,
            };
        }
    }
  };
  
  export default changePasswordStore;
  