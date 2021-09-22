import {
  ASSET_CREATE_REQUESTED,
  ASSET_CREATE_PROCESSING,
  ASSET_CREATE_SUCCESSED,
  ASSET_CREATE_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  data: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};
 
export const newAsset = (state = initialState, action) => {
  switch (action.type) {
    case ASSET_CREATE_REQUESTED: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_CREATE_PROCESSING: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_CREATE_SUCCESSED: {
      return {
        data: action.data,
        isProcessing: false,
        isSuccess: true,
        hasErrors: false,
      };
    }
    case ASSET_CREATE_FAILED: {
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

export default newAsset;
