import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
// import ContentLayout from "../../utils/Selection/ContentLayout";
// import RenderTreeView from "../../utils/RenderTreeView/renderTreeView";
// import HandleCards from "../../utils/HandleCards/handleCards";
import { useSideMenuView, useTreeview } from "../../helper/database/useTreeview";
import ContentLayout from "../Selection_handler/Selection/ContentLayout";
import RenderTreeView from "../Selection_handler/RenderTreeView/renderTreeView"
import HandleCards from "../Selection_handler/HandleCards/handleCards"
import useCardSettings from "../../helper/database/useCardSettings"; 
import { useCardDesc } from "../../helper/database/useCardPath";

const Selection = ({ navbar }) => {
  const currentRef = useRef()
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsMainPage, setItemsMainPage] = useState(15);
  const [dropdownValue, setDropdownValue] = useState("");
  const [desc, setDesc] = useState([]);
  const { data } = useTreeview();
  const {viewMenu, loading} = useSideMenuView();
  const { businessTypes } = useCardSettings(
    pageName.toLowerCase() === "ktv/jtv" ? "ktv_jtv" : pageName.toLowerCase()
  );
  const [filteredData, setFilteredData] = useState(businessTypes);
  const { businesses } = useCardDesc(
    pageName.toLowerCase() === "ktv/jtv" ? "ktv_jtv" : pageName.toLowerCase()
  );
 
  useEffect(() => {
    if (viewMenu) {
      const selectedItemObj = viewMenu ? findItemById(viewMenu, path) : null;
      setSelectedItem(selectedItemObj);
    }
    const selectedItemPath = navbar ? findingPath(navbar, path) : "";
    setCurrentPath(selectedItemPath || "");

    if (!dropdownValue) {
      setFilteredData("");
    } else {
      const filteredResults = businessTypes.filter((item) =>
        item.description.toLowerCase().includes(dropdownValue.toLowerCase())
      );
      setFilteredData(filteredResults);
    }

    if (id) {
      const selectedItemObj = viewMenu ? findItemById(viewMenu, id) : null;
      setSelectedItem(selectedItemObj);
      setFilteredData("");
    }
  }, [path, viewMenu, navbar, currentPath, businessTypes, dropdownValue]);

  useEffect(() => {
    const desc = businesses ? businesses : [];
    setDesc(desc);
    
  }, [businesses]);

  useEffect(() => {
    if(selectedItem){
      if (currentRef.current) {
        currentRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ behavior: "smooth" });
      }
    }
  },[selectedItem])

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

    const selectedItemObj = viewMenu ? findItemById(viewMenu, clickedId || id) : null;
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
    navigate(`${path}#cards`, {
      state: {
        id: id,
        pageName: pageName,
        path: path,
        sideBarColorChanger: sideBarColorChanger,
      },
    });
    setCurrentPage(pageNumber);
  };

  const handleOnSearch = async (e) => {
    if (e.title === "") {
      setFilteredData("");
    } else {
      const filteredResults = await businessTypes.filter((item) =>
        item.title.toLowerCase().includes(e.title)
      );
      setFilteredData(filteredResults);
    }
  };

  const indexOfLastItem =
    currentPage * (selectedItem?.id ? itemsPerPage : itemsMainPage);
  const indexOfFirstItem =
    indexOfLastItem - (selectedItem?.id ? itemsPerPage : itemsMainPage);
  const currentItems = businessTypes.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  const dropdownOptions = [
    { value: "", label: "Select All" },
    ...businessTypes.map((item) => ({
      value: item.description,
      label: item.description,
    })),
  ];

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const handleLink = (data) => {
    navigate(`/card-page/${data}`, { state: { title: data } });
  };

  const totalPages = Math.ceil(
    selectedItem?.id
      ? businessTypes.length / itemsPerPage
      : businessTypes.length / itemsMainPage
  );
  const currentItemsPage = businessTypes.slice(
    (currentPage - 1) * (selectedItem?.id ? itemsPerPage : itemsMainPage),
    currentPage * (selectedItem?.id ? itemsPerPage : itemsMainPage)
  );
  const sideAds = Array.isArray(currentItems) ? currentItems.slice(0, 3) : [];
  const currentCardItem = Array.isArray(currentItems)
    ? currentItems.slice(4)
    : [];
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
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
          currentItems={currentCardItem}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          searchResult={filteredData}
          handleLink={handleLink}
          navbar={navbar}
          sideBarColor={sideBarColorChanger}
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
      currentItems={currentItemsPage}
      sideAds={sideAds}
      adName={pageName}
      handleLink={handleLink}
      currentRef={currentRef}
    ></ContentLayout>
  );
};

export default Selection;
