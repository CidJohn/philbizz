import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import sampleItem from "../../../content/sampleItem";
import Button from "../../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useTreeview } from "../../../helper/database/useTreeview";
import TreeView from "../../../components/Treeviews/Treeview";
import HandleCards from "../../../utils/HandleCards/handleCards";
import useCardSettings from "../../../helper/database/useCardSettings";
import Table from "../../../components/Table/Table";
function Menus() {
  const { state } = useLocation();
  const { name, path } = state || { name: null, path: null };
  const { data } = useTreeview();
  const [getTreeview, setTreeview] = useState([]);
  const [selectedItem, setSelectectItem] = useState([]);
  const [childname, setTreeChild] = useState([]);
  const [card, setCard] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsMainPage, setItemsMainPage] = useState(15);
  const navigate = useNavigate();
  const { businessTypes } = useCardSettings(
    name.toLowerCase() === "ktv/jtv" ? "ktv_jtv" : name.toLowerCase()
  );

  useEffect(() => {
    if (data) {
      const filterTreeview = data
        ? data.filter((item) => item.path === path)
        : [];
      setTreeview(filterTreeview);

      const selectedItems = filterTreeview
        ? filterTreeview.map((node) =>
            node.children.filter((item) =>
              item.id === selectedItem ? setTreeChild(item.name) : []
            )
          )
        : [];
    }

    const getcard = businessTypes
      ? businessTypes.filter((node) => node.location === childname)
      : [];
    setCard(getcard);
  }, [data, path, businessTypes, name, selectedItem, childname]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleTreeview = (id, path) => {
    setSelectectItem(id);
  };

  const handlOnView = (data) => {
    console.log(data);
  };
  const handleOnDelete = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex flex-col p-5 ">
        <div className="flex p-2 gap-1">
          <Button
            onClick={handleBack}
            text={"<<"}
            className={
              "px-2 text-lg text-gray-800 hover:bg-blue-500 hover:text-gray-100 rounded-full border "
            }
          />
          <h1 className="text-2xl font-bold">Menus {name}</h1>
        </div>
        <div className="flex flex-row p-5 gap-4 min-w-80  justify-center">
          <div className="flex flex-col">
            <div className="flex p-2 border-2 border-dashed rounded-lg px-10 h-[70vh] overflow-hidden hover:overflow-y-scroll ">
              {getTreeview.length ? (
                <TreeView
                  treeViewContent={getTreeview}
                  onItemClick={handleTreeview}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex border-2 min-w-80 h-[70vh] border-dashed rounded-lg  ">
            {card.length ? (
              <Table
                tblheader={["Title", "Address"]}
                tbldata={card}
                tblrow={["title", "description"]}
                onView={handlOnView}
                onDelete={handleOnDelete}
              />
            ) : (
              <div className="text-2xl font-bold flex items-center mx-auto">
                Please Select Place
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menus;
