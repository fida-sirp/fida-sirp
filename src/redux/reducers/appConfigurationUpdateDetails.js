import {
    UPDATE_CONFIGURATION_FILEDS_DETAILS_REQUESTED,
    UPDATE_CONFIGURATION_FILEDS_DETAILS_PROCESSING,
    UPDATE_CONFIGURATION_FILEDS_DETAILS_SUCCESSED,
    UPDATE_CONFIGURATION_FILEDS_DETAILS_FAILED,
} from '../../constants/actionTypes';


const initialState = {
    listData: {},
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const appConfigurationUpdateDetails = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CONFIGURATION_FILEDS_DETAILS_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case UPDATE_CONFIGURATION_FILEDS_DETAILS_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case UPDATE_CONFIGURATION_FILEDS_DETAILS_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case UPDATE_CONFIGURATION_FILEDS_DETAILS_FAILED: {
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

export default appConfigurationUpdateDetails;
