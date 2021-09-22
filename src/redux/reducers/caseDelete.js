import {
  DELETE_CASE_REQUESTED,
  DELETE_CASE_PROCESSING,
  DELETE_CASE_SUCCESSED,
  DELETE_CASE_FAILED,
  ADMINISTRATION_CASES_CONTAINER_LIST_REQUESTED,
  CLEAR_DELETE_CASE_REQUESTED, 
  ADMINISTRATION_CASES_DESPOSITION_REQUESTED,
  ADMINISTRATION_CASES_DESPOSITION_SUCCESS,
  ADMINISTRATION_CASES_DESPOSITION_FAILED,
  ADMINISTRATION_CASES_CATEGORY_SUCCESS,
  ADMINISTRATION_CASES_CATEGORY_FAILED,
  ADMINISTRATION_CASES_CONTAINER_LIST_SUCCESS,
  ADMINISTRATION_CASES_CONTAINER_LIST_FAILDED
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
  containerList: {},
  casesDesposition: {},
  casesCategories: {}
};

export const caseDeleteStore = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CASE_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case DELETE_CASE_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case DELETE_CASE_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case DELETE_CASE_FAILED: {
      return {
        ...state,
        result: {},
        error: action.data,
        loading: false,
        requested: false,
      };
    }
    case CLEAR_DELETE_CASE_REQUESTED:{
      return {
        result: {},
        isProcessing: null,
        isSuccess: null,
        hasErrors: null,
      };
    }

   
    


    default: {
      return {
        ...state,
      };
    }
  }
};

export default caseDeleteStore;
