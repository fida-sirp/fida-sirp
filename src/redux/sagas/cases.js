import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';
import {
  CASES_LIST_SUCCESSED,
  CASES_LIST_FAILED,
  CASES_LIST_REQUESTED,
  FILTERED_CASES_REQUESTED,
  FILTERED_CASES_SUCCESSED,
  FILTERED_CASES_FAILED,
  DELETE_CASE_REQUESTED,
  DELETE_CASE_FAILED,
  DELETE_CASE_SUCCESSED,
  CATEGORY_FILTER_REQUESTED,
  CATEGORY_FILTER_SUCCESSED,
  CATEGORY_FILTER_FAILED,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../../constants/actionTypes';
import {
  casesSaga,
  filterSaga,
  deleteSaga,
  categorySaga,
} from '../../api/casesSaga';


const openNotification = (title,description) => {
  notification.open({
    message: title,
    description:
    description,
    onClick: () => {
      
    },
  });
};

export function* watchCasesList(action) {
  try {
    const casesData = yield call(casesSaga, action.payload, action.api);

    if (casesData.success === true) {
      yield put({ type: CASES_LIST_SUCCESSED, data: casesData });
      yield put({ type: HIDE_LOADER });
    } else {
      yield put({ type: CASES_LIST_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: CASES_LIST_FAILED, data: err?.response?.data?.data });
  }
}

export function* watchFilteredCasesList(action) {
  try {
    console.log('SagaFilterPage', action.pathString);
    const filterData = yield call(filterSaga, action.pathString);

    if (filterData.success === true) {
      yield put({ type: FILTERED_CASES_SUCCESSED, data: filterData });
    } else {
      yield put({ type: FILTERED_CASES_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: FILTERED_CASES_FAILED, data: err });
  }
}

export function* watchDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const deleteCaseData = yield call(deleteSaga, action.id, action.activeTab);

    if (deleteCaseData.success === true) {
      yield put({ type: DELETE_CASE_SUCCESSED, data: deleteCaseData });
      openNotification('Case has been deleted Successfully');
     // yield put(listCases(action.pageNo));

    } else {
      yield put({ type: DELETE_CASE_FAILED, data: null });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: DELETE_CASE_FAILED, data: err?.response?.data?.data });
  }
}


export function* watchCategoryFilter(action) {
  try {
    const categoryData = yield call(categorySaga, action.id);

    if (categoryData.success === true) {
      yield put({ type: CATEGORY_FILTER_SUCCESSED, data: categoryData });
    } else {
      yield put({ type: CATEGORY_FILTER_FAILED, data: null });
    }
  } catch (err) {
    yield put({ type: CATEGORY_FILTER_FAILED, data: err });
  }
}

export default function* watcher() {
  yield takeLatest(CASES_LIST_REQUESTED, watchCasesList);
  yield takeEvery(FILTERED_CASES_REQUESTED, watchFilteredCasesList);
  yield takeLatest(DELETE_CASE_REQUESTED, watchDelete);
  yield takeLatest(CATEGORY_FILTER_REQUESTED, watchCategoryFilter);
}
