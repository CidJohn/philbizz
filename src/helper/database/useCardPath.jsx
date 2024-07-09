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
