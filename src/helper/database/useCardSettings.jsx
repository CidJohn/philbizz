import React, { useEffect, useRef, useState } from "react";
import restAPI from "./restAPI";
import axios from "axios";

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
      console.log(response);
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

  return {resultNew, treeload, fetchTreeCreate}
}

export default useCardSettings;
