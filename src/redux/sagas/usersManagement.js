import { put, call, takeLatest } from 'redux-saga/effects';
import {
  SHOW_LOADER,
  HIDE_LOADER,
  GET_USERS_SUCCESSED,
  GET_USERS_FAILED,
  GET_USERS_REQUESTED,
} from '../../constants/actionTypes';

import { getUsersList } from '../../api/usersManagementSaga';
 
export function* watchGetUsersList(action) {
  try {
    const response = yield call(getUsersList, action.payload);
    if (response.success === true) {
      yield put({ type: GET_USERS_SUCCESSED, data: response });
    } else {
      yield put({ type: GET_USERS_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: GET_USERS_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export default function* watcher() {
  yield takeLatest(GET_USERS_REQUESTED, watchGetUsersList);
}
