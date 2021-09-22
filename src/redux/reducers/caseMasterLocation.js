import {
  CASE_LOCATION_PROCESSING,
  CASE_LOCATION_REQUESTED,
  CASE_LOCATION_SUCCESSED,
  CASE_LOCATION_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const caseMasterLocation = (state = initialState, action) => {
  switch (action.type) {
    case CASE_LOCATION_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case CASE_LOCATION_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case CASE_LOCATION_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case CASE_LOCATION_FAILED: {
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

export default caseMasterLocation;
