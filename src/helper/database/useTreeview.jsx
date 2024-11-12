import axios from "axios";
import { useEffect, useState, useRef } from "react";
import restAPI from "./restAPI";
import axiosInstance, {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
} from "../auth/axiosInstance";

let API_CALL = restAPI();

export const useTreeview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false); // Ref to track if data has been fetched

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL.host}/treeview/child`);
        //console.log("API Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isFetched.current) {
      fetchData();
      isFetched.current = true;
    }
  }, []);

  return { data, loading };
};

export const useSideMenu = () => {
  const [resultMenu, setResultMenu] = useState();
  const [MenuLoading, setMenuLoading] = useState(true);
  const [updateLoading, setLoading] = useState(true);

  const postSideMenu = async (data) => {
    if (!data) return;
    try {
      const response = await axiosPost(`/auth/menus/creation`, data);
      const res = response;
      setResultMenu(res);
    } catch (error) {
      console.error("Axios Error:", error);
    } finally {
      setMenuLoading(false);
    }
  };

  const putSideMenu = async (data) => {
    if (!data) return;
    try {
      const response = await axiosPut("/auth/menus/creation", data);
      return response ? response : null;
    } catch (error) {
      console.error("Axios Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSideMenu = async (data) => {
    if (!data) return;
    try {
      const response = await axiosDelete("/", data);
      return response ? response.data : null;
    } catch (error) {
      console.error("axios error: ", error);
    }
  };
  return {
    postSideMenu,
    putSideMenu,
    deleteSideMenu,
    updateLoading,
    resultMenu,
    MenuLoading,
  };
};

export const useSideMenuView = () => {
  const [viewMenu, setViewMenu] = useState();
  const [menuLoading, setLoading] = useState(true);

  useEffect(() => {
    const viewSideMenu = async () => {
      try {
        const res = await axiosGet("/app/get-menus");
        setViewMenu(res);
      } catch (error) {
        console.error("Axios Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    viewSideMenu();
  }, []);

  return { viewMenu, menuLoading };
};

export const useSideMenuUpdate = () => {
  return {};
};
