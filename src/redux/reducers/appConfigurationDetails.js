import {
    GET_CONFIGURATION_DETAILS_REQUESTED,
    GET_CONFIGURATION_DETAILS_PROCESSING,
    GET_CONFIGURATION_DETAILS_SUCCESSED,
    GET_CONFIGURATION_DETAILS_FAILED,
} from '../../constants/actionTypes';


const initialState = {
    listData: {},
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const appsConfigurationDetails = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONFIGURATION_DETAILS_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case GET_CONFIGURATION_DETAILS_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case GET_CONFIGURATION_DETAILS_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case GET_CONFIGURATION_DETAILS_FAILED: {
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

export default appsConfigurationDetails;
