import React, { useEffect, useRef, useState } from "react";
import restAPI from "./restAPI";
import axios from "axios";


const useCardSettings = (type) => {
  const [searchload, setSearchLoad] = useState(true);
  const [businessTypes, setBusinessTypes] = useState([]);
  const API_CALL = restAPI();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!type) return;
        const navName = type.toLowerCase();
        const response = await axios.get(
          `${API_CALL.host}/business-types/${navName}`
        );
        const data = response.data;
        setBusinessTypes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setSearchLoad(false);
      }
    };

    fetchData();
  }, [type]);
  return { businessTypes, searchload };
};

export default useCardSettings;
