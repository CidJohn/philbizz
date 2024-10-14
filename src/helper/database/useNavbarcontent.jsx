import axios from "axios";
import { useEffect, useRef, useState } from "react";
import restAPI from "./restAPI";

export const useNavbarcontent = () => {
  const [loading, setLoading] = useState(true);
  const [navbarData, setNavbarData] = useState([]);
  const isFetched = useRef(false);

  const API_CALL = restAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_CALL.host}/navbarcontent`);
        setNavbarData(res.data);
      } catch (error) {
        console.error("Axios Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!isFetched.current) {
      fetchData();
      isFetched.current = true;
    }
  }, []);

  return { navbarData, loading };
};
