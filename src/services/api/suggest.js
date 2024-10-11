import axios from "../axiosConfig";
import { getLocalStorage } from "../../functions/localStorage";

export const getSuggestionsAPI = async () => {
  const { token } = await getLocalStorage("token");
  const { id } = await getLocalStorage("user");
  try {
    const res = await axios.get(`/api/suggest/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllSuggestionsAPI = async () => {
  const { token } = await getLocalStorage("token");
  try {
    const res = await axios.get(`/api/suggest/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createSuggestAPI = async (data) => {
  const { token } = await getLocalStorage("token");
  const { id } = await getLocalStorage("user");
  data.id = id;
  try {
    const res = await axios.post(
      `/api/suggest/create`,
      {
        user_id: id,
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateSuggestAPI = async (data) => {
  const { token } = await getLocalStorage("token");
  try {
    const res = await axios.put(`/api/suggest/update/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
