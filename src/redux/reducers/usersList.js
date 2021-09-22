import {
  GET_USERS_REQUESTED,
  GET_USERS_PROCESSING,
  GET_USERS_SUCCESSED,
  GET_USERS_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: [],
  listData:{},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
  error:{}
};
 
export const usersList = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUESTED: {
      return {
        ...state,
        listData: {},
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
        error:{}
      };
    }
    case GET_USERS_PROCESSING: {
      return {
        ...state,
        listData: {},
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
        error:{}
      };
    }
    case GET_USERS_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
        error:{}
      };
    }
    case GET_USERS_FAILED: {
      return {
        ...state,
        error: action.data,
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

export default usersList;
