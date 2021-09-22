import {
    DAHSBOARD_GET_WIDGET_LIST_REQUESTED,
    DASHBOARD_ADD_REQUESTED,
    DASHBOARD_ADD_WIDGET_REQUESTED,
    DASHBOARD_CREATE_REQUESTED,
    DASHBOARD_DELETE_REQUESTED,
    DASHBOARD_DELETE_SELECTED_WIDGET,
    DASHBOARD_DELETE_WIDGET_REQUESTED,
    DASHBOARD_GET_LIST_REQUESTED,
    DASHBOARD_GET_SINGLE_REQUESTED,
    DASHBOARD_GET_WIDGET_DATA_REQUESTED,
    DASHBOARD_LIST_REQUESTED,
    DASHBOARD_REMOVE_REQUESTED,
    DASHBOARD_SELECTED_WIDGET_LAYOUT,
    DASHBOARD_SELECTED_WIDGET_LIST,
    DASHBOARD_SET_DEFAULT_REQUESTED,
    DASHBOARD_UPDATE_REQUESTED,
    DASHBOARD_UPDATE_WIDGET_REQUESTED,
    DASHBOARD_WIDGET_GET_GROUPS_REQUESTED,
    GET_DASHBOARD_BY_ID_REQUESTED,
    SET_DEFAULT_DASHBOARD_VALUE
} from '../constants/actionTypes';

export const getDashboardList = (payload) => {
    return {
        type: DASHBOARD_GET_LIST_REQUESTED,
        payload
    }
}

export const onGetListOfDashboard = () => {
    return {
        type: DASHBOARD_LIST_REQUESTED,
    }
}

export const onDeleteDashboard = (id) => {
    return {
        type: DASHBOARD_DELETE_REQUESTED,
        id
    }
}


export const onRemoveDashboard = (id) => {
    return {
        type: DASHBOARD_REMOVE_REQUESTED,
        id
    }

}


export const onAddDashboard = (id) => {
    return {
        type: DASHBOARD_ADD_REQUESTED,
        id
    }
}

export const onSetDefaultDashboard = (id, isList, payload = null, history = null, isView) => {
    return {
        type: DASHBOARD_SET_DEFAULT_REQUESTED,
        id,
        isList,
        payload,
        history,
        isView
    }
}
export const setDefaultDashbaord = (payload) => {
    return {
        type: SET_DEFAULT_DASHBOARD_VALUE,
        payload
    }
}

export const onGetwidgetList = (payload) => {
    return {
        type: DAHSBOARD_GET_WIDGET_LIST_REQUESTED,
        payload
    }
}

export const onGetWidgetGroups = () => {
    return {
        type: DASHBOARD_WIDGET_GET_GROUPS_REQUESTED
    }
}

export const onSaveSelectedWidget = (payload) => {
    return {
        type: DASHBOARD_SELECTED_WIDGET_LIST,
        payload
    }
}

export const onDeleteSelectedWidget = (id) => {
    return {
        type: DASHBOARD_DELETE_SELECTED_WIDGET,
        id
    }
}

export const onDashboardWidgetsLayoutChange = (payload) => {
    return {
        type: DASHBOARD_SELECTED_WIDGET_LAYOUT,
        payload
    }
}

// export const onWidgetRemovedId = (payload)=>{
//    return {
//        type: DASHBOARD_REMOVED_WIDGET_ID,
//        payload
//    }
// }

// export const onWidgetAddedId = (payload)=>{
//   return {
//       type: DASHBOARD_ADDED_WIDGET_ID,
//       payload
//   }
// }

export const getDashboardById = (payload, history, isView) => {
    return {
        type: GET_DASHBOARD_BY_ID_REQUESTED,
        payload,
        history,
        isView
    }
}
export const onDashboardCreate = (payload, history) => {
    return {
        type: DASHBOARD_CREATE_REQUESTED,
        payload,
        history
    }
}

export const onDashboardUpdate = (id, payload) => {
    return {
        type: DASHBOARD_UPDATE_REQUESTED,
        id,
        payload
    }
}

export const onGetDashboardWidgetData = (payload) => {
    return {
        type: DASHBOARD_GET_WIDGET_DATA_REQUESTED,
        payload
    }
}

export const onDashboardWidgetAdd = (addWidget, selectedWidget, allLayout = null) => {
    return {
        type: DASHBOARD_ADD_WIDGET_REQUESTED,
        payload: {
            addWidget,
            selectedWidget,
            allLayout
        }
    }
}

export const dashboardWidgetDelete = (payload) => {
    return {
        type: DASHBOARD_DELETE_WIDGET_REQUESTED,
        payload
    }
}

export const dashboardWidgetUpdate = (payload) => {
    return {
        type: DASHBOARD_UPDATE_WIDGET_REQUESTED,
        payload
    }
}


