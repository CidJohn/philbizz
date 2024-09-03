import { useEffect, useRef, useState } from "react";
import restAPI from "./restAPI";
import axios from "axios";

export const useCardPath = () => {
  const [load, setLoad] = useState(true);
  const [cardpath, setCardPath] = useState([]);
  const isFetched = useRef(false);
  const API_CALL = restAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL.host}/card_path`);
        const data = await response.data;
        setCardPath(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoad(false);
      }
    };

    if (!isFetched.current) {
      fetchData();
      isFetched.current = true;
    }
  }, []); // Trigger fetch when `type` prop changes

  return { cardpath, load };
};

export const useCardDesc = (type) => {
  const [descload, setDescLoad] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const isFetched = useRef(false);
  const API_CALL = restAPI();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!type) return;
        const response = await axios.get(
          `${API_CALL.host}/card-desciption/${type.toLowerCase()}`
        );
        const data = await response.data;
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDescLoad(false);
      }
    };

    if (!isFetched.current) {
      fetchData();
      isFetched.current = true;
    }
  }, [type]); // Trigger fetch when `type` prop changes
  return { businesses, descload };
};
