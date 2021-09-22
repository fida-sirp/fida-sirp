import {
  CASES_LIST_REQUESTED,
  CASES_LIST_PROCESSING,
  CASES_LIST_SUCCESSED,
  CASES_LIST_FAILED,
  LOGOUT_USER,
} from '../../constants/actionTypes';

const initialState = {
  data: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};
 
export const casesStore = (state = initialState, action) => {
  switch (action.type) {
    case CASES_LIST_REQUESTED: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case CASES_LIST_PROCESSING: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case CASES_LIST_SUCCESSED: {
      return {
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case CASES_LIST_FAILED: {
      return {
        result: null,
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

export default casesStore;
