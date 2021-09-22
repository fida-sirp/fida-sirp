import {
    GET_CONFIGURATION_FIELD_VALUE_REQUESTED,
    GET_CONFIGURATION_FIELD_VALUE_PROCESSING,
    GET_CONFIGURATION_FIELD_VALUE_SUCCESSED,
    GET_CONFIGURATION_FIELD_VALUE_FAILED,
} from '../../constants/actionTypes';


const initialState = {
    listData: {},
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const appConfigurationFieldsData = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONFIGURATION_FIELD_VALUE_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case GET_CONFIGURATION_FIELD_VALUE_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case GET_CONFIGURATION_FIELD_VALUE_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case GET_CONFIGURATION_FIELD_VALUE_FAILED: {
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

export default appConfigurationFieldsData;
