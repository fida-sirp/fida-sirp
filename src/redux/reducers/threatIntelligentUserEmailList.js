import {
    GET_USER_EMAILS_LIST_FAILED,
    GET_USER_EMAILS_LIST_SUCCESSED
} from "../../constants/actionTypes";

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
};
 
export const threatIntelligentUserEmailList = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_EMAILS_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                hasErrors: null,
                isProcessing: true,
                isSuccess: true,
            };
        }
        case GET_USER_EMAILS_LIST_FAILED: {
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

export default threatIntelligentUserEmailList;
