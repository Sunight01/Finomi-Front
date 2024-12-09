import axios from "../axiosConfig";

export const getDollarAPI = async () => {
  try {
    const res = await axios.get('https://mindicador.cl/api/dolar')
    return res.data
  } catch (error) {
    return error.response.data;
  }
}

export const getUfAPI = async () => {
  try {
    const res = await axios.get('https://mindicador.cl/api/uf')
    return res.data
  } catch (error) {
    return error.response.data;
  }
}