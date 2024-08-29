import axios from "../axiosConfig";
import { getLocalStorage } from "../../functions/localStorage";

export const createTransaction = async (data) => {
  const { token } = await getLocalStorage("token");
  const res = await axios.post(`api/transactions/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTransactions = async () => {
  const { token } = await getLocalStorage("token");
  const { id } = await getLocalStorage("user");
  try {
    const res = await axios.get(`api/transactions/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMaxTransactions = async () => {
  const { token } = await getLocalStorage("token");
  const { id } = await getLocalStorage("user");
  try {
    const res = await axios.get(`api/transactions/get-max/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
