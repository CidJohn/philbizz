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
  const { setUuid, viewInfo, infoLoader } = useViewContentInfo();

  useEffect(() => {
    setContentList(viewContent ? viewContent : []);
    if (viewInfo.length > 0) {
      viewInfo.map((item) => setContentInfo(item));
    }
  }, [viewContent, viewInfo]);

  return (
    <GlobalContext.Provider
      value={{ contentList, setHeader, setUuid, contentInfo, infoLoader }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
