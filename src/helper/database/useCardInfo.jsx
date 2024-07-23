import axios from "axios";
import { useEffect, useState } from "react";
import restAPI from "./restAPI";


export const useCardInfo = (type) => {
  const [getData, setData] = useState([]);
  const [getURL, setURL] = useState("");
  const [loadData, setLoadData] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const fetchingData = async () => {
      if (!type) return; // Ensure type is defined
      try {
        const results = await axios.get(`${API_CALL.host}/card_info/${type}`);
        const data = results.data;
        setData(data);
        const url = data[0]?.location_image; // Ensure url is defined
        setURL(url);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadData(false);
      }
    };

    fetchingData();
  }, [type]);

  return { getData, getURL, loadData };
};

export const useImgCardURL = (type) => {
  const [getImage, setImage] = useState([]);
  const [loadImage, setLoadImg] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const fetchingData = async () => {
      try {
        if (!type) return; // Add a check for undefined type
        const results = await axios.get(`${API_CALL.host}/imageURL/${type}`);
        const data = await results.data; // No need for await here since results.data is synchronous
        setImage(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadImg(false);
      }
    };

    fetchingData();
  }, [type]);
  return { getImage, loadImage };
};
