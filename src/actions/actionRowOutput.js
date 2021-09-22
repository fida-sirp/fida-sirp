import { ACTION_ROW_OUTPUT_REQUESTED } from '../constants/actionTypes';

export function getActionRowOutputAction(payload) {
  return {
    type: ACTION_ROW_OUTPUT_REQUESTED,
    payload: payload,
  };
}
