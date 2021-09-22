import {
    UPDATE_ADVERSORY_DETAILS_REQUESTED,
    UPDATE_ADVERSORY_DETAILS_PROCESSING,
    UPDATE_ADVERSORY_DETAILS_FAILED,
    UPDATE_ADVERSORY_DETAILS_SUCCESSED,
    UPDATE_ADVERSORY_DETAILS_RESET,
} from '../../constants/actionTypes';

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
};
 
export const threatIntelligenceUpdateAdversory = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ADVERSORY_DETAILS_REQUESTED: {
            return {
                ...state,
                listData: null,
                hasErrors: null,
                isProcessing: true,
                isSuccess: null,
            };
        }
        case UPDATE_ADVERSORY_DETAILS_PROCESSING: {
            return {
                ...state,
                listData: null,
                hasErrors: null,
                isProcessing: true,
                isSuccess: null,
            };
        }
        case UPDATE_ADVERSORY_DETAILS_SUCCESSED: {
            return {
                listData: action.data,
                hasErrors: null,
                isProcessing: false,
                isSuccess: true,
            };
        }
        case UPDATE_ADVERSORY_DETAILS_FAILED: {
            return {
                listData: action.data,
                hasErrors: true,
                isProcessing: false,
                isSuccess: null,
            };
        }
        case UPDATE_ADVERSORY_DETAILS_RESET: {
            return initialState;
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default threatIntelligenceUpdateAdversory;
