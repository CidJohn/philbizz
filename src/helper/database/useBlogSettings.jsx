import axios from "axios";
import React, { useEffect, useState } from "react";
import restAPI from "./restAPI";

const useBlogSettings = () => {
  const [blogData, setBlogData] = useState([]);
  const [blogload, setLoading] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${API_CALL.host}/blog-settings`);
        const res = await response.data;
        setBlogData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, []);

  return { blogData, blogload };
};

export const useBlogContent = (id) => {
  const [content, setContent] = useState([]);
  const [contentload, setLoading] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const fetchContent = async () => {
      if (!id) return;
      try {
        const param = new URLSearchParams();
        if (id) param.append("id", id);
        const response = await axios.get(
          `${API_CALL.host}/blog-content?${param.toString()}`
        );
        const res = response.data;
        setContent(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [id]);

  return { content, contentload };
};

export default useBlogSettings;
