import {
  ASSET_RULE_LIST_REQUESTED,
  ASSET_RULE_LIST_PROCESSING,
  ASSET_RULE_LIST_SUCCESSED,
  ASSET_RULE_LIST_FAILED,
  ASSET_RULE_CREATE_REQUESTED,
  ASSET_RULE_CREATE_PROCESSING,
  ASSET_RULE_CREATE_SUCCESSED,
  ASSET_RULE_CREATE_FAILED,
  ASSET_RULE_EDIT_REQUESTED,
  ASSET_RULE_EDIT_PROCESSING,
  ASSET_RULE_EDIT_SUCCESSED,
  ASSET_RULE_EDIT_FAILED,

  ASSET_RULE_DELETE_REQUESTED,
  ASSET_RULE_DELETE_PROCESSING,
  ASSET_RULE_DELETE_SUCCESSED,
  ASSET_RULE_DELETE_FAILED,

  ASSET_RULE_VIEW_LIST_REQUESTED,
  ASSET_RULE_VIEW_LIST_PROCESSING,
  ASSET_RULE_VIEW_LIST_SUCCESSED,
  ASSET_RULE_VIEW_LIST_FAILED,

  ASSET_RULE_VIEW_DELETE_REQUESTED,
  ASSET_RULE_VIEW_DELETE_PROCESSING,
  ASSET_RULE_VIEW_DELETE_SUCCESSED,
  ASSET_RULE_VIEW_DELETE_FAILED,

  ASSET_RULE_VIEW_SAVE_REQUESTED,
  ASSET_RULE_VIEW_SAVE_PROCESSING,
  ASSET_RULE_VIEW_SAVE_SUCCESSED,
  ASSET_RULE_VIEW_SAVE_FAILED,

  ASSET_RULE_VIEW_SINGLE_DELETE_REQUESTED,
  ASSET_RULE_VIEW_SINGLE_DELETE_PROCESSING,
  ASSET_RULE_VIEW_SINGLE_DELETE_SUCCESSED,
  ASSET_RULE_VIEW_SINGLE_DELETE_FAILED,


  ASSET_RULE_VIEW_SINGLE_SAVE_REQUESTED,
  ASSET_RULE_VIEW_SINGLE_SAVE_PROCESSING,
  ASSET_RULE_VIEW_SINGLE_SAVE_SUCCESSED,
  ASSET_RULE_VIEW_SINGLE_SAVE_FAILED,

  ASSET_RULE_VIEW_CLEAR_REQUESTED,

  ASSET_RULE_PLAY_REQUESTED,
  ASSET_RULE_PLAY_PROCESSING,
  ASSET_RULE_PLAY_SUCCESSED,

  ASSET_RULE_PLAY_FAILED

} from '../../constants/actionTypes';
 
const initialState = {
  listData: {},
  isUpdated: null,
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
  isDeleted:null,
  ruleViewListData:{},
  ruleViewDeleteData:{},
  isRuleViewDeleted:null,
  isRuleSingleViewDeleted:null,
  assetRuleViewSingleDelete:{},
  isRuleViewSaved:null,
  ruleViewSavedData:{},
  isRuleSingleViewSaved:null,
  assetRuleplayData: null,
  isPlayProcessing: null,
  isPlaySuccess: null,
};

