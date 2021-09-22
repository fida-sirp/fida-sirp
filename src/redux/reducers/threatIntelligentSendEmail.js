import {
    SEND_EMAIL_FAILED,
    SEND_EMAIL_SUCCESSED
} from "../../constants/actionTypes";

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
};
 
export const threatIntelligentSendEmail = (state = initialState, action) => {
    switch (action.type) {
        case SEND_EMAIL_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                hasErrors: null,
                isProcessing: true,
                isSuccess: true,
            };
        }
        case SEND_EMAIL_FAILED: {
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

export default threatIntelligentSendEmail;
