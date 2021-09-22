import {

    ASSET_SYSTEMTYPES_LIST_REQUESTED,
    ASSET_SYSTEMTYPES_LIST_PROCESSING,
    ASSET_SYSTEMTYPES_LIST_SUCCESSED,
    ASSET_SYSTEMTYPES_LIST_FAILED,

    ASSET_NETWORKTYPE_LIST_REQUESTED,
    ASSET_NETWORKTYPE_LIST_PROCESSING,
    ASSET_NETWORKTYPE_LIST_SUCCESSED,
    ASSET_NETWORKTYPE_LIST_FAILED,

    ASSET_POWERSTATUS_LIST_REQUESTED,
    ASSET_POWERSTATUS_LIST_PROCESSING,
    ASSET_POWERSTATUS_LIST_SUCCESSED,
    ASSET_POWERSTATUS_LIST_FAILED,

    ASSET_DOCUMENTTYPE_LIST_REQUESTED,
    ASSET_DOCUMENTTYPE_LIST_PROCESSING,
    ASSET_DOCUMENTTYPE_LIST_SUCCESSED,
    ASSET_DOCUMENTTYPE_LIST_FAILED,

    ASSET_SIEMS_LIST_REQUESTED,
    ASSET_SIEMS_LIST_PROCESSING,
    ASSET_SIEMS_LIST_SUCCESSED,
    ASSET_SIEMS_LIST_FAILED,

    ASSET_ZONE_LIST_REQUESTED,
    ASSET_ZONE_LIST_PROCESSING,
    ASSET_ZONE_LIST_SUCCESSED,
    ASSET_ZONE_LIST_FAILED,

    ASSET_PRODUCT_LIST_REQUESTED,
    ASSET_PRODUCT_LIST_PROCESSING,
    ASSET_PRODUCT_LIST_SUCCESSED,
    ASSET_PRODUCT_LIST_FAILED,

    ASSET_VENDORS_LIST_REQUESTED,
    ASSET_VENDORS_LIST_PROCESSING,
    ASSET_VENDORS_LIST_SUCCESSED,
    ASSET_VENDORS_LIST_FAILED,


    ASSET_SERVER_LIST_REQUESTED,
    ASSET_SERVER_LIST_PROCESSING,
    ASSET_SERVER_LIST_SUCCESSED,
    ASSET_SERVER_LIST_FAILED,


  } from '../../constants/actionTypes';
   
  const initialState = {
    systemTypes: {},
    networkTypes:{},
    powerStatus:{},
    documentTypes:{},
    zones:{},
    products:{},
    vendors:{},
    siemsTypes:{},
    servers:{},
    singleData:null,
    isUpdated:null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };


  export const assetsMasterStore = (state = initialState, action) => {
    switch (action.type) {
        case ASSET_SYSTEMTYPES_LIST_REQUESTED: {
            return {
            ...state,
            systemTypes: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case ASSET_SYSTEMTYPES_LIST_PROCESSING: {
            return {
            ...state,
            systemTypes: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case ASSET_SYSTEMTYPES_LIST_SUCCESSED: {
           
            return {
                ...state,
                systemTypes: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_SYSTEMTYPES_LIST_FAILED: {
            return {
                ...state,
                systemTypes: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }

        case ASSET_NETWORKTYPE_LIST_REQUESTED: {
            return {
            ...state,
            networkTypes: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case ASSET_NETWORKTYPE_LIST_PROCESSING: {
            return {
            ...state,
            networkTypes: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case ASSET_NETWORKTYPE_LIST_SUCCESSED: {
            return {
                ...state,
                networkTypes: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_NETWORKTYPE_LIST_FAILED: {
            return {
                ...state,
                networkTypes: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }

        case ASSET_POWERSTATUS_LIST_REQUESTED: {
            return {
            ...state,
            powerStatus: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case ASSET_POWERSTATUS_LIST_PROCESSING: {
            return {
            ...state,
            powerStatus: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case ASSET_POWERSTATUS_LIST_SUCCESSED: {
            return {
                ...state,
                powerStatus: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_POWERSTATUS_LIST_FAILED: {
            return {
                ...state,
                powerStatus: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }
        case ASSET_DOCUMENTTYPE_LIST_REQUESTED: {
            return {
            ...state,
            documentTypes: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case ASSET_DOCUMENTTYPE_LIST_PROCESSING: {
            return {
            ...state,
            documentTypes: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case ASSET_DOCUMENTTYPE_LIST_SUCCESSED: {
            return {
                ...state,
                documentTypes: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_DOCUMENTTYPE_LIST_FAILED: {
            return {
                ...state,
                documentTypes: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }
        case ASSET_SIEMS_LIST_REQUESTED: {
            return {
                ...state,
                siemsTypes: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case ASSET_SIEMS_LIST_PROCESSING: {
            return {
                ...state,
                siemsTypes: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case ASSET_SIEMS_LIST_SUCCESSED: {
            return {
                ...state,
                siemsTypes: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_SIEMS_LIST_FAILED: {
            return {
                ...state,
                siemsTypes: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }

        case ASSET_ZONE_LIST_REQUESTED: {
            return {
            ...state,
            zones: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case ASSET_ZONE_LIST_PROCESSING: {
            return {
            ...state,
            zones: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case ASSET_ZONE_LIST_SUCCESSED: {
            return {
                ...state,
                zones: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_ZONE_LIST_FAILED: {
            return {
                ...state,
                zones: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }

        case ASSET_PRODUCT_LIST_REQUESTED: {
            return {
            ...state,
            products: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case ASSET_PRODUCT_LIST_PROCESSING: {
            return {
            ...state,
            products: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case ASSET_PRODUCT_LIST_SUCCESSED: {
            return {
                ...state,
                products: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_PRODUCT_LIST_FAILED: {
            return {
                ...state,
                products: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }
        
        case ASSET_VENDORS_LIST_REQUESTED: {
            return {
            ...state,
            vendors: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case ASSET_VENDORS_LIST_PROCESSING: {
            return {
            ...state,
            vendors: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case ASSET_VENDORS_LIST_SUCCESSED: {
            return {
                ...state,
                vendors: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_VENDORS_LIST_FAILED: {
            return {
                ...state,
                vendors: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }
        case ASSET_SERVER_LIST_REQUESTED: {
            return {
            ...state,
            servers: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case ASSET_SERVER_LIST_PROCESSING: {
            return {
            ...state,
            servers: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case ASSET_SERVER_LIST_SUCCESSED: {
            return {
                ...state,
                servers: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ASSET_SERVER_LIST_FAILED: {
            return {
                ...state,
                servers: {},
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
  
  export default assetsMasterStore;
  