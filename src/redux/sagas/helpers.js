import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {
    CASES_ADVISORY_USERS_REQUESTED, CASES_ADVISORY_USERS_SUCCESSED, CASES_ADVISORY_USERS_FAILED, CASES_ADVISORY_ITEMS_REQUESTED, CASES_ADVISORY_ITEMS_SUCCESSED, CASES_ADVISORY_ITEMS_FAILED,
    CASE_SUB_CATEGORIES_FAILED,
    CASES_SUBDISPOSITIONS_FAILED,
    CASE_SUB_CATEGORIES_SUCCESSED,
    CASES_SUBDISPOSITIONS_SUCCESSED,
    CASE_SUB_CATEGORIES_REQUESTED,
    CASES_SUBDISPOSITIONS_REQUESTED,
    SHOW_LOADER,
    HIDE_LOADER
} from '../../constants/actionTypes';
import { getCaseAdvisoryUsers, getCaseAdvisoryItem, threatIntelligenceCasesSubCategory, threatIntelligenceSubdispositionsSaga } from '../../api/threatIntelligenceSaga';

export function* watchCasesAdvisory() {
    try {
        const ProductSaga = yield call(getCaseAdvisoryUsers);
        if (ProductSaga.success === true) {
            yield put({ type: CASES_ADVISORY_USERS_SUCCESSED, data: ProductSaga?.data });
        } else {
            yield put({ type: CASES_ADVISORY_USERS_FAILED, data: null });
        }
    } catch (err) {
        yield put({ type: CASES_ADVISORY_USERS_FAILED, data: err });
    }
}
export function* watchCasesAdvisoryItems() {
    try {
        const CaseAdvisoryItem = yield call(getCaseAdvisoryItem);
        if (CaseAdvisoryItem.success === true) {
            yield put({ type: CASES_ADVISORY_ITEMS_SUCCESSED, data: CaseAdvisoryItem?.data });
        } else {
            yield put({ type: CASES_ADVISORY_ITEMS_FAILED, data: null });
        }
    } catch (err) {
        yield put({ type: CASES_ADVISORY_ITEMS_FAILED, data: err });
    }
}

export function* watchThreatIntelCasesSubCategory(action) {
    try {
        yield put({ type: SHOW_LOADER });
        const subCategoryItem = yield call(threatIntelligenceCasesSubCategory, action.id);
        yield put({ type: HIDE_LOADER });
        if (subCategoryItem.success === true) {
            yield put({ type: CASE_SUB_CATEGORIES_SUCCESSED, data: subCategoryItem?.data });
        } else {
            yield put({ type: CASE_SUB_CATEGORIES_FAILED, data: null });
        }
    } catch (err) {
        yield put({ type: HIDE_LOADER });
        yield put({ type: CASE_SUB_CATEGORIES_FAILED, data: err });
    }
}
export function* watchSubDispoitions(action) {
    try {
        yield put({ type: SHOW_LOADER });
        const response = yield call(threatIntelligenceSubdispositionsSaga, action.id);
        yield put({ type: HIDE_LOADER });
        if (response.success === true) {
            yield put({ type: CASES_SUBDISPOSITIONS_SUCCESSED, data: response?.data });
        } else {
            yield put({ type: CASES_SUBDISPOSITIONS_FAILED, data: null });
        }
    } catch (err) {
        yield put({ type: HIDE_LOADER });
        yield put({ type: CASES_SUBDISPOSITIONS_FAILED, data: err });
    }
}

export default function* watcher() {
    yield takeLatest(CASES_ADVISORY_USERS_REQUESTED, watchCasesAdvisory);
    yield takeLatest(CASES_ADVISORY_ITEMS_REQUESTED, watchCasesAdvisoryItems);
    yield takeLatest(CASE_SUB_CATEGORIES_REQUESTED, watchThreatIntelCasesSubCategory);
    yield takeLatest(CASES_SUBDISPOSITIONS_REQUESTED, watchSubDispoitions);
}
