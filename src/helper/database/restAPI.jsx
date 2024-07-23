
const restAPI = () => {
  const apiUrl2 = process.env.REACT_APP_API_SERVER;
  const apiUrl = process.env.REACT_APP_API_URL;
  const API_CALL = {
    host: apiUrl2,
  };
  return API_CALL;
};

export default restAPI;
