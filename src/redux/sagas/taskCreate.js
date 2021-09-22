import { put, call, takeLatest } from 'redux-saga/effects';
import {
  SHOW_LOADER,
  HIDE_LOADER,
  INCIDENT_TASK_CREATED_REQUESTED,
  INCIDENT_TASK_CREATED_SUCCESSED,
  INCIDENT_TASK_CREATED_FAILED,
  INCIDENT_TASK_EDIT_REQUESTED,
  INCIDENT_TASK_EDIT_SUCCESSED,
  INCIDENT_TASK_EDIT_FAILED,
  INCIDENT_TASK_LIST_REQUESTED,
  INCIDENT_TASK_LIST_SUCCESSED,
  INCIDENT_TASK_LIST_FAILED,
  SET_FEEDBACK_ALERT,

  INCIDENT_TASK_DELETED_REQUESTED,
  INCIDENT_TASK_DELETED_PROCESSING,
  INCIDENT_TASK_DELETED_SUCCESSED,
  INCIDENT_TASK_DELETED_FAILED,

} from '../../constants/actionTypes';

import { taskCreate, listTasks, editTaskSaga, deleteIncidentTask } from '../../api/taskCreate';
const moduleName = 'Task';

export function* watchCreateTask(action) {
  try {
    yield put({ type: SHOW_LOADER });

    const response = yield call(taskCreate, action.payload);
    if (response.success === true) {
      if (action.payload?.callback) {
        action.payload.callback(response.data);
      }
      yield put({ type: INCIDENT_TASK_CREATED_SUCCESSED, data: response });
    } else {
      yield put({ type: INCIDENT_TASK_CREATED_FAILED, data: null });
    }
    let message = 'Task saved.';

    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: message,
        feedbackType: 'success',
        module: moduleName,
      },
    });
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({
      type: INCIDENT_TASK_CREATED_FAILED,
      data: err?.response?.data?.data,
    });
    yield put({ type: HIDE_LOADER });
  }
}

export function* watchTaskList(action) {
  try {
    const response = yield call(listTasks, action.payload);
    if (response.success === true) {
      if (action.payload?.callback) {
        action.payload.callback(response.data?.data?.[0]);
      }
      yield put({ type: INCIDENT_TASK_LIST_SUCCESSED, data: response });
    } else {
      yield put({ type: INCIDENT_TASK_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({
      type: INCIDENT_TASK_LIST_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchEditList(action) {
  try {
    yield put({ type: SHOW_LOADER });

    const response = yield call(editTaskSaga, action.payload);
    if (response.success === true) {
      if (action.payload?.callback) {
        action.payload.callback(response.data);
      }
      yield put({ type: INCIDENT_TASK_EDIT_SUCCESSED, data: response });
    } else {
      yield put({ type: INCIDENT_TASK_EDIT_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    console.log({ err });
    yield put({ type: HIDE_LOADER });

    yield put({
      type: INCIDENT_TASK_EDIT_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export function* watchDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });

    const response = yield call(deleteIncidentTask, action.payload);
    if (response.success === true) {
      if (action.payload?.callback) {
        action.payload.callback(response.data);
      }

      yield put({ type: INCIDENT_TASK_DELETED_SUCCESSED, data: response });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Task deleted.',
          feedbackType: 'success',
          module: moduleName,
        },
      });
    } else {
      yield put({ type: INCIDENT_TASK_DELETED_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    console.log({ err });
    yield put({ type: HIDE_LOADER });

    yield put({
      type: INCIDENT_TASK_DELETED_FAILED,
      data: err?.response?.data?.data,
    });
  }
}

export default function* watcher() {
  yield takeLatest(INCIDENT_TASK_CREATED_REQUESTED, watchCreateTask);
  yield takeLatest(INCIDENT_TASK_LIST_REQUESTED, watchTaskList);
  yield takeLatest(INCIDENT_TASK_EDIT_REQUESTED, watchEditList);
  yield takeLatest(INCIDENT_TASK_DELETED_REQUESTED, watchDelete);

}
