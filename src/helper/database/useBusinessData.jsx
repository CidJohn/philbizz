import axios from "axios";
import React, { useEffect, useState } from "react";
import restAPI from "./restAPI";

const useBusinessData = () => {
  const [getBusinessData, setBusinessData] = useState({
    navbar: [],
    sidebar: [],
  });
  const [loadingData, setLoadingData] = useState(true);
  const API_CAll = restAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_CAll.host + "/business-data");
        const response = await res.data;
        setBusinessData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);
  return { getBusinessData, loadingData };
};

export const useHomeBusiness = () => {
  const [header, setHeader] = useState([]);
  const [laodHeader, setLaodHeader] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const results = await axios.get(`${API_CALL.host}/homeview-business`);
        const data = await results.data;
        setHeader(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLaodHeader(false);
      }
    };

    fetchingData();
  }, []);

  return { header, laodHeader };
};
export default useBusinessData;
