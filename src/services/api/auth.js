import axios from "axios";
import { config } from "../../config";

export const loginAPI = async (data) => {
  try {
    const res = await axios.post(`${config.apiURL}/api/auth/login`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const registerAPI = async (data) => {
  try {
    const res = await axios.post(`${config.apiURL}/api/auth/register`, data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
