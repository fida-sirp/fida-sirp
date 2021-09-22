import {
  ASSET_IMPORT_PROCESS_REQUESTED,
  ASSET_IMPORT_PROCESS_PROCESSING,
  ASSET_IMPORT_PROCESS_SUCCESSED,
  ASSET_IMPORT_PROCESS_FAILED,
  ASSET_IMPORT_PROCESS_CLEAR_REQUESTED
} from '../../constants/actionTypes';


const initialState = {
  data: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const assetImportProcess = (state = initialState, action) => {
  switch (action.type) {
    case ASSET_IMPORT_PROCESS_REQUESTED: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: false,
        hasErrors: null,
      };
    }
    case ASSET_IMPORT_PROCESS_PROCESSING: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: false,
        hasErrors: null,
      };
    }
    case ASSET_IMPORT_PROCESS_SUCCESSED: {
      return {
        ...state,
        data: action.data,
        isProcessing: false,
        isSuccess: true,
        hasErrors: false,
      };
    }
    case ASSET_IMPORT_PROCESS_FAILED: {
      return {
        ...state,
        data: action.data,
        isProcessing: false,
        isSuccess: false,
        hasErrors: true,
      };
    }
    case ASSET_IMPORT_PROCESS_CLEAR_REQUESTED:{
        return { data: {},
        isProcessing: null,
        isSuccess: null,
        hasErrors: null,
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default assetImportProcess;
