import { createContext, useContext, useEffect, useState } from "react";
import {
  useContentView,
  useContentViewList,
  useViewContentInfo,
} from "../database/useCardSettings";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [contentList, setContentList] = useState([]);
  const [contentInfo, setContentInfo] = useState([]);
  const { viewContent, setHeader } = useContentViewList();
  const { setUuid, viewInfo } = useViewContentInfo();

  useEffect(() => {
    setContentList(viewContent ? viewContent : []);
    setContentInfo(viewInfo ? viewInfo : "");
  }, [viewContent, viewInfo]);

  return (
    <GlobalContext.Provider
      value={{ contentList, setHeader, setUuid, contentInfo }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
