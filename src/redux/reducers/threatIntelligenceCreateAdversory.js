import {
    THREAT_INTELLIGENCE_CREATE_ADVISORY_REQUESTED,
    THREAT_INTELLIGENCE_CREATE_ADVISORY_PROCESSING,
    THREAT_INTELLIGENCE_CREATE_ADVISORY_SUCCESSED,
    THREAT_INTELLIGENCE_CREATE_ADVISORY_FAILED,
    THREAT_INTELLIGENCE_CREATE_ADVERSORY_DETAILS_RESET
} from '../../constants/actionTypes';

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
};
 
export const threatIntelligenceCreateAdvisory = (state = initialState, action) => {
    switch (action.type) {
        case THREAT_INTELLIGENCE_CREATE_ADVISORY_REQUESTED: {
            return {
                ...state,
                listData: null,
                hasErrors: null,
                isProcessing: true,
                isSuccess: null,
            };
        }
        case THREAT_INTELLIGENCE_CREATE_ADVISORY_PROCESSING: {
            return {
                ...state,
                listData: null,
                hasErrors: null,
                isProcessing: true,
                isSuccess: null,
            };
        }
        case THREAT_INTELLIGENCE_CREATE_ADVISORY_SUCCESSED: {
            return {
                listData: action.data,
                hasErrors: null,
                isProcessing: false,
                isSuccess: true,
            };
        }
        case THREAT_INTELLIGENCE_CREATE_ADVISORY_FAILED: {
            return {
                listData: action.data,
                hasErrors: true,
                isProcessing: false,
                isSuccess: null,
            };
        }
        case THREAT_INTELLIGENCE_CREATE_ADVERSORY_DETAILS_RESET: {
            return initialState;
        }
        default: {
            return {
                ...state,
            };
        }
    }
};

export default threatIntelligenceCreateAdvisory;
