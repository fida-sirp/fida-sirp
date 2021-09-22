import {
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_REQUESTED,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_PROCESSING,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_SUCCESSED,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_FAILED,
  UPDATE_PARTIAL_THREAT_INTELLIGENCE_RESET,
} from '../../constants/actionTypes';

const initialState = {
  result: null,
  error: null,
  loading: false,
  requested: false,
  isSuccess: null,
};

export const threatIntelligencePartialUpdate = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PARTIAL_THREAT_INTELLIGENCE_REQUESTED: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        requested: true,
        isSuccess: null,
      };
    }
    case UPDATE_PARTIAL_THREAT_INTELLIGENCE_PROCESSING: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        requested: false,
        isSuccess: null,
      };
    }
    case UPDATE_PARTIAL_THREAT_INTELLIGENCE_SUCCESSED: {
      return {
        result: action.data,
        error: null,
        loading: false,
        requested: false,
        isSuccess: true,
      };
    }
    case UPDATE_PARTIAL_THREAT_INTELLIGENCE_FAILED: {
      return {
        result: null,
        error: action.data,
        loading: false,
        requested: false,
        isSuccess: null,
      };
    }
    case UPDATE_PARTIAL_THREAT_INTELLIGENCE_RESET: {
      return initialState;
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default threatIntelligencePartialUpdate;
