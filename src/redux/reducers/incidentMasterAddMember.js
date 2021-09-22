import {
  INCIDENT_ADD_MEMBER_REQUESTED,
  INCIDENT_ADD_MEMBER_PROCESSING,
  INCIDENT_ADD_MEMBER_SUCCESSED,
  INCIDENT_ADD_MEMBER_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  result: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const incidentMasterAddMember = (state = initialState, action) => {
  switch (action.type) {
    case INCIDENT_ADD_MEMBER_REQUESTED: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: true,
      };
    }
    case INCIDENT_ADD_MEMBER_PROCESSING: {
      return {
        ...state,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case INCIDENT_ADD_MEMBER_SUCCESSED: {
      return {
        ...state,
        result: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case INCIDENT_ADD_MEMBER_FAILED: {
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

export default incidentMasterAddMember;
