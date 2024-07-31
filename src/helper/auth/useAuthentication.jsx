import axios from "axios";
import React, { useEffect, useState } from "react";
import restAPI from "../database/restAPI";

export const useRegistration = (props) => {
  const [loadData, setLoadData] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setErrors] = useState(null);
  const API_CALL = restAPI();

  useEffect(() => {
    if (
      !props ||
      !props.username ||
      !props.email ||
      !props.number ||
      !props.password
    ) {
      setLoadData(false);
      return;
    }

    const fetchRegistration = async () => {
      try {
        const response = await axios.post(`${API_CALL.auth}/register`, props);
        setResponse(response.data);
        setLoadData(false);
      } catch (error) {
        setErrors(error.response?.data || error.message);
        console.error(
          "Error during registration:",
          error.response?.data || error.message
        );
        setLoadData(false);
      }
    };

    fetchRegistration();
  }, [props, API_CALL.auth]);

  return { response, loadData, error };
};

export const useLogin = (props) => {};
