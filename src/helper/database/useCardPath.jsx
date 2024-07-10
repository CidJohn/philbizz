import { useEffect, useState } from "react";
import restAPI from "./restAPI";

export const useCardPath = () => {
  const [load, setLoad] = useState(true);
  const [cardpath, setCardPath] = useState([]);
  const API_CALL = restAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_CALL.host}/card_path`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCardPath(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchData();
  }, []); // Trigger fetch when `type` prop changes

  return { cardpath, load };
};

export const useCardDesc = (type) => {
  const [descload, setDescLoad] = useState(true);
  const [businesses, setBusinesses] = useState([]);
  const API_CALL = restAPI();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_CALL.host}/card-desciption/${type}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setDescLoad(false);
      }
    };

    fetchData();
  }, [type]); // Trigger fetch when `type` prop changes

  return { businesses, descload };
};
