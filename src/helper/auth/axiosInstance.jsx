import axios from "axios";
import restAPI from "../database/restAPI";
import useStorage from "../storage/Storage";

const API_CALL = restAPI();

const axiosInstance = axios.create({
  baseURL: API_CALL.pythonHost,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { getStorage } = useStorage();
    const token = getStorage("access_token");
    if (!token) return;
    if (token) {
      config.headers["Authorization"] = `Bearer  ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const axiosGet = async (apiLink) => {
  try {
    const response = await axios.get(API_CALL.pythonHost + apiLink);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosPost = async (apiLink, data) => {
  try {
    const response = await axiosInstance.post(apiLink, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosPut = async (apiLink, data) => {
  try {
    const response = await axiosInstance.put(apiLink, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const axiosDelete = async (apliLink, data) => {
  try {
    const response = await axiosInstance.delete(apliLink, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default axiosInstance;
