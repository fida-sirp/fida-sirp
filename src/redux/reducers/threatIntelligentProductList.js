import { 
    GET_PRODUCT_LIST_FAILED, 
    GET_PRODUCT_LIST_SUCCESSED 
} from "../../constants/actionTypes";

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
};
 
export const threatIntelligenceProductList = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                hasErrors: null,
                isProcessing: true,
                isSuccess: null,
            };
        }
        case GET_PRODUCT_LIST_FAILED: {
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

export default threatIntelligenceProductList;
