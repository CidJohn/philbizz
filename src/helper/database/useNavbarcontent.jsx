import axios from "axios";
import { useEffect, useRef, useState } from "react";
import restAPI from "./restAPI";

export const useNavbarcontent = () => {
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
      } 
    };
    if (!isFetched.current) {
      fetchData();
      isFetched.current = true;
    }
  }, [API_CALL.host]);
  return { navbarData };
};
