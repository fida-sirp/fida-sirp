import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  DASHBOARD_GET_LIST_SUCCESSED,
  DASHBOARD_GET_LIST_REQUESTED,
  DASHBOARD_GET_LIST_FAILED,
  DASHBOARD_DELETE_REQUESTED,
  DASHBOARD_REMOVE_REQUESTED,
  SHOW_LOADER,
  HIDE_LOADER,
  DASHBOARD_REMOVE_SUCCESSED,
  DASHBOARD_DELETE_SUCCESSED,
  DASHBOARD_ADD_SUCCESSED,
  DASHBOARD_ADD_REQUESTED,
  DASHBOARD_ADD_FAILED,
  DASHBOARD_DELETE_FAILED,
  DASHBOARD_SET_DEFAULT_REQUESTED,
  DASHBOARD_SET_DEFAULT_FAILED,
  DASHBOARD_SET_DEFAULT_SUCCESSED,
  DASHBOARD_REMOVE_FAILED,
  SET_FEEDBACK_ALERT,
  DAHSBOARD_GET_WIDGET_LIST_REQUESTED,
  DAHSBOARD_GET_WIDGET_LIST_FAILED,
  DAHSBOARD_GET_WIDGET_LIST_SUCCESSED,
  DASHBOARD_WIDGET_GET_GROUPS_REQUESTED,
  DASHBOARD_WIDGET_GET_GROUPS_SUCCESSES,
  DASHBOARD_WIDGET_GET_GROUPS_FAIELD,
  GET_DASHBOARD_BY_ID_REQUESTED,
  GET_DASHBOARD_BY_ID_SUCCESSED,
  GET_DASHBOARD_BY_ID_FAILED,
  DASHBOARD_CREATE_REQUESTED,
  DASHBOARD_CREATE_SUCCESSED,
  DASHBOARD_CREATE_FAILED,
  DASHBOARD_UPDATE_REQUESTED,
  DASHBOARD_UPDATE_SUCCESSED,
  DASHBOARD_UPDATE_FAILED,
  DASHBOARD_GET_WIDGET_DATA_REQUESTED,
  DASHBOARD_GET_WIDGET_DATA_SUCCESSED,
  DASHBOARD_GET_WIDGET_DATA_FAILED,
  DASHBOARD_ADD_WIDGET_REQUESTED,
  DASHBOARD_ADD_WIDGET_FAILED,
  DASHBOARD_ADD_WIDGET_SUCCESSED,
  DASHBOARD_UPDATE_WIDGET_REQUESTED,
  DASHBOARD_DELETE_WIDGET_REQUESTED,
  DASHBOARD_DELETE_WIDGET_SUCCESSED,
  DASHBOARD_DELETE_WIDGET_FAILED,
  DASHBOARD_UPDATE_WIDGET_SUCCESSED,
  DASHBOARD_UPDATE_WIDGET_FAILED,
  DASHBOARD_LIST_SUCCESSED,
  DASHBOARD_LIST_FAILED,
  DASHBOARD_LIST_REQUESTED,
} from '../../constants/actionTypes';

import {
  dashboardWidgetGetGroupList,
  dashboardAddAPI,
  dashboardDeleteAPI,
  dashboardGetWidgetList,
  dashboardListAPI,
  dashboardRemoveAPI,
  dashboardSetDefaultAPI,
  getDashboardByIdAPI,
  dashboardCreateAPI,
  dashboardUpdateAPI,
  dashboardGetWidgetDataAPI,
  dashboardAddWidget,
  dashboardDeleteWidget,
  dashboardUpdateWidget,
  dashboardList
} from '../../api/dashboardAPI';

import {
  dashboardWidgetUpdate,
  getDashboardById,
  getDashboardList,
  onDashboardWidgetAdd,
  onDashboardWidgetsLayoutChange,
  onDeleteSelectedWidget,
  onGetWidgetGroups,
  onGetwidgetList,
  onSaveSelectedWidget,

} from '../../actions/dashboard';
import { getUserProfile } from '../../actions/user';

export function* watchDashboardList(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardListAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: DASHBOARD_GET_LIST_SUCCESSED,
        data: response?.data.items,
      });
    } else {
      yield put({ type: DASHBOARD_GET_LIST_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error While fetching dashboard',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error While fetching dashboard',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
    yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_GET_LIST_FAILED });
  }
}

