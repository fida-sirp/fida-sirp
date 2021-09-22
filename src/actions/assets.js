import {
  ASSET_LIST_REQUESTED,
  ASSET_DETAILS_REQUESTED,
  IMPORT_ASSET_REQUESTED,
  ASSET_CREATE_REQUESTED,
  ASSET_DELETE_REQUESTED,
  ASSET_EDIT_REQUESTED,
  ASSET_CLASSIFICATION_LIST_REQUESTED,
  ASSET_OS_LIST_REQUESTED,
  ASSET_TYPE_BY_ID_REQUESTED,
  ASSET_DASHBOARD_REQUESTED,
  ASSET_CATEGORIES_LIST_REQUESTED,
  ASSET_ENABLE_FIELDS_LIST_REQUESTED,
  ASSET_TYPES_LIST_REQUESTED,
  ASSET_CATEGORY_FIELDS_REQUESTED,
  ASSET_TEMPLATE_LIST_REQUESTED,
  ASSET_TEMPLATE_CREATE_REQUESTED,
  ASSET_IMPORT_PROCESS_REQUESTED,
  ASSET_TEMPLATE_DRAFT_REQUESTED,
  ASSET_IMPORT_CLEAR_REQUESTED,
  ASSET_IMPORT_PROCESS_CLEAR_REQUESTED
} from '../constants/actionTypes';



export function listAssets(page = 1, parameter = '', perPage = 20, sort = '') {
  return {
    type: ASSET_LIST_REQUESTED,
    payload: { page, parameter, 'per-page': perPage, sort: sort },
  };
}

export function singleAsset(id) {
  return {
    type: ASSET_DETAILS_REQUESTED,
    id,
  };
}

export function importAsset(file) {
  return {
    type: IMPORT_ASSET_REQUESTED,
    payload: file,
  };
}

export function createAsset(payload) {
  return {
    type: ASSET_CREATE_REQUESTED,
    payload,
  };
}
export function editAsset(payload) {
  return {
    type: ASSET_EDIT_REQUESTED,
    payload,
  };
}

export function deleteAsset(id, page = 1, parameter = '', perPage = 20) {
  return {
    type: ASSET_DELETE_REQUESTED,
    payload: { id, page, parameter, perPage },
  };
}

export function listAssetClassification() {
  return {
    type: ASSET_CLASSIFICATION_LIST_REQUESTED,
  };
}

export function listAssetOS() {
  return {
    type: ASSET_OS_LIST_REQUESTED,
  };
}

export function getAssetTypeById(id) {
 
  return {
    type: ASSET_TYPE_BY_ID_REQUESTED,
    id,
  };
}

export function assetDashboard(id) {
  return {
    type: ASSET_DASHBOARD_REQUESTED,
    id,
  };
}

export function listAssetCategories() {
  return {
    type: ASSET_CATEGORIES_LIST_REQUESTED,
  };
}
export function listAssetEnableFields() {
  return {
    type: ASSET_ENABLE_FIELDS_LIST_REQUESTED,
  };
}

export function listAssetTypes() {
  return {
    type: ASSET_TYPES_LIST_REQUESTED,
  };
}

export function getCategoryFields(field) {
  return {
    type: ASSET_CATEGORY_FIELDS_REQUESTED,
    field
  };
}

export function getAssetTemplates(){
  return {
    type: ASSET_TEMPLATE_LIST_REQUESTED
  }
}

export function createTemplates(payload){
  return {
    type: ASSET_TEMPLATE_CREATE_REQUESTED,
    payload
  }
}

export function assetDraftTemplate(payload){
  return {
    type: ASSET_TEMPLATE_DRAFT_REQUESTED,
    payload
  }
}

export function assetImportProcess(payload){
  return {
    type: ASSET_IMPORT_PROCESS_REQUESTED,
    payload
  }
}


export function clearImportProcess(){
  return {
    type: ASSET_IMPORT_PROCESS_CLEAR_REQUESTED
  }
}

export function clearImport(){
  return {
    type: ASSET_IMPORT_CLEAR_REQUESTED
  }
}


