import {
    MULTI_CONFIG_EXECUTION_FAILED,
    MULTI_CONFIG_EXECUTION_SUCCESSED,
} from "../../constants/actionTypes";

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
};

export const threatIntelligentMultiConfigExecuteAction = (state = initialState, action) => {
    switch (action.type) {
        case MULTI_CONFIG_EXECUTION_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                hasErrors: null,
                isProcessing: true,
                isSuccess: true,
            };
        }
        case MULTI_CONFIG_EXECUTION_FAILED: {
            return {
                ...state,
                listData: null,
                hasErrors: null,
                isProcessing: true,
                isSuccess: false,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default threatIntelligentMultiConfigExecuteAction;
