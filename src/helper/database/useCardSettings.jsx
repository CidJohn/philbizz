import React, { useEffect, useState } from "react";
import restAPI from "./restAPI";
import axios from "axios";

const useCardSettings = (type) => {
  const [searchload, setSearchLoad] = useState(true);
  const [businessTypes, setBusinessTypes] = useState([]);
  const API_CALL = restAPI();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_CALL.host}/business-types/${type}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBusinessTypes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setSearchLoad(false);
      }
    };

    fetchData();
  }, [type]); // Trigger fetch when `type` prop changes

  return { businessTypes, searchload };
};

export default useCardSettings;