export const assetRulesStore = (state = initialState, action) => {
  switch (action.type) {
    case ASSET_RULE_LIST_REQUESTED: {
      return {
        ...state,
        listData: {},
        error: null,
        loading: true,
        requested: true,
      };
    }
    case ASSET_RULE_LIST_PROCESSING: {
      return {
        ...state,
        listData: {},
        error: null,
        loading: true,
        requested: false,
      };
    }
    case ASSET_RULE_LIST_SUCCESSED: {
      return {
        ...state,
        listData: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case ASSET_RULE_LIST_FAILED: {
      return {
        ...state,
        listData: {},
        error: action.data,
        loading: false,
        requested: false,
      };
    }
    case ASSET_RULE_CREATE_REQUESTED: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_RULE_CREATE_PROCESSING: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_RULE_CREATE_SUCCESSED: {
      return {
        ...state,
        data: action.data,
        isProcessing: false,
        isSuccess: true,
        hasErrors: false,
      };
    }
    case ASSET_RULE_CREATE_FAILED: {
      return {
        ...state,
        data: action.data,
        isProcessing: false,
        isSuccess: false,
        hasErrors: true,
      };
    }
    case ASSET_RULE_EDIT_REQUESTED: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        isUpdated:false,
        hasErrors: null,
      };
    }
    case ASSET_RULE_EDIT_PROCESSING: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        isUpdated:false,
        hasErrors: null,
      };
    }
    case ASSET_RULE_EDIT_SUCCESSED: {
      return {
        ...state,
        data: action.data,
        isProcessing: false,
        isSuccess: true,
        isUpdated:true,
        hasErrors: false,
      };
    }
    case ASSET_RULE_EDIT_FAILED: {
      return {
        ...state,
        data: action.data,
        isProcessing: false,
        isSuccess: false,
        isUpdated:false,
        hasErrors: true,
      };
    }
    case ASSET_RULE_DELETE_REQUESTED: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        isDeleted:false,
        hasErrors: null,
      };
    }
    case ASSET_RULE_DELETE_PROCESSING: {
      return {
        ...state,
        data: null,
        isProcessing: true,
        isSuccess: null,
        isDeleted:false,
        hasErrors: null,
      };
    }
    case ASSET_RULE_DELETE_SUCCESSED: {
      return {
        ...state,
        data: action.data,
        isProcessing: false,
        isSuccess: true,
        isDeleted:true,
        hasErrors: false,
      };
    }
    case ASSET_RULE_DELETE_FAILED: {
      return {
        ...state,
        data: action.data,
        isProcessing: false,
        isSuccess: false,
        isDeleted:false,
        hasErrors: true,
      };
    }

    case ASSET_RULE_VIEW_LIST_REQUESTED: {
      return {
        ...state,
        ruleViewListData: {},
        error: null,
        loading: true,
        requested: true,
      };
    }
    case ASSET_RULE_VIEW_LIST_PROCESSING: {
      return {
        ...state,
        ruleViewListData: {},
        error: null,
        loading: true,
        requested: false,
      };
    }
    case ASSET_RULE_VIEW_LIST_SUCCESSED: {
      return {
        ...state,
        ruleViewListData: action.data,
        error: null,
        loading: false,
        requested: false,
      };
    }
    case ASSET_RULE_VIEW_LIST_FAILED: {
      return {
        ...state,
        ruleViewListData: {},
        error: action.data,
        loading: false,
        requested: false,
      };
    }

    case ASSET_RULE_VIEW_DELETE_REQUESTED: {
      return {
        ...state,
        ruleViewDeleteData: {},
        error: null,
        loading: true,
        isRuleViewDeleted:false,
        requested: true,
      };
    }
    case ASSET_RULE_VIEW_DELETE_PROCESSING: {
      return {
        ...state,
        ruleViewDeleteData: {},
        error: null,
        loading: true,
        isRuleViewDeleted:false,
        requested: false,
      };
    }
    case ASSET_RULE_VIEW_DELETE_SUCCESSED: {
      return {
        ...state,
        ruleViewDeleteData: action.data,
        error: null,
        isRuleViewDeleted:true,
        loading: false,
        requested: false,
      };
    }
    case ASSET_RULE_VIEW_DELETE_FAILED: {
      return {
        ...state,
        ruleViewDeleteData: {},
        error: action.data,
        isRuleViewDeleted:false,
        loading: false,
        requested: false,
      };
    }

    case ASSET_RULE_VIEW_SAVE_REQUESTED: {
      return {
        ...state,
        ruleViewSavedData: {},
        error: null,
        loading: true,
        isRuleViewSaved:false,
        requested: true,
      };
    }
    case ASSET_RULE_VIEW_SAVE_PROCESSING: {
      return {
        ...state,
        ruleViewSavedData: {},
        error: null,
        loading: true,
        isRuleViewSaved:false,
        requested: false,
      };
    }
    case ASSET_RULE_VIEW_SAVE_SUCCESSED: {
      return {
        ...state,
        ruleViewSavedData: action.data,
        error: null,
        isRuleViewSaved:true,
        loading: false,
        requested: false,
      };
    }
    case ASSET_RULE_VIEW_SAVE_FAILED: {
      return {
        ...state,
        ruleViewSavedData: {},
        error: action.data,
        isRuleViewSaved:false,
        loading: false,
        requested: false,
      };
    }

    case ASSET_RULE_VIEW_SINGLE_DELETE_REQUESTED: {
      return {
        ...state,
        assetRuleViewSingleDelete: null,
        isProcessing: true,
        isSuccess: null,
        isRuleSingleViewDeleted:false,
        hasErrors: null,
      };
    }
    case ASSET_RULE_VIEW_SINGLE_DELETE_PROCESSING: {
      return {
        ...state,
        assetRuleViewSingleDelete: null,
        isProcessing: true,
        isSuccess: null,
        isRuleSingleViewDeleted:false,
        hasErrors: null,
      };
    }
    case ASSET_RULE_VIEW_SINGLE_DELETE_SUCCESSED: {
      return {
        ...state,
        assetRuleViewSingleDelete: action.data,
        isProcessing: false,
        isSuccess: true,
        isRuleSingleViewDeleted:true,
        hasErrors: false,
      };
    }
    case ASSET_RULE_VIEW_SINGLE_DELETE_FAILED: {
      return {
        ...state,
        assetRuleViewSingleDelete: action.data,
        isProcessing: false,
        isSuccess: false,
        isRuleSingleViewDeleted:false,
        hasErrors: true,
      };
    }

    case ASSET_RULE_VIEW_SINGLE_SAVE_REQUESTED: {
      return {
        ...state,
        assetRuleViewSingleSave: null,
        isProcessing: true,
        isSuccess: null,
        isRuleSingleViewSaved:false,
        hasErrors: null,
      };
    }
    case ASSET_RULE_VIEW_SINGLE_SAVE_PROCESSING: {
      return {
        ...state,
        assetRuleViewSingleSave: null,
        isProcessing: true,
        isSuccess: null,
        isRuleSingleViewSaved:false,
        hasErrors: null,
      };
    }
    case ASSET_RULE_VIEW_SINGLE_SAVE_SUCCESSED: {
      return {
        ...state,
        assetRuleViewSingleSave: action.data,
        isProcessing: false,
        isSuccess: true,
        isRuleSingleViewSaved:true,
        hasErrors: false,
      };
    }
    case ASSET_RULE_VIEW_SINGLE_SAVE_FAILED: {
      return {
        ...state,
        assetRuleViewSingleSave: action.data,
        isProcessing: false,
        isSuccess: false,
        isRuleSingleViewSaved:false,
        hasErrors: true,
      };
    }

    case ASSET_RULE_PLAY_REQUESTED: {
      return {
        ...state,
        assetRuleplayData: null,
        isPlayProcessing: true,
        isPlaySuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_RULE_PLAY_PROCESSING: {
      return {
        ...state,
        assetRuleplayData: null,
        isPlayProcessing: true,
        isPlaySuccess: null,
        hasErrors: null,
      };
    }
    case ASSET_RULE_PLAY_SUCCESSED: {
      return {
        ...state,
        assetRuleplayData: action.data,
        isPlayProcessing: false,
        isPlaySuccess: true,
        hasErrors: false,
      };
    }
    case ASSET_RULE_PLAY_FAILED: {
      return {
        ...state,
        assetRuleplayData: action.data,
        isPlayProcessing: false,
        isPlaySuccess: false,
        hasErrors: true,
      };
    }

    case ASSET_RULE_VIEW_CLEAR_REQUESTED:{
      return {
        ...state,
        isRuleViewDeleted:false,
        isRuleSingleViewDeleted:false,
        isRuleSingleViewSaved:false,
        isRuleViewSaved:false,
        isPlaySuccess:false
      };
    }




    default: {
      return {
        ...state,
      };
    }
  }
};

export default assetRulesStore;
