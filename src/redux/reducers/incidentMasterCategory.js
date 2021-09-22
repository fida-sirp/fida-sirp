import {
  INCIDENT_CATEGORY_REQUESTED,
  INCIDENT_CATEGORY_PROCESSING,
  INCIDENT_CATEGORY_SUCCESSED,
  INCIDENT_CATEGORY_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterCategory = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_CATEGORY_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_CATEGORY_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_CATEGORY_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_CATEGORY_FAILED: {
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

export default incidentMasterCategory;
