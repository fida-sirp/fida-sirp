import {
  ASSET_CATEGORIES_LIST_REQUESTED,
  ASSET_CATEGORIES_LIST_PROCESSING,
  ASSET_CATEGORIES_LIST_SUCCESSED,
  ASSET_CATEGORIES_LIST_FAILED,
} from '../../constants/actionTypes';


const initialState = {
  listData: {},
  isUpdated: null,
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const assetCategoriesStore = (state = initialState, action) => {
  switch (action.type) {
    case ASSET_CATEGORIES_LIST_REQUESTED: {
      return {
        ...state,
        listData: {},
        error: null,
        loading: true,
        requested: true,
      };
    }
    case ASSET_CATEGORIES_LIST_PROCESSING: {
      return {
        ...state,
        listData: {},
        error: null,
        loading: true,
        requested: false,
      };
    }
    case ASSET_CATEGORIES_LIST_SUCCESSED: {
      return {
        ...state,
        listData: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case ASSET_CATEGORIES_LIST_FAILED: {
      return {
        ...state,
        listData: {},
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

export default assetCategoriesStore;
