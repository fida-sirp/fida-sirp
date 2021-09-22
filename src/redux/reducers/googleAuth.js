import { GOOGLE_OAUTH2 }  from '../../constants/actionTypes';

const initialState = [];
 
export const googleAuthStore = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_OAUTH2:  
        return { ...state, googleResponse:action.payload }; 
    default:
      return state;
  }
};

export default googleAuthStore;