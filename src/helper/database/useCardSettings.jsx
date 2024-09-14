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

export const useCreateCardContent = () => {
  const [resultCard, setResult] = useState("");
  const [cardload, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fetchCreateCard = async (initialData) => {
    try {
      const response = await axios.post(
        `${API_CALL.host}/card/content/data`,
        initialData
      );
      const res = await response.data;
      console.log(response);
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { resultCard, cardload, fetchCreateCard };
};

export default useCardSettings;
