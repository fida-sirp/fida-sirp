import {
  ASSET_RULE_LIST_REQUESTED,
  ASSET_RULE_CREATE_REQUESTED,
  ASSET_RULE_DELETE_REQUESTED,
  ASSET_RULE_EDIT_REQUESTED,
  ASSET_RULE_VIEW_LIST_REQUESTED,
  ASSET_RULE_VIEW_DELETE_REQUESTED,
  ASSET_RULE_VIEW_SAVE_REQUESTED,
  ASSET_RULE_VIEW_SINGLE_DELETE_REQUESTED,
  ASSET_RULE_VIEW_SINGLE_SAVE_REQUESTED,
  ASSET_RULE_VIEW_CLEAR_REQUESTED,
  ASSET_RULE_PLAY_REQUESTED
  
} from '../constants/actionTypes';


export function listAssetRules(page = 1, parameter = '',perPage = 20) {
 
  return {
    type: ASSET_RULE_LIST_REQUESTED,
    payload: { page, parameter, 'per-page':perPage },
  };
}

export function createAssetRule(payload) {
  return {
    type: ASSET_RULE_CREATE_REQUESTED,
    payload,
  };
}

export function deleteAssetRule(id) {
  return {
    type: ASSET_RULE_DELETE_REQUESTED,
    id,
  };
}

export function editAssetRule(payload, id) {
  return {
    type: ASSET_RULE_EDIT_REQUESTED,
    payload:{...payload,id:id},
  };
}

export function getAssetRulesResults(id,pageNo=1,parameter = '', perPage=20) {
  return {
    type: ASSET_RULE_VIEW_LIST_REQUESTED,
    payload:{ id:id, page:pageNo, parameter,'per-page':perPage },
  };
}

export function deleteAssetRuleViewSaga(payload){
  return {
    type: ASSET_RULE_VIEW_DELETE_REQUESTED,
    payload,
  };
}


export function saveAssetRuleView(payload){
  return {
    type: ASSET_RULE_VIEW_SAVE_REQUESTED,
    payload,
  };
}

export function deleteSingleAssetRuleView(id) {
  return {
    type: ASSET_RULE_VIEW_SINGLE_DELETE_REQUESTED,
    id,
  };
}

export function saveSingleAssetRuleView(payload){
  return {
    type: ASSET_RULE_VIEW_SINGLE_SAVE_REQUESTED,
    payload,
  };
}

export function clearAssetRuleView(){
  return {
    type: ASSET_RULE_VIEW_CLEAR_REQUESTED,
  };
}

export function playAssetRule(id){
  return {
    type: ASSET_RULE_PLAY_REQUESTED,
    id
  };
}




