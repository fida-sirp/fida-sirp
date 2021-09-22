import {

    INCIDENT_TASK_LIST_REQUESTED,
    INCIDENT_TASK_LIST_PROCESSING,
    INCIDENT_TASK_LIST_SUCCESSED,
    INCIDENT_TASK_LIST_FAILED,

  } from '../../constants/actionTypes';
  
  const initialState = {
    listData: {},
    singleData:null,
    isUpdated:null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };
 

  export const tasksListStore = (state = initialState, action) => {
    switch (action.type) {
        case INCIDENT_TASK_LIST_REQUESTED: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case INCIDENT_TASK_LIST_PROCESSING: {
            return {
            ...state,
            listData: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case INCIDENT_TASK_LIST_SUCCESSED: {
            return {
                ...state,
                listData: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case INCIDENT_TASK_LIST_FAILED: {
            return {
                ...state,
                listData: {},
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
  
  export default tasksListStore;
  