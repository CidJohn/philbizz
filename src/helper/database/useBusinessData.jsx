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

export default useBusinessData;
