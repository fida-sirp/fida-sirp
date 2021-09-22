import {
    GET_APPROVAL_FLOW_LIST_REQUESTED,
    GET_APPROVAL_FLOW_LIST_PROCESSING,
    GET_APPROVAL_FLOW_LIST_SUCCESSED,
    GET_APPROVAL_FLOW_LIST_FAILED,
} from '../../constants/actionTypes';


const initialState = {
    listData: {},
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const appApprovalFlowList = (state = initialState, action) => {
    switch (action.type) {
        case GET_APPROVAL_FLOW_LIST_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case GET_APPROVAL_FLOW_LIST_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case GET_APPROVAL_FLOW_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case GET_APPROVAL_FLOW_LIST_FAILED: {
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

export default appApprovalFlowList;
