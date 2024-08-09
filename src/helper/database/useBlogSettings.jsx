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

export const useBlogContent = (title) => {
  const [content, setContent] = useState([]);
  const [contentload, setLoading] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const trimmedTitle = title?.trim(); // Remove trailing spaces from the title

    const fetchContent = async () => {
      if (!trimmedTitle) return;
      try {
        const param = new URLSearchParams();
        if (trimmedTitle) param.append("title", trimmedTitle);
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
  }, [title]);

  return { content, contentload };
};

export const useBlogPost = () => {
  const [titleLoading, setTitleLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState({});
  const API_CALL = restAPI();

  const fetchBlogTitle = async (data) => {
    setTitleLoading(true);
    setError(null);
    try {
      for (const item of data) {
        const { username, title, image, description } = item;

        // Construct FormData
        const formData = new FormData();
        if (username) formData.append("username", username);
        if (title) formData.append("title", title.trim());
        if (image) formData.append("image", image); // Assuming `image` is a File object
        if (description) formData.append("desc", description.trim());

        // Send POST request
        const response = await axios.post(
          `${API_CALL.host}/blog-post-title`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const res = response.data;
        setSuccess((prev) => ({ ...prev, title: res }));
      }
    } catch (error) {
      setError(error.response?.data || error.message);
      console.error(
        "Error during fetching blog title:",
        error.response?.data || error.message
      );
    } finally {
      setTitleLoading(false);
    }
  };

  const fetchBlogDesc = async (data) => {
    setContentLoading(true);
    setError(null);
    try {
      for (const item of data) {
        const { username, title, image, description } = item;

        // Construct FormData
        const formData = new FormData();
        if (username) formData.append("username", username);
        if (title) formData.append("title", title.trim());
        if (image) formData.append("image", image); // Ensure image is a File object
        if (description) formData.append("desc", description.trim());

        // Send POST request
        const response = await axios.post(
          `${API_CALL.host}/blog-post-content`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const res = response.data;
        setSuccess((prev) => ({ ...prev, content: res }));
      }
    } catch (error) {
      setError(error.response?.data || error.message);
      console.error(
        "Error during fetching blog description:",
        error.response?.data || error.message
      );
    } finally {
      setContentLoading(false);
    }
  };

  return {
    fetchBlogTitle,
    fetchBlogDesc,
    titleLoading,
    contentLoading,
    error,
    success,
  };
};

export default useBlogSettings;
