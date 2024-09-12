import axios from '../axiosConfig';
import { getLocalStorage } from '../../functions/localStorage';

// Función que verifica si el usuario está autenticado
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

// Función para iniciar sesion en la API
export const loginAPI = async (data) => {
  try {
    const res = await axios.post(`/api/auth/login`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Funcion para registrar un usuario en la API
export const registerAPI = async (data) => {
  try {
    const res = await axios.post(`/api/auth/register`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// Función para cerrar sesión en la API
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
