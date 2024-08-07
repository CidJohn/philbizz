import axios from "axios";
import React, { useEffect, useState } from "react";
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

    fetchingData();
  }, []);

  return { header, laodHeader };
};

export const useBusinessSettings = () => {
  const [getCardInfo, setCardInfo] = useState([]);
  const [getCompanyLoad, setLoading] = useState(true);
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

    fecthCompanyInfo();
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

export const useCompanyView = () => {
  const [viewData, setViewData] = useState([]);
  const [viewloading, setLoading] = useState(true);
  const API_CALL = restAPI();

  const fecthCompanyView = async (companydata) => {
    if (!companydata) return;
    try {
      const param = new URLSearchParams();
      if (companydata) param.append("company", companydata);
      const response = await axios.get(
        `${API_CALL.host}/business-company-viewpage?${param.toString()}`
      );
      const res = response.data;
      setViewData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthCompanyView();
  }, []);

  return { viewData, viewloading, fecthCompanyView };
};

export default useBusinessData;
