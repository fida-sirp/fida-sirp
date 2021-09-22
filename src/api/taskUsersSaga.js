import axios from 'axios';
import API from '../config/endpoints.config';

export async function getTaskUsers() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagementModule.taskUsers,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
    }
  );
  return response.data;
}

export default { getTaskUsers };
