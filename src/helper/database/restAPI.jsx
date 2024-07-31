const restAPI = () => {
  const apiUrl2 = process.env.REACT_APP_API_SERVER;
  const apiAuth2 = process.env.REACT_APP_API_AUTH_SERVER;
  const API_CALL = {
   host: apiUrl2 + "/content",
    auth: apiUrl2 + "/auth",
  };
  return API_CALL;
};

export default restAPI;
