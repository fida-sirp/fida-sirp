import {
    UPDATE_APPLICATION_STATUS_REQUESTED,
    UPDATE_APPLICATION_STATUS_PROCESSING,
    UPDATE_APPLICATION_STATUS_SUCCESSED,
    UPDATE_APPLICATION_STATUS_FAILED,
} from '../../constants/actionTypes';


const initialState = {
    listData: {},
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const appsUpdateStatus = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_APPLICATION_STATUS_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case UPDATE_APPLICATION_STATUS_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case UPDATE_APPLICATION_STATUS_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case UPDATE_APPLICATION_STATUS_FAILED: {
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

export default appsUpdateStatus;
