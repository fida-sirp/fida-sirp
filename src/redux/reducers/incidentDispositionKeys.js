import {
  INCIDENT_DISPOSITION_KEY_REQUESTED,
  INCIDENT_DISPOSITION_KEY_PROCESSING,
  INCIDENT_DISPOSITION_KEY_SUCCESSED,
  INCIDENT_DISPOSITION_KEY_FAILED,
  INCIDENT_DISPOSITION_FIELD_REQUESTED,
  INCIDENT_DISPOSITION_FIELD_PROCESSING,
  INCIDENT_DISPOSITION_FIELD_SUCCESSED,
  INCIDENT_DISPOSITION_FIELD_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  resultFields: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentDispositionKeys = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_DISPOSITION_KEY_REQUESTED: {
      return {
        ...state,
        result: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_DISPOSITION_KEY_PROCESSING: {
      return {
        ...state,
        result: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_DISPOSITION_KEY_SUCCESSED: {
      return {
        result: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case INCIDENT_DISPOSITION_KEY_FAILED: {
      return {
        result: action.data,
        hasErrors: true,
        isProcessing: false,
        isSuccess: null,
      };
    }
    case INCIDENT_DISPOSITION_FIELD_REQUESTED: {
      return {
        ...state,
        resultFields: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_DISPOSITION_FIELD_PROCESSING: {
      return {
        ...state,
        resultFields: null,
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case INCIDENT_DISPOSITION_FIELD_SUCCESSED: {
      return {
        ...state,
        resultFields: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case INCIDENT_DISPOSITION_FIELD_FAILED: {
      return {
        resultFields: action.data,
        hasErrors: true,
        isProcessing: false,
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

export default incidentDispositionKeys;
