import React, { useEffect, useState } from "react";
import { axiosGet, axiosPost, axiosPut } from "../auth/axiosInstance";

function useNavbarSettings() {
  const [navbarResult, setNavbarResult] = useState();
  const [navbarLoading, setLoading] = useState(true);

  const postNavbar = async (data) => {
    try {
      const response = await axiosPost("/auth/navbar/creation", data);
      console.log(response);
      setNavbarResult(response);
    } catch (error) {
      console.log("axios error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const putNavbar = async (data) => {
    try {
      const response = await axiosPut("/auth/navbar/creation", data);
      setNavbarResult(response);
    } catch (error) {
      console.log("axios error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { postNavbar, putNavbar, navbarResult, navbarLoading };
}

export const useNavbarView = () => {
  const [navbarData, setNavbarData] = useState([]);
  const [loadingData, setLoading] = useState(true);

  useEffect(() => {
    const getNavbar = async () => {
      try {
        const response = await axiosGet("/app/navbar-list");
        setNavbarData(response);
      } catch (error) {
        console.error("axios error: ", error);
      } finally {
        setLoading(false);
      }
    };
    getNavbar();
  }, []);

  return { navbarData, loadingData };
};
export default useNavbarSettings;
