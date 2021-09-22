import {
    CASES_ADVISORY_LOCATIONS_REQUESTED,
    CASES_ADVISORY_LOCATIONS_PROCESSING,
    CASES_ADVISORY_LOCATIONS_SUCCESSED,
    CASES_ADVISORY_LOCATIONS_FAILED,
} from '../../constants/actionTypes';

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
};

export const threatIntelligenceCaseAdvisoryLocation = (state = initialState, action) => {
    switch (action.type) {
        case CASES_ADVISORY_LOCATIONS_REQUESTED: {
            return {
                ...state,
                listData: null,
                hasErrors: null,
                isProcessing: true,
                isSuccess: null,
            };
        }
        case CASES_ADVISORY_LOCATIONS_PROCESSING: {
            return {
                ...state,
                listData: null,
                hasErrors: null,
                isProcessing: true,
                isSuccess: null,
            };
        }
        case CASES_ADVISORY_LOCATIONS_SUCCESSED: {
            return {
                listData: action.data,
                hasErrors: null,
                isProcessing: false,
                isSuccess: true,
            };
        }
        case CASES_ADVISORY_LOCATIONS_FAILED: {
            return {
                listData: action.data,
                hasErrors: true,
                isProcessing: false,
                isSuccess: null,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default threatIntelligenceCaseAdvisoryLocation;
