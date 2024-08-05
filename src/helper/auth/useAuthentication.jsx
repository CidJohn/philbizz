import axios from "axios";
import React, { useEffect, useState } from "react";
import restAPI from "../database/restAPI";
import axiosInstance from "./axiosInstance";

export const useRegistration = () => {
  const [loadData, setLoadData] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setErrors] = useState(null);
  const API_CALL = restAPI();

  const fetchRegistration = async (props) => {
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

  return { fetchRegistration, response, loadData, error };
};

export const useLogin = () => {
  const [loginLoad, setLoading] = useState(true);
  const [error, setErrors] = useState(null);
  const [token, setToken] = useState(null);
  const API_CALL = restAPI();

  const fetchingLogin = async (props) => {
    if (!props || !props.email || !props.password) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${API_CALL.auth}/login`, props);
      const res = await response.data.token;
      setToken(res);
    } catch (error) {
      setErrors(error.response?.data);
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return { fetchingLogin, loginLoad, error, token };
};

export const useProtect = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [loadprotect, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/protected");
        const res = response.data;
        setData(res);
      } catch (err) {
        if (err.response?.data) {
          setError(err.response?.data || "An error occurred");
          console.error(err.response?.data || "");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  return { data, error, loadprotect };
};

export const useUserData = () => {
  const [getData, setData] = useState([]);
  const [userload, setLoading] = useState(true);
  const [userError, setError] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/user");
      const res = response.data;
      setData(res);
    } catch (err) {
      if (err.response?.data) {
        setError(err.response?.data || "An error occurred");
        console.error(err.response?.data || "");
      }
    } finally {
      setLoading(false);
    }
  };
  fetchUser();

  return { getData, userload, userError };
};
