import { isEmpty } from 'lodash';
import {
  GET_APPS_DETAILS_REQUESTED,
  GET_APPS_DETAILS_PROCESSING,
  GET_APPS_DETAILS_SUCCESSED,
  GET_APPS_DETAILS_FAILED,
  GET_APPS_ACTION_DETAILS_REQUESTED,
  GET_APPS_ACTION_DETAILS_PROCESSING,
  GET_APPS_ACTION_DETAILS_SUCCESSED,
  GET_APPS_ACTION_DETAILS_FAILED,
  GET_APPS_ACTION_WORKFLOW_REQUESTED,
  GET_APPS_ACTION_WORKFLOW_PROCESSING,
  GET_APPS_ACTION_WORKFLOW_SUCCESSED,
  GET_APPS_ACTION_WORKFLOW_FAILED,
  UPDATE_APPS_ACTION_WORKFLOW_UPGRADE_LIST,
  UPDATE_APP_WORKFLOW_TOGGLE,
} from '../../constants/actionTypes';

const initialState = {
  listData: {},
  actionsList: {},
  actionsEditList: [],
  actionLoading: false,
  workFlowList: {},
  isUpdated: null,
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const appsDetails = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPS_DETAILS_REQUESTED: {
      return {
        ...state,
        // listData: {},
        error: null,
        loading: true,
        requested: true,
      };
    }
    case GET_APPS_DETAILS_PROCESSING: {
      return {
        ...state,
        // listData: {},
        error: null,
        loading: true,
        requested: false,
      };
    }
    case GET_APPS_DETAILS_SUCCESSED: {
      return {
        ...state,
        loading: false,
        listData: action.data,
        error: null,
        requested: false,
      };
    }
    case GET_APPS_DETAILS_FAILED: {
      return {
        ...state,
        listData: {},
        error: action.data,
        loading: false,
        requested: false,
      };
    }

    case GET_APPS_ACTION_DETAILS_REQUESTED: {
      return {
        ...state,
        actionLoading: true,
        error: null,
        loading: false,
        requested: true,
      };
    }
    case GET_APPS_ACTION_DETAILS_PROCESSING: {
      return {
        ...state,
        // actionsList: {},
        error: null,
        loading: false,
        requested: false,
      };
    }
    case GET_APPS_ACTION_DETAILS_SUCCESSED: {
      return {
        ...state,
        actionsList: action.data,
        actionLoading: false,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case GET_APPS_ACTION_DETAILS_FAILED: {
      return {
        ...state,
        actionsList: {},
        error: action.data,
        actionLoading: false,
        loading: false,
        requested: false,
      };
    }

    case GET_APPS_ACTION_WORKFLOW_REQUESTED: {
      return {
        ...state,
        error: null,
        requested: true,
      };
    }
    case GET_APPS_ACTION_WORKFLOW_PROCESSING: {
      return {
        ...state,
        error: null,
        requested: false,
      };
    }
    case GET_APPS_ACTION_WORKFLOW_SUCCESSED: {
      return {
        ...state,
        workFlowList: action.data,
        error: null,
        requested: false,
      };
    }
    case GET_APPS_ACTION_WORKFLOW_FAILED: {
      return {
        ...state,
        workFlowList: {},
        error: action.data,
        loading: false,
        requested: false,
      };
    }
    case UPDATE_APPS_ACTION_WORKFLOW_UPGRADE_LIST: {
      state.actionsList.data.items.map(data => {
        if (data.act_id == action.data.id) {
          if (!isEmpty(data.approvalMapping))
            data.approvalMapping.apmWorkflow.apw_name =
              state.workFlowList.data[action.data.payload.app_workflow];
          else
            data.approvalMapping = {
              apmWorkflow: {
                apw_name:
                  state.workFlowList.data[action.data.payload.app_workflow],
              },
            };
        }
      });
      return {
        ...state,
      };
    }

    case UPDATE_APP_WORKFLOW_TOGGLE: {
      if (!isEmpty(state?.listData?.data?.items)) {
        state.listData.data.items.map(data => {
          if (data.app_id === action.payload.id) {
            if (data?.orgApps) {
              data.orgApps.oap_app_status = action.payload.status;
            }
            else {
              const obj = {}
              Object.assign(obj, {
                oap_app_id: action.payload.id,
                oap_app_status: action.payload.status
              })
              data.orgApps = obj;
            }
          }
        });
      }
      return {
        ...state,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

export default appsDetails;
