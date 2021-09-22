import {
    APP_CONFIG_FAILED,
    APP_CONFIG_SUCCESSED,
    APP_CONFIG_REQUESTED,
} from '../../constants/actionTypes';


const initialState = {
    listData: {},
    isUpdated: null,
    isFieldLoading: false,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const appConfig = (state = initialState, action) => {
    switch (action.type) {
        case APP_CONFIG_REQUESTED: {
            return {
                ...state,
                listData: {},
                isFieldLoading: true,
                error: null,
                loading: true,
                requested: false,
            };
        }
        case APP_CONFIG_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case APP_CONFIG_FAILED: {
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

export default appConfig;
