import {
  IMPORT_ASSET_REQUESTED,
  IMPORT_ASSET_PROCESSING,
  IMPORT_ASSET_SUCCESSED,
  IMPORT_ASSET_FAILED,
  ASSET_IMPORT_CLEAR_REQUESTED,
  LOGOUT_USER,
} from '../../constants/actionTypes';
 
const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const importAssetStore = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_USER: {
      return initialState;
    }
    case IMPORT_ASSET_REQUESTED: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        isSuccess:false,
        requested: true,
      };
    }
    case IMPORT_ASSET_PROCESSING: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        isSuccess:false,
        requested: false,
      };
    }
    case IMPORT_ASSET_SUCCESSED: {
      return {
        result: action.data,
        error: null,
        loading: false,
        isSuccess:true,
        requested: false,
      };
    }
    case IMPORT_ASSET_FAILED: {
      return {
        result: null,
        error: action.data,
        loading: false,
        requested: false,
        isSuccess:false,
      };
    }
    case ASSET_IMPORT_CLEAR_REQUESTED:{
      return {
        ...state,
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

export default importAssetStore;