import {
  THREAT_INTELLIGENCE_DETAILS_LIST_REQUESTED,
  THREAT_INTELLIGENCE_DETAILS_LIST_SUCCESSED,
  THREAT_INTELLIGENCE_DETAILS_LIST_FAILED,
  THREAT_INTELLIGENCE_DETAILS_LIST_PROCESSING,
  ADVISORY_ARTIFACT_RAW_DATA_FAILED,
  ADVISORY_ARTIFACT_RAW_DATA_SUCCESSED,
  ADVISORY_ARTIFACT_RAW_DATA_REQUESTED,
  ADVISORY_ARTIFACT_RAW_DATA_CLEAR,
  UPDATE_DETAILS_ARTIFACT,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_SUCCESSED,
  ADVISORY_DETAILS_PARTIAL_UPDATE_SUCCESSED,
} from '../../constants/actionTypes';
import { rawOutput } from '../sagas/threatIntelligence';

const initialState = {
  listData: {},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
  rawOutput: {},
};

export const threatIntelligenceDetails = (state = initialState, action) => {
  switch (action.type) {
    case THREAT_INTELLIGENCE_DETAILS_LIST_REQUESTED: {
      return {
        ...state,
        listData: null,
        loading: true,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case THREAT_INTELLIGENCE_DETAILS_LIST_PROCESSING: {
      return {
        ...state,
        listData: null,
        loading: true,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case THREAT_INTELLIGENCE_DETAILS_LIST_SUCCESSED: {
      return {
        listData: action.data,
        loading: false,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case THREAT_INTELLIGENCE_DETAILS_LIST_FAILED: {
      return {
        listData: action.data,
        loading: false,
        hasErrors: true,
        isProcessing: false,
        isSuccess: null,
      };
    }
    case ADVISORY_ARTIFACT_RAW_DATA_REQUESTED: {
      return { ...state, rawOutput: {} };
    }
    case ADVISORY_ARTIFACT_RAW_DATA_SUCCESSED: {
      return { ...state, rawOutput: action.data };
    }
    case ADVISORY_ARTIFACT_RAW_DATA_FAILED: {
      return { ...state, rawOutput: {} };
    }
    case ADVISORY_ARTIFACT_RAW_DATA_CLEAR: {
      return { ...state, rawOutput: {} };
    }
    case UPDATE_DETAILS_ARTIFACT: {
      return {
        listData: {
          ...state.listData,
          data: {
            ...state.listData.data,
            ...action?.data
          },
        },
      };
    }
    // case UPDATE_DETAILS_ARTIFACT: {
    //   state.listData.data.advIoc = action.data.advIoc;
    //   return { ...state };
    // }

    case ADVISORY_DETAILS_PARTIAL_UPDATE_SUCCESSED: {
      if (action.label) {
        return {
          listData: {
            ...state.listData,
            data: {
              ...state.listData.data,
              compromisedAssets: action?.response?.compromisedAssets
            },
          },
        };

      } else {
        return {
          listData: {
            ...state.listData,
            data: {
              ...state.listData.data,
              ...action?.data
            },
          },
        };
      }
    }

    default:
      return state;
  }
};

export default threatIntelligenceDetails;
