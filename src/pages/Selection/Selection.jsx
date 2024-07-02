import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import ContentLayout from "../../utils/Selection/ContentLayout";
import { useTreeview } from "../../helper/database/useTreeview";
import { useNavbarcontent } from "../../helper/database/useNavbarcontent";
import RenderTreeView from "../../utils/RenderTreeView/renderTreeView";
import HandleCards from "../../utils/HandleCards/handleCards";
import selectionContent from "../../content/selectionContent";
import Description from "./Description/Description";

const Selection = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsMainPage, setItemsMainPage] = useState(2);
  const [business, setBusiness] = useState("");

  const { data, loading } = useTreeview();
  const { navbarData } = useNavbarcontent();

  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem("selectedItem"));
    if (savedItem) {
      const selectedItemObj = data ? findItemById(data, savedItem.id) : "";
      setSelectedItem(selectedItemObj);
    }

    const selectedItemPath = !navbarData
      ? ""
      : findingPath(navbarData, location.pathname);
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
    if (!items) return null; // Handle case where items is null or undefined
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
    if (!items) return null; // Handle case where items is null or undefined
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
    const selectedItemObj = data ? findItemById(data, id) : "";
    localStorage.setItem("selectedItem", JSON.stringify({ id, path }));
    setSelectedItem(selectedItemObj);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOnSearch = (query) => {
    console.log("Searching for:", query);
    // Implement search logic here
    // Example: Filter navbar data based on query
    const filteredData = navbarData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Filtered Data:", filteredData);
    // Update the state with the filtered data if needed
  };

  const filteredItems = selectionContent.filter(
    (select) => select.path === currentPath.name
  );

  const indexOfLastItem = currentPage * itemsMainPage;
  const indexOfFirstItem = indexOfLastItem - itemsMainPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

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
        />
      )}
      loading={loading}
      data={data}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      itemsMainPage={itemsMainPage}
      selectedItem={selectedItem}
      selectionContent={selectionContent}
      handlePageChange={handlePageChange}
      handleOnSearch={handleOnSearch}
      handleDescription={() => <Description />}
      businessType={business}
    />
  );
};

export default Selection;
