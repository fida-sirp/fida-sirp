import {
  AUTOMATION_LIST_SUCCESSED,
  AUTOMATION_LIST_REQUESTED,
  AUTOMATION_LIST_FAILED,
  AUTOMATION_DETAILS_LIST_REQUESTED,
  AUTOMATION_DETAILS_LIST_SUCCESSED,
  AUTOMATION_DETAILS_LIST_FAILED,
  GET_AUTOMATION_APPLICATION_LIST_REQUESTED,
  GET_AUTOMATION_ACTION_LIST_REQUESTED,
  GET_AUTOMATION_INPUT_LIST_REQUESTED,
  GET_AUTOMATION_APPLICATION_LIST_SUCCESSED,
  GET_AUTOMATION_APPLICATION_LIST_FAILED,
  GET_AUTOMATION_ACTION_LIST_SUCCESSED,
  GET_AUTOMATION_ACTION_LIST_FAILED,
  GET_AUTOMATION_INPUT_LIST_SUCCESSED,
  GET_AUTOMATION_INPUT_LIST_FAILED,
  AUTOMATION_ARTIFACT_LIST_REQUESTED,
  AUTOMATION_ARTIFACT_LIST_SUCCESSED,
  AUTOMATION_ARTIFACT_LIST_FAILED,
  AUTOMATION_ARTIFACT_TYPE_LIST_REQUESTED,
  AUTOMATION_ARTIFACT_TYPE_LIST_SUCCESSED,
  AUTOMATION_ARTIFACT_TYPE_LIST_FAILED,
  AUTOMATION_APPROVAL_LIST_REQUESTED,
  AUTOMATION_APPROVAL_LIST_SUCCESSED,
  AUTOMATION_APPROVAL_LIST_FAILED,
  GET_AUTOMATION_EXECUTION_APPLICATION_LIST_SUCCESSED,
  GET_AUTOMATION_EXECUTION_APPLICATION_LIST_FAILED,
  GET_AUTOMATION_EXECUTION_APPLICATION_LIST_REQUESTED,
  GET_AUTOMATION_EXECUTION_ACTION_LIST_REQUESTED,
  GET_AUTOMATION_EXECUTION_ACTION_LIST_SUCCESSED,
  GET_AUTOMATION_EXECUTION_ACTION_LIST_FAILED,
  AUTOMATION_ARTIFACT_OCCURENCE_LIST_REQUESTED,
  AUTOMATION_ARTIFACT_OCCURENCE_LIST_SUCCESSED,
  AUTOMATION_ARTIFACT_OCCURENCE_LIST_FAILED,
  RESET_AUTOMATION_STORE,
} from '../../constants/actionTypes';

const initialState = {
  listData: {},
  artifactsData: {},
  approvalsData: {},
  isProcessing: false,
  isSuccess: null,
  hasErrors: null,
  userData: {},
  applicationData: [],
  isFieldLoading: false,
  actionData: [],
  inputData: [],
  artifactsTypeData: [],
  executionApplicationData: [],
  executionActionData: [],
  occurenceLoading: false,
  occurenceList: {},
};

