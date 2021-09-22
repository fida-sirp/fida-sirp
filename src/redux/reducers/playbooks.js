import {
  PLAYBOOK_LIST_REQUESTED,
  PLAYBOOK_LIST_PROCESSING,
  PLAYBOOK_LIST_SUCCESSED,
  PLAYBOOK_LIST_FAILED,
  PLAYBOOKS_LOGS_REQUESTED,
  PLAYBOOKS_LOGS_PROCESSING,
  PLAYBOOKS_LOGS_SUCCESSED,
  PLAYBOOKS_LOGS_FAILED,
  PLAYBOOK_DUPLICATE_REQUESTED,
  PLAYBOOK_DUPLICATE_SUCCESSED,
  RESET_DUPLICATION_STORE,
  PLAYBOOK_RULES_LIST_REQUESTED,
  PLAYBOOK_RULES_LIST_SUCCESSED,
  PLAYBOOK_RULES_LIST_FAILED,
  PLAYBOOK_CATEOGRY_LIST_REQUESTED,
  PLAYBOOK_CATEOGRY_LIST_SUCCESSED,
  PLAYBOOK_CATEOGRY_LIST_FAILED,
  PLAYBOOK_SUB_CATEOGRY_LIST_REQUESTED,
  PLAYBOOK_SUB_CATEOGRY_LIST_SUCCESSED,
  PLAYBOOK_SUB_CATEOGRY_LIST_FAILED,
  PLAYBOOK_DISPOSITION_LIST_REQUESTED,
  PLAYBOOK_DISPOSITION_LIST_SUCCESSED,
  PLAYBOOK_DISPOSITION_LIST_FAILED,
  PLAYBOOK_SUB_DISPOSITION_LIST_REQUESTED,
  PLAYBOOK_SUB_DISPOSITION_LIST_SUCCESSED,
  PLAYBOOK_SUB_DISPOSITION_LIST_FAILED,
  PLAYBOOK_LOCATION_LIST_REQUESTED,
  PLAYBOOK_LOCATION_LIST_SUCCESSED,
  PLAYBOOK_LOCATION_LIST_FAILED,
  PLAYBOOK_RISK_RATING_LIST_REQUESTED,
  PLAYBOOK_RISK_RATING_LIST_SUCCESSED,
  PLAYBOOK_RISK_RATING_LIST_FAILED,
  PLAYBOOK_QUEUE_LOG_SUCCESSED,
  PLAYBOOK_QUEUE_LOG_FAILED,
  PLAYBOOK_QUEUE_LOG_REQUESTED,
} from '../../constants/actionTypes';

const initialState = {
  playbookDataList: {},
  playbookRulesList: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
  logs: {},
  singleData: {},
  DuplicationSuccess: false,
  categoryList: {},
  subCategoryList: {},
  dispositionList: {},
  subDispositionList: {},
  locationList: {},
  riskRatingList: {},
  playbookQueueLogs: {}
};

