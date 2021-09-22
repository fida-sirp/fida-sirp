import {
    OWNER_DETAILS_REQUESTED,
    OWNER_DETAILS_PROCESSING,
    OWNER_DETAILS_SUCCESSED,
    OWNER_DETAILS_FAILED,
    OWNER_LIST_REQUESTED,
    OWNER_LIST_PROCESSING,
    OWNER_LIST_SUCCESSED,
    OWNER_LIST_FAILED,
} from '../../constants/actionTypes';

const initialState = {
    listData: {},
    singleData: null,
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};


export const ownersStore = (state = initialState, action) => {
    switch (action.type) {
        case OWNER_LIST_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case OWNER_LIST_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case OWNER_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case OWNER_LIST_FAILED: {
            return {
                ...state,
                listData: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }
        case OWNER_DETAILS_REQUESTED: {
            return {
                ...state,
                singleData: null,
                error: null,
                loading: true,
                requested: true,
            };
        }
        case OWNER_DETAILS_PROCESSING: {
            return {
                ...state,
                singleData: null,
                error: null,
                loading: true,
                requested: false,
            };
        }
        case OWNER_DETAILS_SUCCESSED: {
            return {
                ...state,
                singleData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case OWNER_DETAILS_FAILED: {
            return {
                ...state,
                singleData: null,
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

export default ownersStore;
