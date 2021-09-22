import axios from 'axios';
import { message } from 'antd';

import API from '../../../../../../../config/endpoints.config';

export default class CacheAdditionInputs {
  static result;

  static actionId;

  constructor() {
    this.result = CacheAdditionInputs.result;
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchAdditionalInputs(actionId) {
    // eslint-disable-next-line prefer-destructuring
    // const app_id = CacheAdditionInputs.app_id;
    // if (!this.result) {
    try {
      // if(actionId !== CacheAdditionInputs.actionId){
        const userToken = localStorage.getItem('AccessToken');
        const response = await axios.get(
          `${API.baseUrl}/playbooks/additional-input?act_id=${actionId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken,
            },
          }
        );
        CacheAdditionInputs.result = response;
        CacheAdditionInputs.actionId = actionId;
        return CacheAdditionInputs.result;
      // }else{
      //   return CacheAdditionInputs.result;
      // }
     
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
    //   CacheAdditionInputs.app_id = appId;
    //   return CacheAdditionInputs.result;
    // }
  }
}
