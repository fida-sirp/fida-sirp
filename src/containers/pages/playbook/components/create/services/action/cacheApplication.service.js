import axios from 'axios';
import { message } from 'antd';

import API from '../../../../../../../config/endpoints.config';

export default class CacheApplications {
  static result;

  constructor() {
    this.result = CacheApplications.result;
  }
  // eslint-disable-next-line lines-between-class-members
  async fetchApplications() {
    if (!this.result) {
      try {
        const userToken = localStorage.getItem('AccessToken');
        const response = await axios.get(
          API.baseUrl + '/playbooks/applications',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken,
            },
          }
        );
        CacheApplications.result = response;
        return CacheApplications.result;
      } catch (e) {
        message.error({
          content: 'Something went wrong',
          className: 'success-message',
          style: { color: '#FFF' },
        });
      }
    } else {
      return CacheApplications.result;
    }
  }
}
