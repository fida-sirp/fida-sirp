import { GOOGLE_OAUTH2 } from '../constants/actionTypes';

export default function googleOAuth2(payload) {
    return {
      type: GOOGLE_OAUTH2,
      payload,
    };
  }