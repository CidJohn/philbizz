import React from "react";

const restAPI = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl2 = process.env.REACT_APP_API_SERVER;
  const API_CALL = {
    //host: "http://localhost:3001/api",
    //host: "https://project-philzone-be.onrender.com/api",
    //host: apiUrl,
    host: apiUrl2,
  };
  return API_CALL;
};

export default restAPI;
