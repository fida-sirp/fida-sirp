import { GET_USERS_REQUESTED } from '../constants/actionTypes';


export function getUsersList() {
  return {
    type: GET_USERS_REQUESTED,
  };
}

export default { getUsersList };
