import {
  DASHBOARD_GET_LIST_REQUESTED,
  DASHBOARD_GET_LIST_FAILED,
  DASHBOARD_GET_LIST_SUCCESSED,
  DAHSBOARD_GET_WIDGET_LIST_REQUESTED,
  DAHSBOARD_GET_WIDGET_LIST_SUCCESSED,
  DAHSBOARD_GET_WIDGET_LIST_FAILED,
  DASHBOARD_WIDGET_GET_GROUPS_REQUESTED,
  DASHBOARD_WIDGET_GET_GROUPS_SUCCESSES,
  DASHBOARD_WIDGET_GET_GROUPS_FAIELD,
  DASHBOARD_SELECTED_WIDGET_LAYOUT,
  DASHBOARD_SELECTED_WIDGET_LIST,
  DASHBOARD_REMOVED_WIDGET_ID,
  DASHBOARD_ADDED_WIDGET_ID,
  DASHBOARD_CREATE_REQUESTED,
  DASHBOARD_CREATE_SUCCESSED,
  DASHBOARD_CREATE_FAILED,
  DASHBOARD_GET_SINGLE_SUCCESSED,
  DASHBOARD_GET_SINGLE_REQUESTED,
  DASHBOARD_GET_SINGLE_FAILED,
  DASHBOARD_UPDATE_SUCCESSED,
  DASHBOARD_UPDATE_REQUESTED,
  DASHBOARD_UPDATE_FAILED,
  DASHBOARD_GET_WIDGET_DATA_SUCCESSED,
  DASHBOARD_GET_WIDGET_DATA_FAILED,
  DASHBOARD_GET_WIDGET_DATA_REQUESTED,
  GET_DASHBOARD_BY_ID_SUCCESSED,
  GET_DASHBOARD_BY_ID_FAILED,
  DASHBOARD_DELETE_SELECTED_WIDGET,
  GET_DASHBOARD_BY_ID_REQUESTED,
  DASHBOARD_LIST_REQUESTED,
  DASHBOARD_LIST_SUCCESSED,
  DASHBOARD_LIST_FAILED,
  DASHBOARD_SET_DEFAULT_REQUESTED
} from '../../constants/actionTypes';


const initialState = {
  dashboardList: {
    listData: null,
    isSuccess: null,
    hasErrors: null,
    loading: false,
    requested: false,
  },
  dashboardListGet: {
    listData: null,
    isSuccess: null,
    hasErrors: null,
    loading: false,
    requested: false,
  },
  widgetList: {
    listData: null,
    isSuccess: null,
    hasErrors: null,
    loading: false,
    requested: false,
  },
  widgetGroups: {
    listData: null,
    isSuccess: null,
    hasErrors: null,
    loading: false,
    requested: false,
  },

  createdDashboard: {
    data: null,
    isSuccess: null,
    hasErrors: null,
    requested: false,
  },

  singleDashboardRecord: {
    data: null,
    isSuccess: null,
    hasErrors: null,
    requested: false,
  },

  // widgetData: {
  //     data: null,
  //     isSuccess: null,
  //     hasErrors: null,
  //     requested: false
  // },

  widgetLocalState: {
    removeWidgetId: null,
    addedWidgetId: null,
    selectedWidgets: {},
    layoutData: [],
  },
};

