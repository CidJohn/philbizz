import axios from "axios";
import { useEffect, useRef, useState } from "react";

export const useNavbarcontent = () => {
  const [navbarData, setNavbarData] = useState();
  const [loading, setLoading] = useState(false);
  const isFetched = useRef(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("api/navbarcontent");
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
