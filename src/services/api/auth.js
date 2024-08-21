import axios from '../axiosConfig';
import axiosAuth from '../axiosConfigAuth';

export const verifyUserAPI = async () => {
  try {
    const res = await axiosAuth.get(`/api/auth/verify`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export const loginAPI = async (data) => {
  try {
    const res = await axios.post(`/api/auth/login`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const registerAPI = async (data) => {
  try {
    const res = await axios.post(`/api/auth/register`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
