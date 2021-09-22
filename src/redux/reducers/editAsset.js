import {
  ASSET_EDIT_REQUESTED,
  ASSET_EDIT_PROCESSING,
  ASSET_EDIT_SUCCESSED,
  ASSET_EDIT_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  data: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};
 
export const editAsset = (state = initialState, action) => {
  switch (action.type) {
    case ASSET_EDIT_REQUESTED: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_EDIT_PROCESSING: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_EDIT_SUCCESSED: {
      return {
        data: action.data,
        isProcessing: false,
        isSuccess: true,
        hasErrors: false,
      };
    }
    case ASSET_EDIT_FAILED: {
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

export default editAsset;
