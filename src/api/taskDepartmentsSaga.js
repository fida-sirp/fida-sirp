import axios from 'axios';
import API from '../config/endpoints.config';

export async function getTaskDepartments() {
  const userToken = localStorage.getItem('AccessToken');
  const response = await axios.get(
    API.incidentManagementModule.task.departments,
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

export default { getTaskDepartments };
