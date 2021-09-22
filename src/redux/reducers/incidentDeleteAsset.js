import {
  INCIDENT_ASSET_DELETE_REQUESTED,
  INCIDENT_ASSET_DELETE_PROCESSING,
  INCIDENT_ASSET_DELETE_SUCCESSED,
  INCIDENT_ASSET_DELETE_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentDeleteAsset = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_ASSET_DELETE_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_ASSET_DELETE_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_ASSET_DELETE_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_ASSET_DELETE_FAILED: {
      return {
        ...state,
        result: {},
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

export default incidentDeleteAsset;
