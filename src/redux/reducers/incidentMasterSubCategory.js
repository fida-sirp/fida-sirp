import {
  INCIDENT_SUBCATEGORY_PROCESSING,
  INCIDENT_SUBCATEGORY_SUCCESSED,
  INCIDENT_SUBCATEGORY_FAILED,
  INCIDENT_SUBCATEGORY_REQUESTED,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterSubCategory = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_SUBCATEGORY_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_SUBCATEGORY_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_SUBCATEGORY_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_SUBCATEGORY_FAILED: {
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

export default incidentMasterSubCategory;
