import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import restAPI from "./restAPI";

const useBusinessData = () => {
  const [getBusinessData, setBusinessData] = useState({
    navbar: [],
    sidebar: [],
  });
  const [loadingData, setLoadingData] = useState(true);
  const API_CAll = restAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(API_CAll.host + "/business-data");
        const response = await res.data;
        setBusinessData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);
  return { getBusinessData, loadingData };
};

export const useHomeBusiness = () => {
  const [header, setHeader] = useState([]);
  const [laodHeader, setLaodHeader] = useState(true);
  const isFetched = useRef(false);
  const API_CALL = restAPI();

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const results = await axios.get(`${API_CALL.host}/homeview-business`);
        const data = await results.data;
        setHeader(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLaodHeader(false);
      }
    };

    if (!isFetched.current) {
      fetchingData();
      isFetched.current = true;
    }
  }, []);

  return { header, laodHeader };
};

export const useBusinessSettings = () => {
  const [getCardInfo, setCardInfo] = useState([]);
  const [getCompanyLoad, setLoading] = useState(true);
  const isFetched = useRef(false);
  const API_CALL = restAPI();

  useEffect(() => {
    const fecthCompanyInfo = async () => {
      try {
        const response = await axios.get(`${API_CALL.host}/business-settings`);
        const res = await response.data;
        setCardInfo(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!isFetched.current) {
      fecthCompanyInfo();
      isFetched.current = true;
    }
  }, []);

  return { getCardInfo, getCompanyLoad };
};

export const useCompanyFilter = (props) => {
  const { name, title, description } = props;
  const [CompanyFilter, setCompanyFilter] = useState([]);
  const [CompanyLoading, setLoading] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (name) queryParams.append("name", name);
        if (title) queryParams.append("title", title);
        if (description) queryParams.append("description", description);

        const response = await axios.get(
          `${API_CALL.host}/business-company-filter?${queryParams.toString()}`
        );
        setCompanyFilter(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    FetchData();
  }, [name, title, description]);

  return { CompanyFilter, CompanyLoading };
};

export const useCompanyView = (companydata) => {
  const [viewData, setViewData] = useState([]);
  const [viewloading, setLoading] = useState(true);
  const API_CALL = restAPI();

  useEffect(() => {
    const fecthCompanyView = async () => {
      if (!companydata) return;
      try {
        const param = new URLSearchParams();
        if (companydata) param.append("company", companydata);
        const response = await axios.get(
          `${API_CALL.host}/business-company-viewpage`,
          { params: { company: companydata } }
        );
        const responseImageUrl = await axios.get(
          `${API_CALL.host}/business-company-images`,
          { params: { company: companydata } }
        );
        const responsePersonnel = await axios.get(
          `${API_CALL.host}/business-company-personnel`,
          { params: { company: companydata } }
        );
        const responseProduct = await axios.get(
          `${API_CALL.host}/business-company-product`,
          { params: { company: companydata } }
        );
        const responseSocial = await axios.get(
          `${API_CALL.host}/business-company-socials`,
          { params: { company: companydata } }
        );
        const res = {
          info: response.data,
          images: responseImageUrl.data,
          personnels: responsePersonnel.data,
          product: responseProduct.data,
          socials: responseSocial.data,
        };

        setViewData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fecthCompanyView();
  }, [companydata]);

  return { viewData, viewloading };
};

export const useBusinessPost = () => {
  const [result, setResult] = useState("");
  const [businessLoad, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fetchBusinessContent = async (initialData) => {
    try {
      const response = await axios.post(
        `${API_CALL.host}/company/content/data`,
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
  return { fetchBusinessContent, result, businessLoad };
};

export const useCategoryHeaderUp = () => {
  const [resultHeader, setResult] = useState();
  const [loadHeader, setLoader] = useState(true);
  const API_CALL = restAPI();
  const fetchCategoryHeader = async (data) => {
    const { header, path } = data;
    const initializeData = {
      header: header,
      path: path,
    };
    try {
      const response = await axios.put(
        `${API_CALL.host}/category/put/header/data`,
        initializeData
      );
      const res = await response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  return { fetchCategoryHeader, resultHeader, loadHeader };
};

export const useChildCategory = () => {
  const [resultChild, setResult] = useState("");
  const [loaderChild, setLoader] = useState(true);
  const API_CALL = restAPI();

  const fetchChildCategory = async (data) => {
    try {
      const response = await axios.put(
        `${API_CALL.host}/category/child/put/data`,
        { child: data.child }
      );
      const res = await response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  return { fetchChildCategory, resultChild, loaderChild };
};

export const useCategoryAddChild = () => {
  const [addResult, setResult] = useState("");
  const [loadNewAdd, setLoader] = useState(true);
  const API_CALL = restAPI();
  const fetchCateogryAddNewChild = async (data) => {
    const initialAddNew = {
      path: data.path,
      addNew: data.addNew,
    };
    if (!data.addNew) return;
    try {
      const response = await axios.post(
        `${API_CALL.host}/category/post/child-update/data`,
        initialAddNew
      );
      const res = await response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  return { fetchCateogryAddNewChild, addResult, loadNewAdd };
};

export const useCreateNewCategory = () => {
  const [resultCategoryNew, setResult] = useState("");
  const [loadNew, setLoader] = useState(true);
  const API_CALL = restAPI();

  const fetchCreateNewCategory = async (data) => {
    try {
      const response = await axios.post(
        `${API_CALL.host}/category/post/data`,
        data
      );
      const res = await response.data;
      setResult(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
    }
  };

  return { fetchCreateNewCategory, resultCategoryNew, loadNew };
};

export default useBusinessData;