export const playbookStore = (state = initialState, action) => {
  switch (action.type) {
    case PLAYBOOK_LIST_REQUESTED: {
      return {
        ...state,
        playbookDataList: {},
        error: null,
        loading: true,
        requested: true,
        logs: {},
      };
    }
    case PLAYBOOK_LIST_PROCESSING: {
      return {
        ...state,
        playbookDataList: {},
        error: null,
        loading: true,
        requested: false,
        logs: {},
      };
    }
    case PLAYBOOK_LIST_SUCCESSED: {
      return {
        ...state,
        playbookDataList: action.data,
        error: null,
        loading: false,
        requested: false,
        logs: {},
      };
    }
    case PLAYBOOK_LIST_FAILED: {
      return {
        ...state,
        playbookDataList: {},
        error: action.data,
        loading: false,
        requested: false,
        logs: {},
      };
    }
    case PLAYBOOKS_LOGS_REQUESTED: {
      return {
        ...state,
        playbookDataList: {},
        error: null,
        loading: true,
        requested: true,
        logs: {},
      };
    }
    case PLAYBOOKS_LOGS_PROCESSING: {
      return {
        ...state,
        playbookDataList: {},
        error: null,
        loading: true,
        requested: false,
        logs: {},
      };
    }
    case PLAYBOOKS_LOGS_SUCCESSED: {
      return {
        ...state,
        playbookDataList: {},
        error: null,
        loading: false,
        requested: false,
        logs: action.data,
      };
    }
    case PLAYBOOKS_LOGS_FAILED: {
      return {
        ...state,
        playbookDataList: {},
        error: action.data,
        loading: false,
        requested: false,
        logs: {},
      };
    }
    case PLAYBOOK_DUPLICATE_SUCCESSED: {
      return {
        ...state,
        DuplicationSuccess: true,
      };
    }
    case RESET_DUPLICATION_STORE: {
      return {
        ...state,
        DuplicationSuccess: false,
      };
    }

    case PLAYBOOK_RULES_LIST_REQUESTED: {
      return {
        ...state,
        playbookRulesList: {},
        error: null,
        loading: true,
        requested: true,
        logs: {},
      };
    }
    case PLAYBOOK_RULES_LIST_SUCCESSED: {
      return {
        ...state,
        playbookRulesList: action.data,
        error: null,
        loading: false,
        requested: false,
        logs: {},
      };
    }
    case PLAYBOOK_RULES_LIST_FAILED: {
      return {
        ...state,
        playbookRulesList: {},
        error: action.data,
        loading: false,
        requested: false,
        logs: {},
      };
    }

    case PLAYBOOK_CATEOGRY_LIST_REQUESTED: {
      return {
        ...state,
        categoryList: {},
      };
    }
    case PLAYBOOK_CATEOGRY_LIST_SUCCESSED: {
      return {
        ...state,
        categoryList: action.data,
      };
    }
    case PLAYBOOK_CATEOGRY_LIST_FAILED: {
      return {
        ...state,
        categoryList: {},
      };
    }

    case PLAYBOOK_SUB_CATEOGRY_LIST_REQUESTED: {
      return {
        ...state,
        subCategoryList: {},
      };
    }
    case PLAYBOOK_SUB_CATEOGRY_LIST_SUCCESSED: {
      return {
        ...state,
        subCategoryList: action.data,
      };
    }
    case PLAYBOOK_SUB_CATEOGRY_LIST_FAILED: {
      return {
        ...state,
        subCategoryList: {},
      };
    }

    case PLAYBOOK_DISPOSITION_LIST_REQUESTED: {
      return {
        ...state,
        dispositionList: {},
      };
    }
    case PLAYBOOK_DISPOSITION_LIST_SUCCESSED: {
      return {
        ...state,
        dispositionList: action.data,
      };
    }
    case PLAYBOOK_DISPOSITION_LIST_FAILED: {
      return {
        ...state,
        dispositionList: {},
      };
    }

    case PLAYBOOK_SUB_DISPOSITION_LIST_REQUESTED: {
      return {
        ...state,
        subDispositionList: {},
      };
    }
    case PLAYBOOK_SUB_DISPOSITION_LIST_SUCCESSED: {
      return {
        ...state,
        subDispositionList: action.data,
      };
    }
    case PLAYBOOK_SUB_DISPOSITION_LIST_FAILED: {
      return {
        ...state,
        subDispositionList: {},
      };
    }

    case PLAYBOOK_LOCATION_LIST_REQUESTED: {
      return {
        ...state,
        locationList: {},
      };
    }
    case PLAYBOOK_LOCATION_LIST_SUCCESSED: {
      return {
        ...state,
        locationList: action.data,
      };
    }
    case PLAYBOOK_LOCATION_LIST_FAILED: {
      return {
        ...state,
        locationList: {},
      };
    }

    case PLAYBOOK_RISK_RATING_LIST_REQUESTED: {
      return {
        ...state,
        riskRatingList: {},
      };
    }
    case PLAYBOOK_RISK_RATING_LIST_SUCCESSED: {
      return {
        ...state,
        riskRatingList: action.data,
      };
    }
    case PLAYBOOK_RISK_RATING_LIST_FAILED: {
      return {
        ...state,
        riskRatingList: {},
      };
    }

    case PLAYBOOK_QUEUE_LOG_REQUESTED: {
      return {
        ...state,
        playbookQueueLogs: {},
        requested: true,
      };
    }
    case PLAYBOOK_QUEUE_LOG_SUCCESSED: {
      return {
        ...state,
        error: null,
        loading: false,
        requested: false,
        playbookQueueLogs: action.data,
      };
    }
    case PLAYBOOK_QUEUE_LOG_FAILED: {
      return {
        ...state,
        requested: false,
        playbookQueueLogs: {},
        error: action.data,
        loading: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default playbookStore;
