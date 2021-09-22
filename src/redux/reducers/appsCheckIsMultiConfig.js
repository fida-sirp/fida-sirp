import {
  GET_CONFIGURATION_DETAILS_REQUESTED,
  GET_CONFIGURATION_DETAILS_PROCESSING,
  GET_CONFIGURATION_DETAILS_SUCCESSED,
  GET_CONFIGURATION_DETAILS_FAILED,
  CHECK_IS_MULTI_CONFIG_REQUESTED,
  CHECK_IS_MULTI_CONFIG_PROCESSING,
  CHECK_IS_MULTI_CONFIG_SUCCESSED,
  CHECK_IS_MULTI_CONFIG_FAILED,
} from '../../constants/actionTypes';

const initialState = {
  listData: {},
  isUpdated: null,
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
  integrateModalData: {},
};

export const appsCheckIsMultiConfig = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_IS_MULTI_CONFIG_REQUESTED: {
      return {
        ...state,
        listData: {},
        error: null,
        loading: true,
        requested: true,
      };
    }
    case CHECK_IS_MULTI_CONFIG_PROCESSING: {
      return {
        ...state,
        listData: {},
        error: null,
        loading: true,
        requested: false,
      };
    }
    case CHECK_IS_MULTI_CONFIG_SUCCESSED: {
      return {
        ...state,
        listData: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case CHECK_IS_MULTI_CONFIG_FAILED: {
      return {
        ...state,
        listData: {},
        error: action.data,
        loading: false,
        requested: false,
      };
    }

    case GET_CONFIGURATION_DETAILS_REQUESTED: {
      return {
        ...state,
        integrateModalData: {},
        error: null,
        loading: true,
        requested: true,
      };
    }
    case GET_CONFIGURATION_DETAILS_PROCESSING: {
      return {
        ...state,
        integrateModalData: {},
        error: null,
        loading: true,
        requested: false,
      };
    }
    case GET_CONFIGURATION_DETAILS_SUCCESSED: {
      return {
        ...state,
        integrateModalData: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case GET_CONFIGURATION_DETAILS_FAILED: {
      return {
        ...state,
        integrateModalData: {},
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

export default appsCheckIsMultiConfig;
