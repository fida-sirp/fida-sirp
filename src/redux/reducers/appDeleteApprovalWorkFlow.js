import {
    DELETE_APPROVAL_WORKFLOW_REQUESTED,
    DELETE_APPROVAL_WORKFLOW_PROCESSING,
    DELETE_APPROVAL_WORKFLOW_SUCCESSED,
    DELETE_APPROVAL_WORKFLOW_FAILED,
} from '../../constants/actionTypes';


const initialState = {
    listData: {},
    isUpdated: null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
};

export const appDeleteApprovalWorkFlow = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_APPROVAL_WORKFLOW_REQUESTED: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: true,
            };
        }
        case DELETE_APPROVAL_WORKFLOW_PROCESSING: {
            return {
                ...state,
                listData: {},
                error: null,
                loading: true,
                requested: false,
            };
        }
        case DELETE_APPROVAL_WORKFLOW_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case DELETE_APPROVAL_WORKFLOW_FAILED: {
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

export default appDeleteApprovalWorkFlow;
