import axios from 'axios';
import { message } from 'antd';

import API from '../../../../../../../config/endpoints.config';

export default class CacheSirpRiskRate {
  static result;

  constructor() {
    this.result = CacheSirpRiskRate.result;
  }
  // eslint-disable-next-line lines-between-class-members
  async fetchSirpRiskRate() {
    if (!this.result) {
      try {
        const userToken = localStorage.getItem('AccessToken');
        const response = await axios.get(
          API.baseUrl + `/playbooks/risk-rating`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + userToken,
            },
          }
        );
        CacheSirpRiskRate.result = response;
        return CacheSirpRiskRate.result;
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
      return CacheSirpRiskRate.result;
    }
  }
}
