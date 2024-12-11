import { createContext, useContext, useEffect, useState } from "react";
import {
  useContentViewList,
  useMainPageContentList,
  useViewContentInfo,
} from "../database/useCardSettings";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const {
    viewContent,
    setHeader,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearch,
    loadContent,
  } = useContentViewList();
  const { setUuid, viewInfo, infoLoader } = useViewContentInfo();
  const { mainList, listLoader } = useMainPageContentList();
  const [contentList, setContentList] = useState([]);
  const [contentInfo, setContentInfo] = useState([]);
  const [mainContentList, setMainContentList] = useState([]);

  useEffect(() => {
    setContentList(viewContent ? viewContent : []);
    if (viewInfo.length > 0) {
      viewInfo.map((item) => setContentInfo(item));
    }
    if (mainList.length > 0) {
      setMainContentList(mainList);
    }
  }, [viewContent, viewInfo, mainList]);

  return (
    <GlobalContext.Provider
      value={{
        contentList,
        setHeader,
        setUuid,
        contentInfo,
        infoLoader,
        mainContentList,
        currentPage,
        totalPages,
        setCurrentPage,
        setSearch,
        loadContent
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
