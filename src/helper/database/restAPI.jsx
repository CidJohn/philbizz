const restAPI = () => {
  const apiUrl2 = process.env.REACT_APP_API_SERVER;
  const apiUrl = process.env.REACT_APP_API_URL;
  const imageURL = process.env.REACT_APP_IMAGE_URL;
  const imageURL2 = process.env.REACT_APP_IMAGE_SERVER;
  const API_CALL = {
    host: apiUrl + "/content",
    auth: apiUrl + "/auth",
    image: imageURL + "/images/",
  };
  return API_CALL;
};

export default restAPI;
