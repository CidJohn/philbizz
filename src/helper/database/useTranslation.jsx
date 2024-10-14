import React, { useEffect, useRef, useState } from "react";
import restAPI from "./restAPI";
import axios from "axios";

const useTranslation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFetched = useRef();
  const API_CALL = restAPI();
  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await axios.get(
          `${API_CALL.host}/translation/language`
        );
        setData(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!isFetched.current) {
      fetchingData();
      isFetched.current = true;
    }
  }, [API_CALL.host]);
  console.log(data);
  return { data };
};

export default useTranslation;
