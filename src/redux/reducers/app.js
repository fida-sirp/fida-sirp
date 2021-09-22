import {
  SHOW_LOADER,
  HIDE_LOADER,
  SET_FEEDBACK_ALERT,
} from '../../constants/actionTypes';

const initialState = {
  showLoader: false,
  feedbackMessage: '',
  feedbackType: '',
  module: '',
};

export const appStore = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER: {
      return { ...state, showLoader: true };
    }
    case HIDE_LOADER: {
      return { ...state, showLoader: false };
    }
    case SET_FEEDBACK_ALERT: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default appStore;
