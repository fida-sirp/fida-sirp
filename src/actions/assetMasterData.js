import {
    ASSET_SYSTEMTYPES_LIST_REQUESTED,
    ASSET_NETWORKTYPE_LIST_REQUESTED,
    ASSET_POWERSTATUS_LIST_REQUESTED,
    ASSET_DOCUMENTTYPE_LIST_REQUESTED,
    ASSET_SIEMS_LIST_REQUESTED,
    ASSET_ZONE_LIST_REQUESTED,
    ASSET_PRODUCT_LIST_REQUESTED,
    ASSET_VENDORS_LIST_REQUESTED,
    ASSET_SERVER_LIST_REQUESTED

  } from '../constants/actionTypes';

  
export function listAssetSystemTypes() {
    return {
        type: ASSET_SYSTEMTYPES_LIST_REQUESTED
    };
}

export function listAssetNetWorkTypes() {
    return {
        type: ASSET_NETWORKTYPE_LIST_REQUESTED
    };
}

export function listAssetPowerStatus() {
    return {
        type: ASSET_POWERSTATUS_LIST_REQUESTED
    };
}

export function listAssetDocumentTypes() {
    return {
        type: ASSET_DOCUMENTTYPE_LIST_REQUESTED
    };
}

export function listAssetSiems() {
    return {
        type: ASSET_SIEMS_LIST_REQUESTED
    };
}

export function listAssetZones() {
    return {
        type: ASSET_ZONE_LIST_REQUESTED
    };
}

export function listAssetProducts() {
    return {
        type: ASSET_PRODUCT_LIST_REQUESTED
    };
}

export function listAssetVendors() {
    return {
        type: ASSET_VENDORS_LIST_REQUESTED
    };
}

export function listAssetServer() {
    return {
        type: ASSET_SERVER_LIST_REQUESTED
    };
}







