import axios from 'axios';
import { message } from 'antd';

import API from '../../../../../../../config/endpoints.config';

export default class CacheSirpTaskCategories {
  static result;

  constructor() {
    this.result = CacheSirpTaskCategories.result;
  }
  // eslint-disable-next-line lines-between-class-members
  async fetchSirpTaskCategories() {
    if (!this.result) {
      try {
        const userToken = localStorage.getItem('AccessToken');
        const response = await axios.get(
          API.baseUrl + `/playbooks/task-category`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken,
            },
          }
        );

        CacheSirpTaskCategories.result = response;
        return CacheSirpTaskCategories.result;
      } catch (e) {
        if (e.response.status === 401) {
          message.error({
            content: 'Unauthorized, Please login',
            className: 'success-message',
            style: { color: '#FFF' },
          });
        } else {
          message.error({
            content: 'Something went wrong',
            className: 'success-message',
            style: { color: '#FFF' },
          });
        }
      }
    } else {
      return CacheSirpTaskCategories.result;
    }
  }
}
