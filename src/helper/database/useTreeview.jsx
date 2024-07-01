import axios from "axios";
import { useEffect, useState, useRef } from "react";
import restAPI from "./restAPI";

export const useTreeview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFetched = useRef(false); // Ref to track if data has been fetched

  const API_CALL = restAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_CALL.host}/treeview/child`);
        //console.log("API Response:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Axios Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isFetched.current) {
      // Check if data has already been fetched
      fetchData();
      isFetched.current = true; // Mark as fetched
    }
  }, []);

  return { data, loading };
};
