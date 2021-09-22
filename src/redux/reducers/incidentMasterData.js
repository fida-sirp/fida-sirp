import {

    INCIDENT_MEMEBER_USER_REQUESTED,
    INCIDENT_MEMEBER_USER_PROCESSING,
    INCIDENT_MEMEBER_USER_SUCCESSED,
    INCIDENT_MEMEBER_USER_FAILED,

    INCIDENT_MEMEBER_USER_GROUP_REQUESTED,
    INCIDENT_MEMEBER_USER_GROUP_PROCESSING,
    INCIDENT_MEMEBER_USER_GROUP_SUCCESSED,
    INCIDENT_MEMEBER_USER_GROUP_FAILED,



  } from '../../constants/actionTypes';
   
  const initialState = {
    users: {},
    userGroups:{},
    singleData:null,
    isUpdated:null,
    isProcessing: null,
    isSuccess: null,
    hasErrors: null,
  };


  export const incidentMasterStore = (state = initialState, action) => {
    switch (action.type) {
        case INCIDENT_MEMEBER_USER_REQUESTED: {
            return {
            ...state,
            users: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case INCIDENT_MEMEBER_USER_PROCESSING: {
            return {
            ...state,
            users: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case INCIDENT_MEMEBER_USER_SUCCESSED: {
           
            return {
                ...state,
                users: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case INCIDENT_MEMEBER_USER_FAILED: {
            return {
                ...state,
                users: {},
                error: action.data,
                loading: false,
                requested: false,
            };
        }

        case INCIDENT_MEMEBER_USER_GROUP_REQUESTED: {
            return {
            ...state,
            userGroups: {},
            error: null,
            loading: true,
            requested: true,
            };
        }
        case INCIDENT_MEMEBER_USER_GROUP_PROCESSING: {
            return {
            ...state,
            userGroups: {},
            error: null,
            loading: true,
            requested: false,
            };
        }
        case INCIDENT_MEMEBER_USER_GROUP_SUCCESSED: {
            return {
                ...state,
                userGroups: action.data,
                error: null,
                loading: false,
                requested: false,
            };
        }
        case INCIDENT_MEMEBER_USER_GROUP_FAILED: {
            return {
                ...state,
                userGroups: {},
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
  
  export default incidentMasterStore;
  