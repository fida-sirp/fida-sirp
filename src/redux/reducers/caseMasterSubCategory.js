import {
  CASE_SUBCATEGORY_PROCESSING,
  CASE_SUBCATEGORY_SUCCESSED,
  CASE_SUBCATEGORY_FAILED,
  CASE_SUBCATEGORY_REQUESTED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const caseMasterSubCategory = (state = initialState, action) => {
  switch (action.type) {
    case CASE_SUBCATEGORY_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case CASE_SUBCATEGORY_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case CASE_SUBCATEGORY_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case CASE_SUBCATEGORY_FAILED: {
      return {
        ...state,
        result: {},
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

export default caseMasterSubCategory;
