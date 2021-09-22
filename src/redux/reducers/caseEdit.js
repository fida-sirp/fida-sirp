import {
  CASE_MANAGEMENT_EDIT_REQUESTED,
  CASE_MANAGEMENT_EDIT_PROCESSING,
  CASE_MANAGEMENT_EDIT_SUCCESSED,
  CASE_MANAGEMENT_EDIT_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  listData: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const caseEdit = (state = initialState, action) => {
  switch (action.type) {
    case CASE_MANAGEMENT_EDIT_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case CASE_MANAGEMENT_EDIT_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case CASE_MANAGEMENT_EDIT_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case CASE_MANAGEMENT_EDIT_FAILED: {
      return {
        listData: action.data,
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

export default caseEdit;
