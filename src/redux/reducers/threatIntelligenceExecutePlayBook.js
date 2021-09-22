import {
    EXECUTE_PLAY_BOOK_FAILED,
    EXECUTE_PLAY_BOOK_SUCCESSED,
} from "../../constants/actionTypes";

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
};
 
export const threatIntelligenceExecutePlayBook = (state = initialState, action) => {
    switch (action.type) {
        case EXECUTE_PLAY_BOOK_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                hasErrors: null,
                isProcessing: true,
                isSuccess: true,
            };
        }
        case EXECUTE_PLAY_BOOK_FAILED: {
            return {
                ...state,
                listData: null,
                hasErrors: null,
                isProcessing: true,
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

export default threatIntelligenceExecutePlayBook;
