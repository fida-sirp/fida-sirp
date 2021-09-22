import {
    GET_RUN_PLAY_BOOK_DATA_FAILED,
    GET_RUN_PLAY_BOOK_DATA_SUCCESSED
} from "../../constants/actionTypes";

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
};
 
export const threatIntelligenceRunPlayBook = (state = initialState, action) => {
    switch (action.type) {
        case GET_RUN_PLAY_BOOK_DATA_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                hasErrors: null,
                isProcessing: true,
                isSuccess: true,
            };
        }
        case GET_RUN_PLAY_BOOK_DATA_FAILED: {
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

export default threatIntelligenceRunPlayBook;
