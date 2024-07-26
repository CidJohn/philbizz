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
  const locations = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsMainPage, setItemsMainPage] = useState(15);
  const [business, setBusiness] = useState("");
  const [selectpath, setSelectPath] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const { data, loading } = useTreeview();
  const { navbarData } = useNavbarcontent();

  const { businessTypes } = useCardSettings(currentPath.businessPath);
  const [filteredData, setFilteredData] = useState(businessTypes);

  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem("selectedItem"));
    if (savedItem) {
      const selectedItemObj = data ? findItemById(data, savedItem.id) : null;
      setSelectedItem(selectedItemObj);
    }

    const selectedItemPath = navbarData
      ? findingPath(navbarData, locations.pathname)
      : "";
    setCurrentPath(selectedItemPath || "");

    if (navbarData) {
      const matchedItem = navbarData.find(
        (item) => item.path === currentPath.path
      );
      if (matchedItem) {
        setBusiness(matchedItem);
      }
    }
    if (!dropdownValue) {
      setFilteredData("");
    } else {
      const filteredResults = businessTypes.filter((item) =>
        item.description.toLowerCase().includes(dropdownValue.toLowerCase())
      );
      setFilteredData(filteredResults);
    }
  }, [
    currentPath,
    data,
    navbarData,
    locations.pathname,
    businessTypes,
    dropdownValue,
  ]);

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
    setFilteredData("");
  };

  const handlePageChange = (pageNumber) => {
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
  const businessDesc = business ? business : "";
  const totalPages = Math.ceil(
    selectedItem?.id
      ? businessTypes.length / itemsPerPage
      : businessTypes.length / itemsMainPage
  );
  const currentItemsPage = businessTypes.slice(
    (currentPage - 1) * (selectedItem?.id ? itemsPerPage : itemsMainPage),
    currentPage * (selectedItem?.id ? itemsPerPage : itemsMainPage)
  );
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
          searchResult={filteredData}
        />
      )}
      loading={loading}
      data={data}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      itemsMainPage={itemsMainPage}
      selectedItem={selectedItem}
      handlePageChange={handlePageChange}
      handleOnSearch={handleOnSearch}
      handleDescription={() => <Description />}
      handleDropdownChange={handleDropdownChange}
      dropdownOptions={dropdownOptions}
      dropdownValue={dropdownValue}
      filterData={filteredData}
      business={businessDesc}
      totalPages={totalPages}
      currentItems={currentItemsPage}
    ></ContentLayout>
  );
};

export default Selection;
