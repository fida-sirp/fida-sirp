import {
  ACTION_ROW_OUTPUT_REQUESTED,
  ACTION_ROW_OUTPUT_PROCESSING,
  ACTION_ROW_OUTPUT_SUCCESSED,
  ACTION_ROW_OUTPUT_FAILED,
  ACTION_ROW_OUTPUT_SET,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
};

export const actionRowOutput = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_ROW_OUTPUT_REQUESTED: {
      return {
        ...state,
        result: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case ACTION_ROW_OUTPUT_PROCESSING: {
      return {
        ...state,
        result: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case ACTION_ROW_OUTPUT_SUCCESSED: {
      return {
        result: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case ACTION_ROW_OUTPUT_FAILED: {
      return {
        result: action.data,
        hasErrors: true,
        isProcessing: false,
        isSuccess: null,
      };
    }
    case ACTION_ROW_OUTPUT_SET: {
      return {
        result: {},
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

export default actionRowOutput;