export function* watchDashboardDelete(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardDeleteAPI, action.id);

    if (response.success === true) {
      yield put({
        type: DASHBOARD_DELETE_SUCCESSED,
        data: response?.data.items,
      });
      const msg = response?.data?.message || 'Dashboard deleted successfully';
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'Dashboard',
        },
      });
      const expand = 'isDraft,checkForDefault,checkForRemove,checkForAdd';
      yield put(getDashboardList(expand));
    } else {
      yield put({ type: DASHBOARD_DELETE_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while deleting dashboard',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_DELETE_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while deleting dashboard',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export function* watchDashboardRemove(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardRemoveAPI, action.id);

    if (response.success === true) {
      yield put({
        type: DASHBOARD_REMOVE_SUCCESSED,
        data: response?.data.items,
      });
      const msg = response?.data?.message || 'Dashboard removed successfully';
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'Dashboard',
        },
      });
      const expand = 'isDraft,checkForDefault,checkForRemove,checkForAdd';
      yield put(getDashboardList(expand));
    } else {
      yield put({ type: DASHBOARD_REMOVE_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while removing dashboard',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_REMOVE_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while removing dashboard',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export function* watchDashboardAdd(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardAddAPI, action.id);

    if (response.success === true) {
      yield put({
        type: DASHBOARD_ADD_SUCCESSED,
        data: response?.data.items,
      });
      const msg = response?.data?.message || 'Dashboard added successfully';
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'Dashboard',
        },
      });
      const expand = 'isDraft,checkForDefault,checkForRemove,checkForAdd';
      yield put(getDashboardList(expand));
    } else {
      yield put({ type: DASHBOARD_ADD_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while adding dashboard',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_ADD_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while adding dashboard',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export function* watchDashboardListData(action) {
  try {
    const response = yield call(dashboardList);
    if (response.success === true) {
      yield put({
        type: DASHBOARD_LIST_SUCCESSED,
        data: response?.data,
      });
      // yield put(getDashboardById(action.payload, action.history, true));
    }
  } catch (err) {
    yield put({ type: DASHBOARD_LIST_FAILED });
  }
}

export function* watchDashboardSetDefault(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardSetDefaultAPI, action.id);

    if (response.success === true) {
      yield put({
        type: DASHBOARD_SET_DEFAULT_SUCCESSED,
        data: response?.data.items,
      });
      // yield put(getUserProfile());
      // debugger
      if (action.isList) {
        const expand = 'isDraft,checkForDefault,checkForRemove,checkForAdd';
        yield put(getDashboardList(expand));
      } else {
        yield put(getDashboardById(action.payload, action.history, action.isView));
        const msg = response?.data?.message || 'Dashboard set as default';
        yield put({
          type: SET_FEEDBACK_ALERT,
          payload: {
            feedbackMessage: msg,
            feedbackType: 'success',
            module: 'Dashboard',
          },
        });
      }
    } else {
      yield put({ type: HIDE_LOADER });
      yield put({ type: DASHBOARD_SET_DEFAULT_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while set default dashboard',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }

  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_SET_DEFAULT_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while set default dashboard',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export function* watchDashboardGetWidgetList(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardGetWidgetList, action.payload);

    if (response.success === true) {
      yield put({
        type: DAHSBOARD_GET_WIDGET_LIST_SUCCESSED,
        data: response?.data.items,
      });
    } else {
      yield put({ type: DAHSBOARD_GET_WIDGET_LIST_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while fetching widgets',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({ type: DAHSBOARD_GET_WIDGET_LIST_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while fetching widgets',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export function* watchDashboardWidgetGroup() {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardWidgetGetGroupList);

    if (response.success === true) {
      yield put({
        type: DASHBOARD_WIDGET_GET_GROUPS_SUCCESSES,
        data: response?.data,
      });
    } else {
      yield put({ type: DASHBOARD_WIDGET_GET_GROUPS_FAIELD });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_WIDGET_GET_GROUPS_FAIELD });
  }
}

export function* watchGetDashboardById(action) {

  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(getDashboardByIdAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: GET_DASHBOARD_BY_ID_SUCCESSED,
        data: response?.data,
      });
      if (action.payload?.type !== 'isView') {
        let query = '';
        if (action.payload.das_subject) {
          query = `&GraphsSearch[search]=${action.payload.das_subject}`
        }
        yield put(onGetwidgetList(query));
        yield put(onGetWidgetGroups());
      }

        const widgetList = response?.data?.dashboardGraphs;
        if (widgetList.length > 0) {
          let selectedWidgetsUpdated = {};
          const layoutData = [];
          for (let item of widgetList) {
            selectedWidgetsUpdated = {
              ...selectedWidgetsUpdated,
              [item?.gsu_graph_id]: {
                type: item?.gsuGraph?.gra_widget_type,
                data: item?.gsuGraph?.data,
                dashboardWidgetId: item?.gsu_id,
                widgetTitle: item?.gsuGraph?.gra_title,
              },
            };
            const layoutObj = JSON.parse(item.gsu_layout_data);
            // debugger
            if (action.isView) {
              layoutObj['static'] = true;
              layoutObj['isDraggable'] = false;
            }
            layoutData.push(layoutObj);
          }
          yield put(onDashboardWidgetsLayoutChange(layoutData));
          yield put(onSaveSelectedWidget(selectedWidgetsUpdated));
        }else{
          yield put({ type: HIDE_LOADER });
        }
    } else {
      yield put({ type: GET_DASHBOARD_BY_ID_FAILED });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    if (err?.response?.status === 404) {
      action.history.push('/dashboard/list');
    } else {
      yield put({ type: HIDE_LOADER });
      yield put({ type: GET_DASHBOARD_BY_ID_FAILED });
    }
  }
}

export function* watchCreateDashboard(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardCreateAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: DASHBOARD_CREATE_SUCCESSED,
        data: response?.data,
      });
      const msg = 'Dashboard created successfully';
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'Dashboard',
        },
      });
      action.history.push(`/dashboard/edit/${response?.data?.das_id}`);
    } else {
      yield put({ type: DASHBOARD_CREATE_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while creating dashboard',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
      action.history.push(`/dashboard/list`);
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    action.history.push(`/dashboard/list`);
    yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_CREATE_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while creating dashboard',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

// export function* watchGetSingleDashboard(action) {
//   try {
//     yield put({ type: SHOW_LOADER });
//     const response = yield call(dashboardGetSingalAPI, action.payload);

//     if (response.success === true) {
//       yield put({
//         type: DASHBOARD_GET_SINGLE_SUCCESSED,
//         data: response?.data,
//       });

//       // const expand = 'isDraft,checkForDefault,checkForRemove,checkForAdd';
//       const query = '?expand=gsuGraph.graGroup,gsuGraph.dataPath';
//       yield put(onGetwidgetList(query));
//       yield put(onGetWidgetGroups());
//     } else {
//       yield put({ type: HIDE_LOADER });
//       yield put({ type: DASHBOARD_GET_SINGLE_FAILED });
//       yield put({
//         type: SET_FEEDBACK_ALERT,
//         payload: {
//           feedbackMessage: 'Error while fetching dashboard',
//           feedbackType: 'error',
//           module: 'Dashboard',
//         },
//       });
//     }
//     // yield put({ type: HIDE_LOADER });
//   } catch (err) {
//     yield put({ type: HIDE_LOADER });
//     yield put({ type: DASHBOARD_GET_SINGLE_FAILED });
//     yield put({
//       type: SET_FEEDBACK_ALERT,
//       payload: {
//         feedbackMessage: 'Error while fetching dashboard',
//         feedbackType: 'error',
//         module: 'Dashboard',
//       },
//     });
//   }
// }

export function* watchUpdateDashboard(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardUpdateAPI, action.id, action.payload);

    if (response.success === true) {
      yield put({
        type: DASHBOARD_UPDATE_SUCCESSED,
        data: response?.data,
      });
      const msg = 'Dashboard updated successfully';
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: msg,
          feedbackType: 'success',
          module: 'Dashboard',
        },
      });
      // const expand = 'isDraft,checkForDefault,checkForRemove,checkForAdd';
      // const query = "?expand=gsuGraph.graGroup,gsuGraph.dataPath";
      // yield put(onGetwidgetList(query));
      // yield put(onGetWidgetGroups());
    } else {
      yield put({ type: DASHBOARD_UPDATE_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while updating dashboard',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_UPDATE_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while updating dashboard',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export function* watchDashboardWidgetGraphData(action) {
  try {
    yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardGetWidgetDataAPI, action.payload);

    if (response.success === true) {
      yield put({
        type: DASHBOARD_GET_WIDGET_DATA_SUCCESSED,
        data: response?.data,
      });

      const selectedWidget = {
        [String(action.payload.id)]: {
          type: action.payload.type,
          data: response?.data,
          widgetTitle: action.payload.title
        },
      };


      const addWidget = {
        das_id: action.payload.das_id,
        gsu_graph_id: action.payload.id,
        gsu_layout_data: JSON.stringify(action.payload.layoutData),
        widgetTitle: action.payload.title
      }

      yield put(onDashboardWidgetAdd(addWidget, selectedWidget, action.payload?.allLayout));

      // // const expand = 'isDraft,checkForDefault,checkForRemove,checkForAdd';
      // const query = "?expand=gsuGraph.graGroup,gsuGraph.dataPath";
      // yield put(onGetwidgetList(query));
      // yield put(onGetWidgetGroups());
    } else {
      // yield put(onWidgetRemovedId(action.payload.id))
      yield put({ type: HIDE_LOADER });
      yield put({ type: DASHBOARD_GET_WIDGET_DATA_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while fetching widget data',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put(onWidgetRemovedId(action.payload.id))
    yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_GET_WIDGET_DATA_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while fetching widget data',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export function* watchDashboardAddWidget(action) {
  try {
    // yield put({ type: SHOW_LOADER });
    const response = yield call(dashboardAddWidget, action?.payload?.addWidget);
    if (response.success === true) {
      yield put({ type: DASHBOARD_ADD_WIDGET_SUCCESSED });

      if (action?.payload.selectedWidget) {
        const dashboardWidgets = {
          ...action?.payload.selectedWidget,
          [action?.payload?.addWidget.gsu_graph_id]: {
            ...action?.payload.selectedWidget[action?.payload?.addWidget.gsu_graph_id],
            dashboardWidgetId: response?.data?.datamap?.gsu_id,
            widgetTitle: response?.data?.datamap?.gsuGraph?.gra_title || action?.payload?.addWidget?.widgetTitle,
          }
        };
        yield put(onSaveSelectedWidget(dashboardWidgets));
        if(action.payload.allLayout){
          yield put(dashboardWidgetUpdate(action.payload.allLayout))
        }
      }
    } else {
      yield put({ type: DASHBOARD_ADD_WIDGET_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while adding widget',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
    // yield put({ type: HIDE_LOADER });
  } catch (err) {
    // yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_ADD_WIDGET_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while adding widget',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export function* watchDashboardDeleteWidget(action) {
  try {
    const response = yield call(dashboardDeleteWidget, action?.payload?.dashboardWidgetId);
    if (response.success === true) {
      yield put({ type: DASHBOARD_DELETE_WIDGET_SUCCESSED });
      yield put(onDashboardWidgetsLayoutChange(action?.payload?.layoutData));
      yield put(onDeleteSelectedWidget(action?.payload?.widgetId));
    } else {
      yield put({ type: DASHBOARD_DELETE_WIDGET_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while deleting widget',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
    yield put({ type: HIDE_LOADER });
  } catch (err) {
    yield put({ type: HIDE_LOADER });
    yield put({ type: DASHBOARD_DELETE_WIDGET_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while deleting widget',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export function* watchDashboardUpdateWidget(action) {
  try {
    const response = yield call(dashboardUpdateWidget, action.payload);
    if (response.success === true) {
      yield put({ type: DASHBOARD_UPDATE_WIDGET_SUCCESSED });
    } else {
      yield put({ type: DASHBOARD_UPDATE_WIDGET_FAILED });
      yield put({
        type: SET_FEEDBACK_ALERT,
        payload: {
          feedbackMessage: 'Error while editing widget',
          feedbackType: 'error',
          module: 'Dashboard',
        },
      });
    }
  } catch (err) {
    yield put({ type: DASHBOARD_UPDATE_WIDGET_FAILED });
    yield put({
      type: SET_FEEDBACK_ALERT,
      payload: {
        feedbackMessage: 'Error while editing widget',
        feedbackType: 'error',
        module: 'Dashboard',
      },
    });
  }
}

export default function* watcher() {
  yield takeLatest(DASHBOARD_GET_LIST_REQUESTED, watchDashboardList);
  yield takeLatest(DASHBOARD_DELETE_REQUESTED, watchDashboardDelete);
  yield takeLatest(DASHBOARD_REMOVE_REQUESTED, watchDashboardRemove);
  yield takeLatest(DASHBOARD_ADD_REQUESTED, watchDashboardAdd);
  yield takeLatest(DASHBOARD_SET_DEFAULT_REQUESTED, watchDashboardSetDefault);
  yield takeLatest(DAHSBOARD_GET_WIDGET_LIST_REQUESTED, watchDashboardGetWidgetList);
  yield takeEvery(DASHBOARD_WIDGET_GET_GROUPS_REQUESTED, watchDashboardWidgetGroup);
  yield takeEvery(DASHBOARD_UPDATE_WIDGET_REQUESTED, watchDashboardUpdateWidget);
  yield takeEvery(DASHBOARD_DELETE_WIDGET_REQUESTED, watchDashboardDeleteWidget);
  yield takeEvery(GET_DASHBOARD_BY_ID_REQUESTED, watchGetDashboardById);
  yield takeEvery(DASHBOARD_ADD_WIDGET_REQUESTED, watchDashboardAddWidget);
  yield takeLatest(DASHBOARD_CREATE_REQUESTED, watchCreateDashboard);
  yield takeLatest(DASHBOARD_UPDATE_REQUESTED, watchUpdateDashboard);
  yield takeLatest(DASHBOARD_GET_WIDGET_DATA_REQUESTED, watchDashboardWidgetGraphData);
  yield takeLatest(DASHBOARD_LIST_REQUESTED, watchDashboardListData);
}
