import axios from "../axiosConfig";
import { getLocalStorage } from "../../functions/localStorage";

// Funcion para obtener los mensajes del chat del usuario
export const getChatAPI = async () => {
  const { token } = await getLocalStorage("token");
  const { id } = await getLocalStorage("user");
  try {
    const res = await axios.get(`/api/chat/get-messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.name === "AxiosError") {
      return error.response.data;
    }
    return error
  }
};

// Funcion para enviar un mensaje a la IA.
export const sendMessageAPI = async (userMessage) => {
  const { token } = await getLocalStorage("token");
  try {
    const res = await axios.post(
      `/api/chat/send-message`,
      {
        message: userMessage,
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

// Funcion para almacenar los mensajes del chat del usuario
export const saveMessagesAPI = async (messages) => {
  const { token } = await getLocalStorage("token");
  const { id } = await getLocalStorage("user");
  try {
    const res = await axios.post(
      `/api/chat/save-messages/${id}`,
      {
        messages: messages,
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

// Funcion para actualizar los mensajes del chat del usuario
export const updateMessagesAPI = async (messages) => {
  const { token } = await getLocalStorage("token");
  const { id } = await getLocalStorage("user");
  try {
    const res = await axios.put(
      `/api/chat/update-messages/${id}`,
      {
        messages: messages,
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

// funcion para eliminar los mensajes del chat del usuario
export const deleteMessageAPI = async () => {
  const { token } = await getLocalStorage("token");
  const { id } = await getLocalStorage("user");
  try {
    const res = await axios.delete(`/api/chat/delete-messages/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
