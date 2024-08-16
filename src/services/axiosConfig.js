import axios from 'axios';
import { config } from '../config';

const axiosConfig = {
  baseURL: config.apiURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export default axios.create(axiosConfig);
