import axios from 'axios';
import { config } from '../config';

// Configuracion de Axios
const axiosConfig = {
  baseURL: config.apiURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  wwithCredentials: true
};

// Instancia de Axios
export default axios.create(axiosConfig);
