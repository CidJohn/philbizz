import axios from "axios";
import restAPI from "../database/restAPI";

const API_CALL = restAPI();

const axiosInstance = axios.create({
  baseURL: API_CALL.auth,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return;
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
