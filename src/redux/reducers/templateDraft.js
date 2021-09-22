import {
  ASSET_TEMPLATE_DRAFT_REQUESTED,
  ASSET_TEMPLATE_DRAFT_PROCESSING,
  ASSET_TEMPLATE_DRAFT_SUCCESSED,
  ASSET_TEMPLATE_DRAFT_FAILED,
  ASSET_IMPORT_PROCESS_CLEAR_REQUESTED
} from '../../constants/actionTypes';

const initialState = {
  data: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};
 
export const templateDraft = (state = initialState, action) => {
  switch (action.type) {
    case ASSET_TEMPLATE_DRAFT_REQUESTED: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_TEMPLATE_DRAFT_PROCESSING: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_TEMPLATE_DRAFT_SUCCESSED: {
      return {
        data: action.data,
        isProcessing: false,
        isSuccess: true,
        hasErrors: false,
      };
    }
    case ASSET_TEMPLATE_DRAFT_FAILED: {
      return {
        data: action.data,
        isProcessing: false,
        isSuccess: false,
        hasErrors: true,
      };
    }
    case ASSET_IMPORT_PROCESS_CLEAR_REQUESTED:{
      return {
        data: {},
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

export default templateDraft;
