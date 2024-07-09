import axios from "axios";
import { useEffect, useState } from "react";
import restAPI from "./restAPI";

export const useUserData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_CALL = restAPI();
  useEffect(() => {
    axios
      .get(`${API_CALL.host}/api/users`)
      .then((response) => {
        setData(response.data);
        setLoading(false); // Data loaded, stop loading
      })
      .catch((error) => {
        console.error("Axios Error:", error);
        setLoading(false); // Even if there's an error, stop loading
      });

    // Stop showing the spinner after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
};