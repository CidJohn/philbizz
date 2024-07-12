import axios from "axios";
import { useEffect, useState } from "react";
import restAPI from "./restAPI";

const useCardInfo = (type) => {
  const [getData, setData] = useState([]);
  const [loadData, setLoadData] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const fetchingData = async () => {
      try {
        if (!type) return; // Add a check for undefined type
        const results = await axios.get(`${API_CALL.host}/card_info/${type}`);
        const data = await results.data; // No need for await here since results.data is synchronous
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadData(false);
      }
    };

    fetchingData();
  }, [type]);

  return { getData, loadData };
};

export default useCardInfo;
