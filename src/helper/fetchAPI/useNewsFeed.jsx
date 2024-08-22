import axios from "axios";
import { useEffect, useState } from "react";

const useNewsFeed = () => {
  const [getNewsData, setNewsData] = useState();
  const [getNewsLoad, setLoading] = useState(true);
  const [getCountry, setCountry] = useState("kr");
  const [getCategory, setCategory] = useState("business");
  const apiKey = process.env.REACT_APP_API_NEWS;
  const BASE_URL = process.env.REACT_APP_API_NEWS_URL;
  const pageSize = 10;

  useEffect(() => {
    const fetchNewsUpdate = async () => {
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            country: getCountry,
            category: getCategory,
            apiKey: apiKey,
            pageSize: pageSize,
          },
        });
        const res = await response.data;
        setNewsData(res);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsUpdate();
  }, [getCountry, getCategory, apiKey, pageSize]);

  return { getNewsData, getNewsLoad };
};

export default useNewsFeed;
