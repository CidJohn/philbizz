import axios from "axios";
import restAPI from "../database/restAPI";
import useStorage from "../storage/Storage";

const API_CALL = restAPI();
const axiosInstance = axios.create({
  //baseURL: API_CALL.auth,
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

export default axiosInstance;
