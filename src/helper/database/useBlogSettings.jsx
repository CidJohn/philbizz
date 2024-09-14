import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import restAPI from "./restAPI";

const useBlogSettings = () => {
  const [blogData, setBlogData] = useState([]);
  const [blogload, setLoading] = useState(true);
  const isFetched = useRef(false);
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
    if (!isFetched.current) {
      fetchBlogData();
      isFetched.current = true;
    }
  }, []);

  return { blogData, blogload };
};

export const useBlogContent = (props) => {
  const { title, user } = props;
  const [content, setContent] = useState([]);
  const [contentload, setLoading] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const trimmedTitle = title?.trim();
    const trimmedUser = user?.trim();
    const initialData = {
      title: trimmedTitle,
      username: trimmedUser,
    };
    const fetchContent = async () => {
      if (!trimmedTitle || !trimmedUser) return;
      try {
        const response = await axios.get(`${API_CALL.host}/blog-content`, {
          params: initialData,
        });
        const res = response.data;
        setContent(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [title, user]);

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
        const { userid, title, image, description } = item;

        // Construct FormData
        const formData = new FormData();
        if (userid) formData.append("userid", userid);
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
        const { userid, title, image, description } = item;

        // Construct FormData
        const formData = new FormData();
        if (userid) formData.append("userid", userid);
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

export const useBlogCommentContent = ({ id }) => {
  const [commentData, setCommentData] = useState([]);
  const [commentLoad, setLoading] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    if (!id) return; // If no ID is provided, exit early
    const params = new URLSearchParams();
    const controller = new AbortController(); // Create an AbortController instance
    if (id) params.append("id", id);
    const fetchingCommentData = async () => {
      try {
        const response = await axios.get(
          `${API_CALL.host}/comment-section?${params}`, // Correct URL path
          { signal: controller.signal } // Attach the abort signal to the request
        );
        const res = response.data;
        setCommentData(res);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error(
            "Error during fetching blog description:",
            error.response?.data || error.message
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchingCommentData();

    // Cleanup function to cancel the request if the component unmounts
    return () => {
      controller.abort();
    };
  }, [id, API_CALL.host]); // Only re-run when id or API_CALL.host changes

  return { commentData, commentLoad };
};

export const useCommentPost = () => {
  const [result, setResult] = useState("");
  const [postLoading, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fetchCommentPost = async (data) => {
    const { userid, commentID, comment } = data;
    if (!userid || !commentID || !comment) return;
    const params = new URLSearchParams();
    params.append("userid", userid);
    params.append("commentID", commentID);
    params.append("comment", comment);
    try {
      const response = await axios.post(
        `${API_CALL.host}/blog-post-comment`,
        data
      );
      const res = response.data;
      setResult(res);
      return res;
    } catch (error) {
      console.error(
        "Error during fetching blog comment:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return { fetchCommentPost, result, postLoading };
};

export const useBlogLiked = () => {
  const [dataliked, setDataLiked] = useState({});
  const API_CALL = restAPI();

  const fetchBlogLike = async (data) => {
    const { postid, userid } = data;
    if (!postid || !userid) return;

    try {
      const response = await axios.post(`${API_CALL.host}/posts/like`, data);
      const res = response.data.liked;

      setDataLiked((prevDataLiked) => ({
        ...prevDataLiked,
        [postid]: res,
      }));

      return { liked: res }; // Return the liked status
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const fetchInitialLikes = async (blogdata, id) => {
    const likeStatuses = {};

    for (const item of blogdata) {
      try {
        const response = await axios.post(
          `${API_CALL.host}/posts/like-status`,
          {
            postid: item.commentID,
            userid: id,
          }
        );

        likeStatuses[item.commentID] = response.data.liked;
      } catch (error) {
        console.error("Error fetching like status:", error.message);
      }
    }

    setDataLiked(likeStatuses);
  };

  return { fetchBlogLike, fetchInitialLikes, dataliked, setDataLiked };
};

export const usePostBlogContent = () => {
  const [result, setResult] = useState("");
  const [postloading, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fetchPostBlog = async (initialData) => {
    try {
      const response = await axios.post(
        `${API_CALL.host}/blog/content/data`,
        initialData
      );
      const res = await response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching like status:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { result, postloading, fetchPostBlog };
};



export default useBlogSettings;
