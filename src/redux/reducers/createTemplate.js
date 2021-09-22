import {
  ASSET_TEMPLATE_CREATE_REQUESTED,
  ASSET_TEMPLATE_CREATE_PROCESSING,
  ASSET_TEMPLATE_CREATE_SUCCESSED,
  ASSET_TEMPLATE_CREATE_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  data: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};
 
export const createTemplate = (state = initialState, action) => {
  switch (action.type) {
    case ASSET_TEMPLATE_CREATE_REQUESTED: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_TEMPLATE_CREATE_PROCESSING: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_TEMPLATE_CREATE_SUCCESSED: {
      return {
        data: action.data,
        isProcessing: false,
        isSuccess: true,
        hasErrors: false,
      };
    }
    case ASSET_TEMPLATE_CREATE_FAILED: {
      return {
        data: action.data,
        isProcessing: false,
        isSuccess: false,
        hasErrors: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default createTemplate;
