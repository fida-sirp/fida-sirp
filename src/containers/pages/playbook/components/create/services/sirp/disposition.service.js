import axios from 'axios';
import { message } from 'antd';

import API from '../../../../../../../config/endpoints.config';

export default class CacheDispositions {
  static result;

  constructor() {
    this.result = CacheDispositions.result;
  }
  // eslint-disable-next-line lines-between-class-members
  async fetchSirpDispositions() {
    if (!this.result) {
      try {
        const userToken = localStorage.getItem('AccessToken');
        const response = await axios.get(
          API.baseUrl + `/playbooks/disposition`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken,
            },
          }
        );
        CacheDispositions.result = response;
        return CacheDispositions.result;
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
      return CacheDispositions.result;
    }
  }
}
