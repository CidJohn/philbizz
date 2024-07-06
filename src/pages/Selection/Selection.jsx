import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import ContentLayout from "../../utils/Selection/ContentLayout";
import { useTreeview } from "../../helper/database/useTreeview";
import { useNavbarcontent } from "../../helper/database/useNavbarcontent";
import RenderTreeView from "../../utils/RenderTreeView/renderTreeView";
import HandleCards from "../../utils/HandleCards/handleCards";
import useCardSettings from "../../helper/database/useCardSettings"; // Import the custom hook
import Description from "./Description/Description";

const Selection = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsMainPage, setItemsMainPage] = useState(15);
  const [business, setBusiness] = useState("");
  const [selectpath, setSelectPath] = useState("");
  const { data, loading } = useTreeview();
  const { navbarData } = useNavbarcontent();

  const { businessTypes } = useCardSettings(currentPath.businessPath);

  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem("selectedItem"));
    if (savedItem) {
      const selectedItemObj = data ? findItemById(data, savedItem.id) : null;
      setSelectedItem(selectedItemObj);
    }

    const selectedItemPath = navbarData
      ? findingPath(navbarData, location.pathname)
      : "";
    setCurrentPath(selectedItemPath || "");

    if (navbarData) {
      const matchedItem = navbarData.find(
        (item) => item.path === currentPath.path
      );
      if (matchedItem) {
        setBusiness(matchedItem.name);
      }
    }
  }, [currentPath, data, navbarData, location.pathname]);

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

  const handleItemClick = (id, path) => {
    path = currentPath.path;
    const selectedItemObj = data ? findItemById(data, id) : null;
    setSelectedItem(selectedItemObj);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOnSearch = (query) => {
    console.log("Searching for:", query);
    const filteredData = navbarData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered Data:", filteredData);
  };

  const indexOfLastItem =
    currentPage * (selectedItem?.id ? itemsPerPage : itemsMainPage);
  const indexOfFirstItem =
    indexOfLastItem - (selectedItem?.id ? itemsPerPage : itemsMainPage);
  const currentItems = businessTypes.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <Spinner />;
  }

  if (!data) {
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
          data={data}
          handleItemClick={handleItemClick}
        />
      )}
      handleCards={() => (
        <HandleCards
          currentPath={currentPath}
          selectedItem={selectedItem}
          currentItems={currentItems}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          selectPath={selectpath}
        />
      )}
      loading={loading}
      data={data}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      itemsMainPage={itemsMainPage}
      selectedItem={selectedItem}
      selectionContent={businessTypes}
      handlePageChange={handlePageChange}
      handleOnSearch={handleOnSearch}
      handleDescription={() => <Description />}
      businessType={business}
    />
  );
};

export default Selection;
