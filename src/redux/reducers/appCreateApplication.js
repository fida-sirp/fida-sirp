import {
    CREATE_APPLICATION_REQUESTED,
    CREATE_APPLICATION_PROCESSING,
    CREATE_APPLICATION_SUCCESSED,
    CREATE_APPLICATION_FAILED,
} from '../../constants/actionTypes';


const initialState = {
    listData: {},
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const appCreateApplication = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_APPLICATION_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case CREATE_APPLICATION_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case CREATE_APPLICATION_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case CREATE_APPLICATION_FAILED: {
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

export default appCreateApplication;
