import {
    CASES_ADVISORY_USERS_REQUESTED,
    CASES_ADVISORY_USERS_PROCESSING,
    CASES_ADVISORY_USERS_SUCCESSED,
    CASES_ADVISORY_USERS_FAILED,
    CASES_ADVISORY_ITEMS_REQUESTED,
    CASES_ADVISORY_ITEMS_PROCESSING,
    CASES_ADVISORY_ITEMS_SUCCESSED,
    CASES_ADVISORY_ITEMS_FAILED,
    CASE_SUB_CATEGORIES_REQUESTED,
    CASE_SUB_CATEGORIES_PROCESSING,
    CASE_SUB_CATEGORIES_SUCCESSED,
    CASE_SUB_CATEGORIES_FAILED,
    CASES_SUBDISPOSITIONS_REQUESTED,
    CASES_SUBDISPOSITIONS_PROCESSING,
    CASES_SUBDISPOSITIONS_SUCCESSED,
    CASES_SUBDISPOSITIONS_FAILED,
    OPEN_CASES_REQUESTED,
    OPEN_CASES_PROCESSING,
    OPEN_CASES_SUCCESSED,
    OPEN_CASES_FAILED
} from '../../constants/actionTypes';

const initialState = {
    listData: {},
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const threatIntelligenceCaseAdvisoryUsersList = (state = initialState, action) => {
    switch (action.type) {
        case CASES_ADVISORY_USERS_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case CASES_ADVISORY_USERS_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case CASES_ADVISORY_USERS_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case CASES_ADVISORY_USERS_FAILED: {
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
}
export const threatIntelligenceCaseAdvisoryItems = (state = initialState, action) => {
    switch (action.type) {
        case CASES_ADVISORY_ITEMS_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case CASES_ADVISORY_ITEMS_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case CASES_ADVISORY_ITEMS_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case CASES_ADVISORY_ITEMS_FAILED: {
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
}
export const threatIntelligenceSubcategoriesItems = (state = initialState, action) => {
    switch (action.type) {
        case CASE_SUB_CATEGORIES_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case CASE_SUB_CATEGORIES_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case CASE_SUB_CATEGORIES_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case CASE_SUB_CATEGORIES_FAILED: {
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
}

export const threatIntelligenceSubdispositionscategories = (state = initialState, action) => {
    switch (action.type) {
        case CASES_SUBDISPOSITIONS_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case CASES_SUBDISPOSITIONS_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case CASES_SUBDISPOSITIONS_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case CASES_SUBDISPOSITIONS_FAILED: {
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
}


export default threatIntelligenceCaseAdvisoryUsersList;