import React, { useEffect, useMemo, useRef, useState } from "react";
import restAPI from "./restAPI";
import axios from "axios";
import axiosInstance, {
  axiosGet,
  axiosPost,
  axiosPut,
} from "../auth/axiosInstance";
import { ref, set } from "firebase/database";
import { storage } from "../storage/firebase/firebasestorage";

const useCardSettings = (type) => {
  const [searchload, setSearchLoad] = useState(true);
  const [businessTypes, setBusinessTypes] = useState([]);
  const API_CALL = restAPI();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!type) return;
        const navName = type.toLowerCase();
        const response = await axios.get(
          `${API_CALL.host}/business-types/${navName}`
        );
        const data = response.data;
        setBusinessTypes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setSearchLoad(false);
      }
    };

    fetchData();
  }, [type]);
  return { businessTypes, searchload };
};

export const useCreateCardContent = () => {
  const [resultCard, setResult] = useState("");
  const [cardload, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fetchCreateCard = async (initialData) => {
    try {
      const response = await axios.post(
        `${API_CALL.host}/card/content/data`,
        initialData
      );
      const res = await response.data;
      console.log(response.data);
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { resultCard, cardload, fetchCreateCard };
};

export const useTreevieUpdate = () => {
  const [resultUp, setResult] = useState("");
  const [treeUpdate, setLoading] = useState(true);
  const API_CALL = restAPI();
  const fetchTreeUpdate = async (initialData) => {
    const { parent, path } = initialData;
    const initialParent = {
      parent: parent,
      path: path,
    };
    try {
      const response = await axios.put(
        `${API_CALL.host}/treeview/put/data`,
        initialParent
      );
      const res = await response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { resultUp, treeUpdate, fetchTreeUpdate };
};

export const useTreeChildUp = () => {
  const [resultChild, setResult] = useState("");
  const [treeUpdate, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fetchTreeChildUp = async (initialData) => {
    try {
      const response = await axios.put(
        `${API_CALL.host}/treeview/child/put/data`,
        { child: initialData.child }
      );
      const res = await response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { resultChild, treeUpdate, fetchTreeChildUp };
};

export const useTreeViewCreate = () => {
  const [resultNew, setResult] = useState("");
  const [treeUpdate, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fetchTreeCreate = async (initialData) => {
    const initialAddNew = {
      path: initialData.path,
      addNew: initialData.addNew,
    };
    if (!initialAddNew.addNew) return;
    try {
      const response = await axios.post(
        `${API_CALL.host}/treeview/post/child-update/data`,
        initialAddNew
      );
      const res = await response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { resultNew, treeUpdate, fetchTreeCreate };
};

export const useCreateTreeView = () => {
  const [resultNew, setResult] = useState("");
  const [treeload, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fetchTreeCreate = async (initialData) => {
    try {
      const response = await axios.post(
        `${API_CALL.host}/treeview/post/data`,
        initialData
      );
      const res = await response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return { resultNew, treeload, fetchTreeCreate };
};

export const useUpdateCardContent = () => {
  const [resultCardUpdate, setResult] = useState("");
  const [cardLoading, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fetchUpdateCard = async (data) => {
    if (!data) return;
    try {
      const response = await axios.put(
        `${API_CALL.host}/card-content/put/data`,
        data
      );
      const res = response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  return { fetchUpdateCard, resultCardUpdate, cardLoading };
};

export const useCardPosting = () => {
  const [cardResult, setCardResult] = useState(null);
  const [cardLoading, setCardLoading] = useState(true);

  const postCard = async (data) => {
    if (!data) return;

    const {
      Textline: {
        required: { title, image },
      },
      Texteditor: content,
      Treeview: { imageTitle },
    } = data;

    try {
      const response = await axiosPost("/auth/post-card-content/", data);
      setCardResult(response);
      if (content) {
        const saveContent = {
          title: title,
          content: content,
          imageTitle: imageTitle,
          imageData: image,
        };
        const fireSStorage = ref(storage, `card-content/${title}`);
        await set(fireSStorage, saveContent);
      }
    } catch (error) {
      console.error("axios error: ", error);
      setCardResult(error);
    } finally {
      setCardLoading(false);
    }
  };

  const putCard = async (data) => {
    try {
      const response = await axiosPut("auth/put-card-content/", data);
      setCardResult(response);
    } catch (error) {
      console.error("axios error: ", error);
    } finally {
      setCardLoading(false);
    }
  };

  return { postCard, putCard, cardResult, cardLoading };
};

export const useContentViewList = () => {
  const [header, setHeader] = useState("");
  const [viewContent, setViewContent] = useState([]);
  const [loadContent, setLoadContent] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getContentList = async () => {
      if (!header) return;
      setLoadContent(true);
      const timerin = setTimeout(() => {
        setLoadContent(true);
      }, 7000);

      try {
        const response = await axiosGet(
          `/app/content/list?header=${header}&search=${search}&page=${currentPage}`
        );
        if (response) {
          setViewContent(response.results || []);
          setTotalPages(Math.ceil(response.count / 15));
        }
      } catch (err) {
        console.error("Axios Error:", err);
      } finally {
        clearTimeout(timerin);
        setLoadContent(false);
      }
    };
    getContentList();
  }, [header, search, currentPage]);

  return {
    viewContent,
    loadContent,
    setHeader,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearch,
  };
};

export const useViewContentInfo = () => {
  const [getUuid, setUuid] = useState("");
  const [viewInfo, setViewInfo] = useState([]);
  const [infoLoader, setLoader] = useState(true);
  useEffect(() => {
    if (!getUuid) return;
    const fetchingInfo = async () => {
      try {
        const response = await axiosGet(
          `/app/content/view/info?content=${getUuid}`
        );
        setViewInfo(response);
      } catch (error) {
        console.log("axios error: ", error);
      } finally {
        setLoader(false);
      }
    };
    fetchingInfo();
  }, [getUuid]);

  return { setUuid, viewInfo, infoLoader };
};

export const useMainPageContentList = () => {
  const [mainList, setMainList] = useState([]);
  const [listLoader, setLoader] = useState(true);

  useEffect(() => {
    const fetchingContentList = async () => {
      try {
        const response = await axiosGet("/app/main-content/view/list");
        setMainList(response);
      } catch (error) {
        console.error("axios error:", error);
      } finally {
        setLoader(false);
      }
    };
    fetchingContentList();
  }, []);

  return { mainList, listLoader };
};

export default useCardSettings;
