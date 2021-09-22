import {
  HELP_LIST_REQUESTED,
  HELP_DETAILS_REQUESTED,
} from '../constants/actionTypes';

export function listHelp() {
  return {
    type: HELP_LIST_REQUESTED,
  };
}

export function singleHelp(id) {
  return {
    type: HELP_DETAILS_REQUESTED,
    id,
  };
}

