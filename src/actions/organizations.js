import {

    ORGANIZATION_LIST_REQUESTED,
    ORGANIZATION_DETAILS_REQUESTED
  } from '../constants/actionTypes';

  
export function listOrganizations() {
    return {
        type: ORGANIZATION_LIST_REQUESTED
    };
}

export function singleOrganization() {
    return {
        type: ORGANIZATION_DETAILS_REQUESTED
    };
}
