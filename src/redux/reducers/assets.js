import {
    ASSET_LIST_REQUESTED,
    ASSET_LIST_PROCESSING,
    ASSET_LIST_SUCCESSED,
    ASSET_LIST_FAILED,

    ASSET_CREATE_REQUESTED,
    ASSET_CREATE_PROCESSING,
    ASSET_CREATE_SUCCESSED,
    ASSET_CREATE_FAILED,

    ASSET_EDIT_REQUESTED,
    ASSET_EDIT_PROCESSING,
    ASSET_EDIT_SUCCESSED,
    ASSET_EDIT_FAILED,

    ASSET_DELETE_REQUESTED,
    ASSET_DELETE_PROCESSING,
    ASSET_DELETE_SUCCESSED,
    ASSET_DELETE_FAILED,

    ASSET_DETAILS_REQUESTED,
    ASSET_DETAILS_PROCESSING,
    ASSET_DETAILS_SUCCESSED,
    ASSET_DETAILS_FAILED,

    ASSET_DASHBOARD_REQUESTED,
    ASSET_DASHBOARD_PROCESSING,
    ASSET_DASHBOARD_SUCCESSED,
    ASSET_DASHBOARD_FAILED,

    ASSET_CATEGORY_FIELDS_REQUESTED,
    ASSET_CATEGORY_FIELDS_PROCESSING,
    ASSET_CATEGORY_FIELDS_SUCCESSED,
    ASSET_CATEGORY_FIELDS_FAILED,

    ASSET_TEMPLATE_LIST_REQUESTED,
    ASSET_TEMPLATE_LIST_PROCESSING,
    ASSET_TEMPLATE_LIST_SUCCESSED,
    ASSET_TEMPLATE_LIST_FAILED,



  } from '../../constants/actionTypes';
   
  const initialState = {
    listData: {},
    singleData:null,
    isUpdated:null,
    isCreated:null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
    categoryFields:null,
    isCategoryFieldsLoaded:false,
    dashboardData:null,
    templateList:{},
  };
  
  export const assetsStore = (state = initialState, action) => {
    switch (action.type) {
        case ASSET_LIST_REQUESTED: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case ASSET_LIST_PROCESSING: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case ASSET_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_LIST_FAILED: {
            return {
                ...state,
                listData: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }
        case ASSET_DETAILS_REQUESTED: {
            return {
                ...state,
                singleData: null,
                error: null,
                loading: true,
                requested: true,
            };
        }
        case ASSET_DETAILS_PROCESSING: {
            return {
                ...state,
                singleData: null,
                error: null,
                loading: true,
                requested: false,
            };
        }
        case ASSET_DETAILS_SUCCESSED: {
            return {
                ...state,
                singleData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_DETAILS_FAILED: {
            return {
                ...state,
                singleData: null,
                error: action.data,
                loading: false,
                requested: false,
            };
        }

        case ASSET_DASHBOARD_REQUESTED: {
            return {
                ...state,
                dashboardData: null,
                error: null,
                loading: true,
                requested: true,
            };
        }
        case ASSET_DASHBOARD_PROCESSING: {
            return {
                ...state,
                dashboardData: null,
                error: null,
                loading: true,
                requested: false,
            };
        }
        case ASSET_DASHBOARD_SUCCESSED: {
            return {
                ...state,
                dashboardData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_DASHBOARD_FAILED: {
            return {
                ...state,
                categoryFields: null,
                error: action.data,
                loading: false,
                requested: false,
            };
        }
        case ASSET_CATEGORY_FIELDS_REQUESTED: {
            return {
                ...state,
                categoryFields: null,
                error: null,
                isCategoryFieldsLoaded:false,
                isProcessing: true,
                requested: false,
            };

        }
        case ASSET_CATEGORY_FIELDS_PROCESSING: {
            return {
                ...state,
                dashboardData: null,
                error: null,
                isCategoryFieldsLoaded:false,
                isProcessing: true,
                requested: false,
            };
        }
        case ASSET_CATEGORY_FIELDS_SUCCESSED: {
            return {
                ...state,
                categoryFields: action.data,
                error: null,
                isProcessing: false,
                isCategoryFieldsLoaded:true,
                requested: false,
            };
        }
        case ASSET_CATEGORY_FIELDS_FAILED: {
            return {
                ...state,
                categoryFields: null,
                isCategoryFieldsLoaded:false,
                error: action.data,
                isProcessing: false,
                requested: false,
            };
        }

        case ASSET_TEMPLATE_LIST_REQUESTED: {
            return {
                ...state,
                templateList: {},
                error: null,
                loading: true,
                requested: false,
            };

        }
        case ASSET_TEMPLATE_LIST_PROCESSING: {
            return {
                ...state,
                templateList: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case ASSET_TEMPLATE_LIST_SUCCESSED: {
            return {
                ...state,
                templateList: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_TEMPLATE_LIST_FAILED: {
            return {
                ...state,
                templateList: {},
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

export default assetsStore;
