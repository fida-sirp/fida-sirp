import {
  GET_REPORT_TYPES_REQUESTED,
  GET_REPORT_TYPES_PROCESSING,
  GET_REPORT_TYPES_SUCCESSED,
  GET_REPORT_TYPES_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  listData: {},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
};

export const incidentReportTypes = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPORT_TYPES_REQUESTED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case GET_REPORT_TYPES_PROCESSING: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case GET_REPORT_TYPES_SUCCESSED: {
      return {
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case GET_REPORT_TYPES_FAILED: {
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

export default incidentReportTypes;
