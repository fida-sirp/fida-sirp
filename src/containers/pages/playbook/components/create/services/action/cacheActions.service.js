import axios from 'axios';
import { message } from 'antd';

import API from '../../../../../../../config/endpoints.config';

export default class CacheActions {
  static result;

  static app_id;

  constructor() {
    this.result = CacheActions.result;
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchActions(multiOptions, appId) {
    // eslint-disable-next-line prefer-destructuring
    // const app_id = CacheActions.app_id;
    // if (!this.result) {
    try {
      if(appId !== CacheActions.app_id){
        const userToken = localStorage.getItem('AccessToken');
        const response = await axios.get(
          API.baseUrl +
          `/playbooks/action?app_multi_config_allowed=${multiOptions}&app_id=${appId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken,
            },
          }
        );
        CacheActions.result = response;
        CacheActions.app_id = appId;
        return CacheActions.result;
      }else{
        return CacheActions.result;
      }
     
    } catch (e) {
      if (e.response.status === 401) {
        message.error({
          content: 'Unauthorized, Please login',
          className: 'success-message',
          style: { color: '#FFF' },
        });
      } else {
        message.error({
          content: 'something went wrong',
          className: 'success-message',
          style: { color: '#FFF' },
        });
      }
    }
    // } else {
    //   CacheActions.app_id = appId;
    //   return CacheActions.result;
    // }
  }
}
