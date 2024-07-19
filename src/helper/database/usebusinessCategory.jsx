import axios from "axios";
import React, { useEffect, useState } from "react";
import restAPI from "./restAPI";

const useBusinessCategory = () => {
  const [getCategory, setCategory] = useState([]);
  const [loadCategory, setLoading] = useState(true);
  const API_CAll = restAPI();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${API_CAll.host}/business-category`);
        const res = response.data;
        setCategory(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return { getCategory, loadCategory };
};

export default useBusinessCategory;
