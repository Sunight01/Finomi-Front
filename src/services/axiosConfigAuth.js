import axios from 'axios';
import { config } from '../config';
import { getLocalStorage } from '../functions/localStorage';

const data = getLocalStorage('token');
const token = data ? data.token : '';

const axiosConfig = {
  baseURL: config.apiURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  wwithCredentials: true
};

export default axios.create(axiosConfig);
