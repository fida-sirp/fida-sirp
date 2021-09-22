import { OPEN_CASES_FAILED, OPEN_CASES_REQUESTED, OPEN_CASES_SUCCESSED, OPEN_CASES_RESET } from '../../constants/actionTypes';

const initialState = {
    listData: {},
    singleData: null,
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const threatIntelligenceOpenCase = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_CASES_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case OPEN_CASES_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                isSuccess: true,
                requested: false,
            };
        }
        case OPEN_CASES_FAILED: {
            return {
                ...state,
                listData: {},
                error: action.data,
                loading: false,
                isSuccess: false,
                hasErrors: true,
                requested: false,
            };
        }
        case OPEN_CASES_RESET: {
            return initialState;
        }
        default: {
            return {
                ...state,
            };
        }
    }
}

export default threatIntelligenceOpenCase