export const automation = (state = initialState, action) => {
  switch (action.type) {
    case AUTOMATION_LIST_REQUESTED: {
      return {
        ...state,
        listData: {},
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case AUTOMATION_LIST_SUCCESSED: {
      return {
        ...state,
        listData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case AUTOMATION_LIST_FAILED: {
      return {
        ...state,
        listData: null,
        hasErrors: null,
        isProcessing: false,
        isSuccess: null,
      };
    }
    case AUTOMATION_DETAILS_LIST_REQUESTED: {
      return {
        ...state,
        userData: {},
        hasErrors: null,
        isProcessing: false,
        isSuccess: null,
      };
    }
    case AUTOMATION_DETAILS_LIST_SUCCESSED: {
      return {
        ...state,
        userData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case AUTOMATION_DETAILS_LIST_FAILED: {
      return {
        ...state,
        userData: null,
        hasErrors: null,
        isProcessing: false,
        isSuccess: null,
      };
    }

    case GET_AUTOMATION_APPLICATION_LIST_REQUESTED: {
      return {
        ...state,
        applicationData: [],
        hasErrors: null,
        isFieldLoading: true,
        // isProcessing: true,
        isSuccess: null,
      };
    }
    case GET_AUTOMATION_APPLICATION_LIST_SUCCESSED: {
      return {
        ...state,
        applicationData: action.data,
        hasErrors: null,
        isFieldLoading: false,
        // isProcessing: false,
        isSuccess: true,
      };
    }
    case GET_AUTOMATION_APPLICATION_LIST_FAILED: {
      return {
        ...state,
        applicationData: [],
        hasErrors: null,
        isFieldLoading: false,
        // isProcessing: false,
        isSuccess: null,
      };
    }



    case GET_AUTOMATION_ACTION_LIST_REQUESTED: {
      return {
        ...state,
        actionData: [],
        isFieldLoading: true,
        hasErrors: null,
        isSuccess: null,
      };
    }
    case GET_AUTOMATION_ACTION_LIST_SUCCESSED: {
      return {
        ...state,
        actionData: action.data,
        isFieldLoading: false,
        hasErrors: null,
        isSuccess: true,
      };
    }
    case GET_AUTOMATION_ACTION_LIST_FAILED: {
      return {
        ...state,
        actionData: [],
        hasErrors: null,
        isFieldLoading: false,
        isSuccess: null,
      };
    }

    case GET_AUTOMATION_INPUT_LIST_REQUESTED: {
      return {
        ...state,
        inputData: [],
        isFieldLoading: true,
        hasErrors: null,
        isSuccess: null,
      };
    }
    case GET_AUTOMATION_INPUT_LIST_SUCCESSED: {
      return {
        ...state,
        inputData: action.data,
        hasErrors: null,
        isFieldLoading: false,
        isSuccess: true,
      };
    }
    case GET_AUTOMATION_INPUT_LIST_FAILED: {
      return {
        ...state,
        inputData: [],
        isFieldLoading: false,
        hasErrors: null,
        isSuccess: null,
      };
    }


    case AUTOMATION_ARTIFACT_LIST_REQUESTED: {
      return {
        ...state,
        artifactsData: {},
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case AUTOMATION_ARTIFACT_LIST_SUCCESSED: {
      return {
        ...state,
        artifactsData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case AUTOMATION_ARTIFACT_LIST_FAILED: {
      return {
        ...state,
        artifactsData: {},
        hasErrors: null,
        isProcessing: false,
        isSuccess: null,
      };
    }

    case AUTOMATION_ARTIFACT_TYPE_LIST_REQUESTED: {
      return {
        ...state,
        artifactsTypeData: {},
        hasErrors: null,
        isProcessing: true,
        isSuccess: null,
      };
    }
    case AUTOMATION_ARTIFACT_TYPE_LIST_SUCCESSED: {
      return {
        ...state,
        artifactsTypeData: action.data,
        hasErrors: null,
        isProcessing: false,
        isSuccess: true,
      };
    }
    case AUTOMATION_ARTIFACT_TYPE_LIST_FAILED: {
      return {
        ...state,
        artifactsData: {},
        hasErrors: null,
        isProcessing: false,
        isSuccess: null,
      };
    }

    case GET_AUTOMATION_EXECUTION_APPLICATION_LIST_REQUESTED: {
      return {
        ...state,
        executionApplicationData: {},
        isFieldLoading: true,
        hasErrors: null,
        isSuccess: null,
      };
    }
    case GET_AUTOMATION_EXECUTION_APPLICATION_LIST_SUCCESSED: {
      return {
        ...state,
        executionApplicationData: action.data,
        hasErrors: null,
        isFieldLoading: false,
        isSuccess: true,
      };
    }
    case GET_AUTOMATION_EXECUTION_APPLICATION_LIST_FAILED: {
      return {
        ...state,
        executionApplicationData: {},
        hasErrors: null,
        isSuccess: null,
        isFieldLoading: false,
      };
    }

    case GET_AUTOMATION_EXECUTION_ACTION_LIST_REQUESTED: {
      return {
        ...state,
        executionActionData: {},
        isFieldLoading: true,
        hasErrors: null,
        isSuccess: null,
      };
    }
    case GET_AUTOMATION_EXECUTION_ACTION_LIST_SUCCESSED: {
      return {
        ...state,
        executionActionData: action.data,
        hasErrors: null,
        isFieldLoading: false,
        isSuccess: true,
      };
    }
    case GET_AUTOMATION_EXECUTION_ACTION_LIST_FAILED: {
      return {
        ...state,
        executionActionData: {},
        hasErrors: null,
        isFieldLoading: false,
        isSuccess: null,
      };
    }

    case AUTOMATION_APPROVAL_LIST_REQUESTED: {
      return {
        ...state,
        approvalsData: {},
        hasErrors: null,
        isSuccess: null,
      };
    }
    case AUTOMATION_APPROVAL_LIST_SUCCESSED: {
      return {
        ...state,
        approvalsData: action.data,
        hasErrors: null,
        isSuccess: true,
      };
    }
    case AUTOMATION_APPROVAL_LIST_FAILED: {
      return {
        ...state,
        approvalsData: {},
        hasErrors: null,
        isSuccess: null,
      };
    }
    case AUTOMATION_ARTIFACT_OCCURENCE_LIST_REQUESTED: {
      return {
        ...state,
        occurenceLoading: true,
        occurenceList: {},
      };
    }
    case AUTOMATION_ARTIFACT_OCCURENCE_LIST_SUCCESSED: {
      return {
        ...state,
        occurenceLoading: false,
        occurenceList: action.data,
      };
    }
    case AUTOMATION_ARTIFACT_OCCURENCE_LIST_FAILED: {
      return {
        ...state,
        occurenceLoading: false,
        occurenceList: {},
      };
    }

    case RESET_AUTOMATION_STORE: {
      return {
        ...state,
        applicationData: [],
        actionData: [],
        inputData: [],
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default automation;