export const dashboardStore = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_GET_LIST_REQUESTED: {
      return {
        ...state,
        dashboardList: {
          ...state.dashboardList,
          loading: true,
          isProcessing: true,
          requested: true,
          listData: null,
        },
      };
    }

    case DASHBOARD_GET_LIST_SUCCESSED: {
      return {
        ...state,
        dashboardList: {
          ...state.dashboardList,
          loading: false,
          requested: false,
          hasErrors: null,
          isSuccess: true,
          listData: action.data,
        },
      };
    }

    case DASHBOARD_GET_LIST_FAILED: {
      return {
        ...state,
        dashboardList: {
          ...state.dashboardList,
          loading: false,
          requested: false,
          listData: null,
          hasErrors: true,
          isSuccess: false,
        },
      };
    }

    // case DAHSBOARD_GET_WIDGET_LIST_REQUESTED: {
    //   return {
    //     ...state,
    //     widgetList: {
    //       ...state.widgetList,
    //       loading: true,
    //       isProcessing: true,
    //       requested: true,
    //       isSuccess: false,
    //       listData: null,
    //     },
    //   };
    // }

    case DASHBOARD_LIST_REQUESTED: {
      return {
        ...state,
        dashboardListGet: {
          ...state.dashboardListGet,
          loading: true,
          isProcessing: true,
          requested: true,
          listData: null,
        },
        widgetLocalState: {
          removeWidgetId: null,
          addedWidgetId: null,
          selectedWidgets: {},
          layoutData: [],
        },
      };
    }

    case DASHBOARD_LIST_SUCCESSED: {
      return {
        ...state,
        dashboardListGet: {
          ...state.dashboardListGet,
          loading: false,
          requested: false,
          hasErrors: null,
          isSuccess: true,
          listData: action.data,
        },
      };
    }

    case DASHBOARD_LIST_FAILED: {
      return {
        ...state,
        dashboardListGet: {
          ...state.dashboardListGet,
          loading: false,
          requested: false,
          listData: null,
          hasErrors: true,
          isSuccess: false,
        },
      };
    }

    case DAHSBOARD_GET_WIDGET_LIST_REQUESTED: {
      return {
        ...state,
        widgetList: {
          ...state.widgetList,
          loading: true,
          isProcessing: true,
          requested: true,
          isSuccess: false,
          listData: null,
        },
      };
    }

    case DAHSBOARD_GET_WIDGET_LIST_SUCCESSED: {
      return {
        ...state,
        widgetList: {
          ...state.widgetList,
          loading: false,
          requested: false,
          hasErrors: null,
          isSuccess: true,
          listData: action.data,
        },
      };
    }

    case DAHSBOARD_GET_WIDGET_LIST_FAILED: {
      return {
        ...state,
        widgetList: {
          ...state.widgetList,
          loading: false,
          requested: false,
          listData: null,
          hasErrors: true,
          isSuccess: false,
        },
      };
    }

    case DASHBOARD_WIDGET_GET_GROUPS_REQUESTED: {
      return {
        ...state,
        widgetGroups: {
          ...state.widgetGroups,
          loading: true,
          isProcessing: true,
          requested: true,
          listData: null,
        },
      };
    }

    case DASHBOARD_WIDGET_GET_GROUPS_SUCCESSES: {
      return {
        ...state,
        widgetGroups: {
          ...state.widgetGroups,
          loading: false,
          requested: false,
          hasErrors: null,
          isSuccess: true,
          listData: action.data,
        },
      };
    }

    case DASHBOARD_WIDGET_GET_GROUPS_FAIELD: {
      return {
        ...state,
        widgetGroups: {
          ...state.widgetGroups,
          loading: false,
          requested: false,
          listData: null,
          hasErrors: true,
          isSuccess: false,
        },
      };
    }

    case DASHBOARD_SELECTED_WIDGET_LIST: {
      return {
        ...state,
        widgetLocalState: {
          ...state.widgetLocalState,
          selectedWidgets: {
            ...state.widgetLocalState.selectedWidgets,
            ...action.payload,
          },
        },
      };
    }

    case DASHBOARD_DELETE_SELECTED_WIDGET: {
      const selectedWidget = { ...state.widgetLocalState.selectedWidgets };
      const id = action.id;
      const filteredWidgets = Object.keys(selectedWidget)
        .filter(item => item !== id)
        .reduce((obj, item) => {
          obj[item] = selectedWidget[item];
          return obj;
        }, {});
      return {
        ...state,
        widgetLocalState: {
          ...state.widgetLocalState,
          selectedWidgets: filteredWidgets,
        },
      };
    }

    case DASHBOARD_SELECTED_WIDGET_LAYOUT: {
      return {
        ...state,
        widgetLocalState: {
          ...state.widgetLocalState,
          layoutData: action.payload,
        },
      };
    }

    // case DASHBOARD_REMOVED_WIDGET_ID: {
    //     return {
    //         ...state,
    //         widgetLocalState: {
    //             ...state.widgetLocalState,
    //             addedWidgetId: null,
    //             removeWidgetId: action.payload,
    //         }

    //     }
    // }

    // case DASHBOARD_ADDED_WIDGET_ID: {
    //     return {
    //         ...state,
    //         widgetLocalState: {
    //             ...state.widgetLocalState,
    //             removeWidgetId: null,
    //             addedWidgetId: action.payload
    //         }

    //     }
    // }

    case GET_DASHBOARD_BY_ID_REQUESTED: {
      return {
        ...state,
        widgetLocalState:{
          removeWidgetId: null,
          addedWidgetId: null,
          selectedWidgets: {},
          layoutData: [],
        },
        selectedDashboard: {
          ...state.selectedDashboard,
          loading: true,
          requested: true,
          hasErrors: null,
          isSuccess: true,
          listData: null,
        },
      };
    }

    case DASHBOARD_SET_DEFAULT_REQUESTED: {
      return {
        ...state,
          widgetLocalState:{
            removeWidgetId: null,
            addedWidgetId: null,
            selectedWidgets: {},
            layoutData: [],
          },
        selectedDashboard: {
          loading: true,
          requested: true,
          hasErrors: null,
          isSuccess: true,
          listData: null
        },
        // widgetLocalState: initialState.widgetLocalState
      }
    }

    case GET_DASHBOARD_BY_ID_SUCCESSED: {
      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          loading: false,
          requested: false,
          hasErrors: null,
          isSuccess: true,
          listData: action.data,
        },
      };
    }

    case DASHBOARD_CREATE_REQUESTED: {
      return {
        ...state,
        createdDashboard: {
          ...state.createdDashboard,
          data: null,
          isSuccess: null,
          hasErrors: false,
          requested: true,
        },
      };
    }

    case DASHBOARD_CREATE_SUCCESSED: {
      return {
        ...state,
        createdDashboard: {
          ...state.createdDashboard,
          data: action.data,
          isSuccess: true,
          hasErrors: false,
          requested: false,
        },
      };
    }

    case DASHBOARD_CREATE_FAILED: {
      return {
        ...state,
        createdDashboard: {
          ...state.createdDashboard,
          data: null,
          isSuccess: false,
          hasErrors: true,
          requested: false,
        },
      };
    }

    // case DASHBOARD_GET_SINGLE_REQUESTED: {
    //     return {
    //         ...state,
    //         createdDashboard: {
    //             ...state.createdDashboard,
    //             data: null,
    //             isSuccess: null,
    //             hasErrors: false,
    //             requested: true
    //         }
    //     }
    // }

    case GET_DASHBOARD_BY_ID_FAILED: {
      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          loading: false,
          requested: false,
          hasErrors: action.data,
          isSuccess: true,
          listData: null,
        },
      };
    }

    // case DASHBOARD_GET_SINGLE_SUCCESSED: {
    //     return {
    //         ...state,
    //         singleDashboardRecord: {
    //             ...state.singleDashboardRecord,
    //             data: action.data,
    //             isSuccess: true,
    //             hasErrors: false,
    //             requested: false
    //         }
    //     }
    // }

    // case DASHBOARD_GET_SINGLE_FAILED: {
    //     return {
    //         ...state,
    //         singleDashboardRecord: {
    //             ...state.singleDashboardRecord,
    //             data: null,
    //             isSuccess: false,
    //             hasErrors: true,
    //             requested: false
    //         }
    //     }
    // }

    case DASHBOARD_UPDATE_REQUESTED: {
      return {
        ...state,
        createdDashboard: {
          ...state.createdDashboard,
          data: null,
          isSuccess: null,
          hasErrors: false,
          requested: true,
        },
      };
    }

    case DASHBOARD_UPDATE_SUCCESSED: {
      return {
        ...state,
        singleDashboardRecord: {
          ...state.singleDashboardRecord,
          data: action.data,
          isSuccess: true,
          hasErrors: false,
          requested: false,
        },
      };
    }

    case DASHBOARD_UPDATE_FAILED: {
      return {
        ...state,
        singleDashboardRecord: {
          ...state.singleDashboardRecord,
          data: null,
          isSuccess: false,
          hasErrors: true,
          requested: false,
        },
      };
    }

    case DASHBOARD_GET_WIDGET_DATA_REQUESTED: {
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          data: null,
          isSuccess: false,
          hasErrors: false,
          requested: true,
        },
      };
    }

    // case DASHBOARD_GET_WIDGET_DATA_SUCCESSED:{
    //     return {
    //         ...state,
    //         widgetData: {
    //             ...state.widgetData,
    //             data: action.data,
    //             isSuccess: true,
    //             hasErrors: false,
    //             requested: false
    //         }
    //     }
    // }

    case DASHBOARD_GET_WIDGET_DATA_FAILED: {
      return {
        ...state,
        widgetData: {
          ...state.widgetData,
          data: null,
          isSuccess: false,
          hasErrors: true,
          requested: false,
        },
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

// export default dashboardReducer;
