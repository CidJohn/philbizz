import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import {
  useSideMenuView,
  useTreeview,
} from "../../helper/database/useTreeview";
import ContentLayout from "../Selection_handler/Selection/ContentLayout";
import RenderTreeView from "../Selection_handler/RenderTreeView/renderTreeView";
import HandleCards from "../Selection_handler/HandleCards/handleCards";
import useCardSettings, {
  useContentView,
} from "../../helper/database/useCardSettings";
import { useCardDesc } from "../../helper/database/useCardPath";
import { useGlobalContext } from "../../helper/context/useContext";
import MaintenancePage from "../../components/Maintenance/Maintenance";

const Selection = (props) => {
  const { navbar } = props;
  const {
    contentList,
    setHeader,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearch,
    loadContent,
  } = useGlobalContext();
  const currentRef = useRef();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, path, pageName, sideBarColorChanger } = state || {
    id: null,
    path: null,
    pageName: null,
    sideBarColorChanger: null,
  };
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsMainPage, setItemsMainPage] = useState(15);
  const [dropdownValue, setDropdownValue] = useState("");
  const [contentView, setFilterContent] = useState([]);
  const [desc, setDesc] = useState([]);
  const { data } = useTreeview();
  const { viewMenu, loading } = useSideMenuView();
  const [filteredData, setFilteredData] = useState("");

  useEffect(() => {
    if (!contentList) return;

    const filteredContent = contentList.filter((item) => {
      return item.business?.header === pageName;
    });
    setFilterContent(filteredContent);
    setHeader(pageName);
  }, [contentList, pageName]);

  useEffect(() => {
    if (viewMenu) {
      const selectedItemObj = viewMenu ? findItemById(viewMenu, path) : null;
      setSelectedItem(selectedItemObj);
    }
    const selectedItemPath = navbar ? findingPath(navbar, path) : "";
    setCurrentPath(selectedItemPath || "");

    if (id) {
      const selectedItemObj = viewMenu ? findItemById(viewMenu, id) : null;
      setSelectedItem(selectedItemObj);
      setFilteredData("");
    }
  }, [path, viewMenu, navbar, currentPath]);

  useEffect(() => {
    if (selectedItem) {
      if (currentRef.current) {
        currentRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ behavior: "smooth" });
      }
    }
  }, [selectedItem]);

  const findItemById = (items, id) => {
    if (!items) return null;
    for (const item of items) {
      if (item.id === id || item.ids === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findingPath = (items, path) => {
    if (!items) return null;
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const found = findingPath(item.children, path);
        if (found) return found;
      }
    }
    return null;
  };

  const handleItemClick = (clickedId, clickedPath) => {
    navigate(`${path}#cards`, {
      state: {
        id: id,
        pageName: pageName,
        path: path,
        sideBarColorChanger: sideBarColorChanger,
      },
    });

    const selectedItemObj = viewMenu
      ? findItemById(viewMenu, clickedId || id)
      : null;
    setSelectedItem(selectedItemObj);
    setFilteredData("");
    setTimeout(() => {
      const section = document.getElementById("cards");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handlePageChange = (pageNumber) => {
    navigate(`${path}#content_card`, {
      state: {
        id: id,
        pageName: pageName,
        path: path,
        sideBarColorChanger: sideBarColorChanger,
      },
    });
    setCurrentPage(pageNumber);
    setHeader(pageName);
  };

  const handleOnSearch = async (e) => {
    setSearch(e.title);
  };

  const dropdownOptions = [
    { value: "", label: "Select All" },
    ...contentView.map((item) => ({
      value: item.address,
      label: item.address,
    })),
  ];

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
    console.log(e.target.value);
    const filterResult = contentView.filter((item) =>
      item.address.includes(e.target.value)
    );
    setFilteredData(filterResult);
  };

  const handleLink = (data) => {
    navigate(`/card-page/${data.title}`, { state: { pageContent: data } });
  };

  const sideAds = Array.isArray(contentView) ? contentView.slice(0, 3) : [];
  const currentCardItem = Array.isArray(contentView)
    ? contentView.slice(3)
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
   if (loadContent ) {
     return (
       <div className="flex items-center justify-center min-h-screen">
         <Spinner />
       </div>
     );
   }

   if (contentView.length === 0) {
     return (
       <div className="w-full flex items-center justify-center min-h-screen">
         <MaintenancePage />
       </div>
     );
   }

  return (
    <ContentLayout
      renderTreeView={() => (
        <RenderTreeView
          currentPath={currentPath}
          data={viewMenu}
          handleItemClick={handleItemClick}
          adName={pageName}
          sideBarColor={sideBarColorChanger}
        />
      )}
      handleCards={() => (
        <HandleCards
          currentPath={currentPath}
          selectedItem={selectedItem}
          currentCardItem={currentCardItem}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          searchResult={filteredData}
          handleLink={handleLink}
          navbar={navbar}
          sideBarColor={sideBarColorChanger}
          currentItems={contentView}
        />
      )}
      sideBarColor={sideBarColorChanger}
      desc={desc}
      loading={loading}
      data={viewMenu}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      itemsMainPage={itemsMainPage}
      selectedItem={selectedItem}
      handlePageChange={handlePageChange}
      handleOnSearch={handleOnSearch}
      handleDropdownChange={handleDropdownChange}
      dropdownOptions={dropdownOptions}
      dropdownValue={dropdownValue}
      filterData={filteredData}
      totalPages={totalPages}
      currentItems={contentView}
      sideAds={sideAds}
      adName={pageName}
      handleLink={handleLink}
      currentRef={currentRef}
    ></ContentLayout>
  );
};

export default Selection;
