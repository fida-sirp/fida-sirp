import {
    UPDATE_ARTIFACT_FAILED,
    UPDATE_ARTIFACT_REQUESTED,
    UPDATE_ARTIFACT_SUCCESSED
} from "../../constants/actionTypes";

const initialState = {
    listData: {},
    isProcessing: false,
    isSuccess: null,
    hasErrors: null,
    loading: false,
};

export const threatIntelligentUpdateArtifacts = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ARTIFACT_REQUESTED: {
            return {
                ...state,
                listData: action.data,
                hasErrors: null,
                loading: true,
                isProcessing: true,
                isSuccess: true,
            };
        }
        case UPDATE_ARTIFACT_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                hasErrors: null,
                loading: false,
                isProcessing: true,
                isSuccess: true,
            };
        }
        case UPDATE_ARTIFACT_FAILED: {
            return {
                ...state,
                listData: null,
                hasErrors: null,
                loading: false,
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

export default threatIntelligentUpdateArtifacts;
