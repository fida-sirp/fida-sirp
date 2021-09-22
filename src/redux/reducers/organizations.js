import {

    ORGANIZATION_LIST_REQUESTED,
    ORGANIZATION_LIST_PROCESSING,
    ORGANIZATION_LIST_SUCCESSED,
    ORGANIZATION_LIST_FAILED,

} from '../../constants/actionTypes';
 
const initialState = {
    listData: {},
    singleData: null,
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};


export const organizationsStore = (state = initialState, action) => {
    switch (action.type) {
        case ORGANIZATION_LIST_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case ORGANIZATION_LIST_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case ORGANIZATION_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case ORGANIZATION_LIST_FAILED: {
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

export default organizationsStore;
