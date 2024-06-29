import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import TreeView from "../../components/Treeviews/Treeview";
import selectionContent from "../../content/selectionContent";
import sampleItem from "../../content/sampleItem";
import Image from "../../components/Image/Image";
import { FoodTreeView } from "../../content/FoodTreeView";
import navbarContent from "../../content/navbarContent";
import { useLocation } from "react-router-dom";
import treeViewContent from "../../content/treeViewContent";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import ContentLayout from "../../utils/Selection/ContentLayout";
import { useTreeview } from "../../helper/database/useTreeview";

const Selection = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsMainPage, setItemsMainPage] = useState(2);
  const { data, loading } = useTreeview();

  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem("selectedItem"));
    if (savedItem) {
      const selectedItemObj =
        currentPath.path === "/food"
          ? findItemById(FoodTreeView, savedItem.id)
          : findItemById(treeViewContent, savedItem.id);
      setSelectedItem(selectedItemObj);
    }

    const selectedItemPath = findingPath(navbarContent, location.pathname);
    setCurrentPath(selectedItemPath || "");
  }, [currentPath]);

  const findItemById = (items, id) => {
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
    for (const item of items) {
      if (item.path === path) return item;
      if (item.children) {
        const found = findItemById(item.children, path);
        if (found) return found;
      }
    }
    return null;
  };
  const handleItemClick = (id, path) => {
    path = currentPath.path;
    const selectedItemObj =
      currentPath.name === "Food"
        ? findItemById(FoodTreeView, id)
        : findItemById(treeViewContent, id);
    localStorage.setItem("selectedItem", JSON.stringify({ id, path }));
    setSelectedItem(selectedItemObj);
  };
  //#region TreeView
  const renderTreeView = () => {
    if (currentPath.path === "/food") {
      return (
        <>
          <TreeView
            treeViewContent={FoodTreeView}
            onItemClick={handleItemClick}
          />
        </>
      );
    }
    if (currentPath.path === "/ktv_jtv") {
      return (
        <div className="">
          {!data ? (
            <Spinner />
          ) : (
            <TreeView treeViewContent={data} onItemClick={handleItemClick} />
          )}
        </div>
      );
    }
  };
  //#endregion
  //#region CardSettings
  const handleCards = () => {
    if (currentPath.name === "Food") {
      if (!selectedItem.id) {
        return currentItems.map((select, index) => (
          <React.Fragment key={index}>
            {select.path === "Food" &&
              select.cardSetting.map((setting, settingIndex) => (
                <div className="flex flex-wrap mt-5 " key={settingIndex}>
                  {setting.settings.map((card, cardIndex) => (
                    <div className="bg-cover" key={cardIndex}>
                      <Card
                        src={card.images}
                        title={card.title}
                        desc={card.desc}
                        style={{ width: "200px", backgroundSize: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              ))}
          </React.Fragment>
        ));
      } else {
        return (
          selectedItem &&
          selectionContent.map(
            (select, index) =>
              select.path === selectedItem.parent && (
                <React.Fragment key={index}>
                  {select.cardSetting.map(
                    (setting, settingIndex) =>
                      setting.ids === selectedItem.id &&
                      setting.location === selectedItem.name && (
                        <div className="flex flex-wrap mt-5" key={settingIndex}>
                          {setting.settings
                            .slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((card, cardIndex) => (
                              <div className="bg-cover" key={cardIndex}>
                                <Card
                                  src={card.images}
                                  title={card.title}
                                  desc={card.desc}
                                  style={{
                                    width: "200px",
                                    backgroundSize: "cover",
                                  }}
                                  hidden={true}
                                />
                              </div>
                            ))}
                        </div>
                      )
                  )}
                </React.Fragment>
              )
          )
        );
      }
    }
    if (currentPath.name === "Ktv/Jtv") {
      if (!selectedItem.id) {
        return currentItems.map((select, index) => (
          <React.Fragment key={index}>
            {select.path === "Ktv/Jtv" &&
              select.cardSetting.map((setting, settingIndex) => (
                <div className="flex flex-wrap mt-5 " key={settingIndex}>
                  {setting.settings.map((card, cardIndex) => (
                    <div className="bg-cover" key={cardIndex}>
                      <Card
                        src={card.images}
                        title={card.title}
                        desc={card.desc}
                        style={{ width: "200px", backgroundSize: "cover" }}
                        hidden={true}
                      />
                    </div>
                  ))}
                </div>
              ))}
          </React.Fragment>
        ));
      } else {
        return (
          selectedItem &&
          selectionContent.map(
            (select, index) =>
              select.path === selectedItem.parent && (
                <React.Fragment key={index}>
                  {select.cardSetting.map(
                    (setting, settingIndex) =>
                      setting.ids === selectedItem.id &&
                      setting.location === selectedItem.name && (
                        <div className="flex flex-wrap mt-5" key={settingIndex}>
                          {setting.settings
                            .slice(
                              (currentPage - 1) * itemsPerPage,
                              currentPage * itemsPerPage
                            )
                            .map((card, cardIndex) => (
                              <div className="bg-cover" key={cardIndex}>
                                <Card
                                  src={card.images}
                                  title={card.title}
                                  desc={card.desc}
                                  style={{
                                    width: "200px",
                                    backgroundSize: "cover",
                                  }}
                                  hidden={true}
                                />
                              </div>
                            ))}
                        </div>
                      )
                  )}
                </React.Fragment>
              )
          )
        );
      }
    }

    return null;
  };
  //#endregion
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
  //Seperate the file
  return (
    <ContentLayout
      renderTreeView={renderTreeView}
      handleCards={handleCards}
      loading={loading}
      data={data}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      itemsMainPage={itemsMainPage}
      selectedItem={selectedItem}
      selectionContent={selectionContent}
      handlePageChange={handlePageChange}
    />
  );
};

export default Selection;
