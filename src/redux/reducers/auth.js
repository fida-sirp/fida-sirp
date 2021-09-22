import {
  FORGOT_PASSWORD_REQUESTED,
  FORGOT_PASSWORD_PROCESSING,
  FORGOT_PASSWORD_SUCCESSED,
  FORGOT_PASSWORD_FAILED,
  LOGIN_REQUESTED,
  LOGIN_PROCESSING,
  LOGIN_SUCCESSED,
  LOGIN_FAILED,
  LOGOUT_USER,

  GOOGLE_AUTH_LOGIN_REQUESTED,
  GOOGLE_AUTH_LOGIN_PROCESSING,
  GOOGLE_AUTH_LOGIN_SUCCESSED,
  GOOGLE_AUTH_LOGIN_FAILED
} from '../../constants/actionTypes';
 
const initialState = {
  data: {},
  isProcessing: null,
  isSuccess: null,
  hasErrors: null,
};

export const loginStore = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_USER: {
      return initialState;
    }
    case LOGIN_REQUESTED: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        isSuccess: false,
        requested: true,
      };
    }
    case LOGIN_PROCESSING: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        isSuccess: false,
        requested: false,
      };
    }
    case LOGIN_SUCCESSED: {
      return {
        result: action.data,
        error: null,
        loading: false,
        isSuccess: true,
        requested: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        result: null,
        error: action.data,
        loading: false,
        isSuccess: false,
        requested: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};


export const googleLoginStore = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_USER: {
      return initialState;
    }
    case GOOGLE_AUTH_LOGIN_REQUESTED: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        isSuccess: false,
        requested: true,
      };
    }
    case GOOGLE_AUTH_LOGIN_PROCESSING: {
      return {
        ...state,
        result: null,
        error: null,
        loading: true,
        isSuccess: false,
        requested: false,
      };
    }
    case GOOGLE_AUTH_LOGIN_SUCCESSED: {
      return {
        result: action.data,
        error: null,
        loading: false,
        isSuccess: true,
        requested: false,
      };
    }
    case GOOGLE_AUTH_LOGIN_FAILED: {
      return {
        result: null,
        error: action.data,
        loading: false,
        isSuccess: false,
        requested: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

const forgotPasswordInitial = {
  data: {},
  isProcessing: null,
  isSuccess: false,
  hasErrors: null,
};

export const forgotPasswordStore = (state = forgotPasswordInitial, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUESTED: {
      return {
        ...state,
        data: null,
        error: null,
        loading: true,
        isSuccess: false,
        requested: true,
      };
    }
    case FORGOT_PASSWORD_PROCESSING: {
      return {
        ...state,
        data: null,
        isSuccess: false,
        error: null,
        loading: true,
        requested: false,
      };
    }
    case FORGOT_PASSWORD_SUCCESSED: {
      return {
        data: action.data,
        error: null,
        loading: false,
        isSuccess: true,
        requested: false,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        isSuccess: false,
        data: null,
        error: action.data,
        loading: false,
        requested: false,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};




export default { loginStore, forgotPasswordStore, googleLoginStore };
