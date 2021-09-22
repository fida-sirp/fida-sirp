import {
  CASE_ACTION_RUN_REQUESTED,
  CASE_ACTION_RUN_PROCESSING,
  CASE_ACTION_RUN_SUCCESSED,
  CASE_ACTION_RUN_FAILED,
  CLEAR_ACTION_RUN_REQUESTED
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

export const caseRunAction = (state = initialState, action) => {
  switch (action.type) {
    case CASE_ACTION_RUN_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        isSuccess:false,
        requested: true,
      };
    }
    case CASE_ACTION_RUN_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        isSuccess:false,
        requested: false,
      };
    }
    case CASE_ACTION_RUN_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        isSuccess:true,
        requested: false,
      };
    }
    case CASE_ACTION_RUN_FAILED: {
      return {
        ...state,
        result: {},
        error: action.data,
        loading: false,
        isSuccess:false,
        requested: false,
      };
    }
    case CLEAR_ACTION_RUN_REQUESTED:{
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

export default caseRunAction;
