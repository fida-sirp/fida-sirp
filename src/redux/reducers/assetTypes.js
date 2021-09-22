import {
  ASSET_TYPE_BY_ID_REQUESTED,
  ASSET_TYPE_BY_ID_PROCESSING,
  ASSET_TYPE_BY_ID_SUCCESSED,
  ASSET_TYPE_BY_ID_FAILED,
  ASSET_TYPES_LIST_REQUESTED,
  ASSET_TYPES_LIST_PROCESSING,
  ASSET_TYPES_LIST_SUCCESSED,
  ASSET_TYPES_LIST_FAILED,
} from '../../constants/actionTypes';
 
const initialState = {
  listData: {},
  singleData: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const assetTypeStore = (state = initialState, action) => {
  switch (action.type) {
    case ASSET_TYPE_BY_ID_REQUESTED: {
      return {
        ...state,
        listData: {},
        singleData: {},
        error: null,
        loading: true,
        requested: true,
      };
    }
    case ASSET_TYPE_BY_ID_PROCESSING: {
      return {
        ...state,
        listData: {},
        singleData: {},
        error: null,
        loading: true,
        requested: false,
      };
    }
    case ASSET_TYPE_BY_ID_SUCCESSED: {
      return {
        ...state,
        listData: {},
        singleData: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case ASSET_TYPE_BY_ID_FAILED: {
      return {
        ...state,
        listData: {},
        singleData: {},
        error: action.data,
        loading: false,
        requested: false,
      };
    }
    case ASSET_TYPES_LIST_REQUESTED: {
      return {
        ...state,
        listData: {},
        singleData: {},
        error: null,
        loading: true,
        requested: true,
      };
    }
    case ASSET_TYPES_LIST_PROCESSING: {
      return {
        ...state,
        listData: {},
        singleData: {},
        error: null,
        loading: true,
        requested: false,
      };
    }
    case ASSET_TYPES_LIST_SUCCESSED: {
      return {
        ...state,
        listData: action.data,
        singleData: {},
        error: null,
        loading: false,
        requested: false,
      };
    }
    case ASSET_TYPES_LIST_FAILED: {
      return {
        ...state,
        listData: {},
        singleData: {},
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

export default assetTypeStore;
