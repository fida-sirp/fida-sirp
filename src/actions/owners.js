import {
    OWNER_DETAILS_REQUESTED,
    OWNER_LIST_REQUESTED
  } from '../constants/actionTypes';

  
export function listOwners() {
    return {
        type: OWNER_LIST_REQUESTED
    };
}

export function singleOwner(id) {
    return {
      type: OWNER_DETAILS_REQUESTED,
      id,
    };
}