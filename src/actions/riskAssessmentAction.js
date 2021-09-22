import { RISK_ASSESMENT_EXPORT_EXEL_REQUESTED, RISK_ASSESMENT_EXPORT_PDF_REQUESTED, RISK_ASSESMENT_GENERATE_REPORTS_REQUESTED, RISK_ASSESMENT_GET_LIST_REQUESTED, RISK_ASSESMENT_INITIATOR_LIST_REQUESTED, RISK_ASSESMENT_TEMPLATE_LIST_REQUESTED } from '../constants/actionTypes';

export const onGetListofriskAsssment = (payload) => {
    return {
        type: RISK_ASSESMENT_GET_LIST_REQUESTED,
        payload
    }
}

export const onDeleteriskAsssment = (id, payload, query) => {
    return {
        type: RISK_ASSESMENT_DELETE_LIST_REQUESTED,
        id,
        query
    }
}
export const onUpdateRiskAsssment = (id, payload, query) => {
    return {
        type: RISK_ASSESMENT_DELETE_LIST_REQUESTED,
        id,
        payload,
        query
    }
}
export const templateList = () => {
    return {
        type: RISK_ASSESMENT_TEMPLATE_LIST_REQUESTED,
    }
}
export const generatReport = (payload) => {
    return {
        type: RISK_ASSESMENT_GENERATE_REPORTS_REQUESTED,
        payload
    }
}
export const onExportPDF = (payload) => {
    return {
        type: RISK_ASSESMENT_EXPORT_PDF_REQUESTED,
        payload
    }
}
export const onExportExel = (payload) => {
    return {
        type: RISK_ASSESMENT_EXPORT_EXEL_REQUESTED,
        payload
    }
}
export const onGetInitiator = () => {
    return {
        type: RISK_ASSESMENT_INITIATOR_LIST_REQUESTED
    }
}
export const onGetScope = () => {
    return {
        type: RISK_ASSESMENT_SCOPE_LIST_REQUESTED
    }
}





