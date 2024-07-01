import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import TreeView from "../../components/Treeviews/Treeview";
import selectionContent from "../../content/selectionContent";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import ContentLayout from "../../utils/Selection/ContentLayout";
import { useTreeview } from "../../helper/database/useTreeview";
import { useNavbarcontent } from "../../helper/database/useNavbarcontent";

const Selection = () => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPath, setCurrentPath] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsMainPage, setItemsMainPage] = useState(2);
  const { data, loading } = useTreeview();
  const { navbarData } = useNavbarcontent();

  useEffect(() => {
    const savedItem = JSON.parse(localStorage.getItem("selectedItem"));
    if (savedItem) {
      let selectedItemObj = "";

      selectedItemObj = data ? findItemById(data, savedItem.id) : "";
      setSelectedItem(selectedItemObj);
    }

    const selectedItemPath = !navbarData
      ? ""
      : findingPath(navbarData, location.pathname);
    setCurrentPath(selectedItemPath || "");
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
    localStorage.setItem("selectedItem", JSON.stringify({ id }));
    setSelectedItem(selectedItemObj);
  };
  //#region TreeView
  const renderTreeView = () => {
    if (currentPath.path === "/food") {
      const filteredData = data.filter(
        (node) => node.path === currentPath.path
      );
      return (
        <div className="">
          {!data ? (
            <Spinner />
          ) : (
            <TreeView
              treeViewContent={filteredData}
              onItemClick={handleItemClick}
            />
          )}
        </div>
      );
    } else if (currentPath.path === "/ktv_jtv") {
      const filteredData = data.filter(
        (node) => node.path === currentPath.path
      );
      return (
        <div className="">
          {!data ? (
            <Spinner />
          ) : (
            <TreeView
              treeViewContent={filteredData}
              onItemClick={handleItemClick}
            />
          )}
        </div>
      );
    } else if (currentPath.path === "/business") {
      const filteredData = data.filter(
        (node) => node.path === currentPath.path
      );
      return (
        <div className="">
          {!data ? (
            <Spinner />
          ) : (
            <TreeView
              treeViewContent={filteredData}
              onItemClick={handleItemClick}
            />
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
              (select.path = selectedItem.path && (
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
              ))
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
              (select.path = selectedItem.path && (
                <React.Fragment key={index}>
                  {select.cardSetting.map(
                    (setting, settingIndex) =>
                      (setting.location = selectedItem.name &&
                        setting.ids === selectedItem.id && (
                          <div
                            className="flex flex-wrap mt-5"
                            key={settingIndex}
                          >
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
                        ))
                  )}
                </React.Fragment>
              ))
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
