import axios from '../axiosConfig';
import { getLocalStorage } from '../../functions/localStorage';

export const verifyUserAPI = async () => {
  const { token } = await getLocalStorage('token');
  try {
    const res = await axios.get(`/api/auth/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      wwithCredentials: true
    });
    return res.data;
  } catch (error) {
    if (error.name === "AxiosError") {
      if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
        return {
          status: 401,
          message: "No tienes permisos para acceder a esta página"
        }
      }
    }
  }
}

export const loginAPI = async (data) => {
  try {
    const res = await axios.post(`/api/auth/login`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const registerAPI = async (data) => {
  try {
    const res = await axios.post(`/api/auth/register`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logoutAPI = async () => {
  const { token } = await getLocalStorage('token');
  try {
    const res = await axios.get(`/api/auth/logout`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
