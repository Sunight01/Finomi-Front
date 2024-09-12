import axios from "../axiosConfig";
import { getLocalStorage } from "../../functions/localStorage";

// Funcion para obtener las transacciones del usuario
export const createTransaction = async (data) => {
  const { token } = await getLocalStorage("token");
  const res = await axios.post(`api/transactions/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Funcion para actualizar las transacciones del usuario
export const updateTransaction = async (data) => {
  const { token } = await getLocalStorage("token");
  const res = await axios.put(`api/transactions/update/${data.id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Funcion para eliminar las transacciones del usuario
export const deleteTransactionAPI = async (data) => {
  const { token } = await getLocalStorage("token");
  const auth = `Bearer ${token}`;
  const res = await axios.put(`api/transactions/delete/${data.id}`, data, {
    headers: {
      Authorization: auth,
    },
  });
  return res.data;
};

// Funcion para obtener las transacciones del usuario
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
