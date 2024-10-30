import React, { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useSideMenuView,
  useTreeview,
} from "../../../helper/database/useTreeview";
import TreeView from "../../../components/Treeviews/Treeview";
import useCardSettings from "../../../helper/database/useCardSettings";
import Table from "../../../components/Table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Searchbar from "../../../components/Searchbar/Searchbar";
import Blogmenu from "./Blogmenu/Blogmenu";
import useBusinessCategory from "../../../helper/database/usebusinessCategory";
import Swal from "sweetalert2";

function Menus(props) {
  const { blogData, business } = props;
  const navigate = useNavigate();
  const { state } = useLocation();
  const { name, path } = state || { name: null, path: null };
  const { data } = useTreeview();
  const [getTreeview, setTreeview] = useState([]);
  const [selectedItem, setSelectectItem] = useState([]);
  const [childname, setTreeChild] = useState([]);
  const [card, setCard] = useState([]);
  const [getBusiness, setBusiness] = useState([]);
  const [treeviewFilter, setTreeviewFilter] = useState([]);
  const [getSearchValue, setSearchValue] = useState([]);
  const [getFilterCategory, setFilterCategory] = useState([]);
  const [getFilterCategoryData, setFilterCategoryData] = useState([]);
  const [getSearchValueBusiness, setSearchValueBusiness] = useState([]);
  const { businessTypes } = useCardSettings(
    name.toLowerCase() === "ktv/jtv" ? "ktv_jtv" : name.toLowerCase()
  );
  const { getCategory, loadCategory } = useBusinessCategory();
  const { viewMenu, menuLoading } = useSideMenuView(); //python side menu get display data

  useEffect(() => {
    if (data) {
      const filterTreeview = data
        ? data.filter((item) => item.path === path)
        : [];
      setTreeview(filterTreeview);

      filterTreeview.forEach((node) => {
        const foundChild = node.children.find(
          (item) => item.id === selectedItem
        );
        if (foundChild) {
          setTreeChild(foundChild.name);
        }
      });
    }
    if (businessTypes) {
      const getcard = businessTypes ? businessTypes : [];
      setCard(getcard);

      const treeviewFilter = businessTypes
        ? businessTypes.filter((node) => node.location === childname)
        : [];
      setTreeviewFilter(treeviewFilter);
    }
    if (business) {
      const getBusiness = business ? business : [];
      setBusiness(getBusiness);

      const categoryFilter = business
        ? business.filter((item) => item.parentName === getFilterCategory)
        : [];
      setFilterCategoryData(categoryFilter);
    }
  }, [
    data,
    path,
    businessTypes,
    name,
    selectedItem,
    childname,
    business,
    getFilterCategory,
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleTreeview = (id, path) => {
    setSelectectItem(id);
  };

  const handlOnUpdate = (item) => {
    if (name === "Business") {
      navigate(`/dashboard/Form/Create`, {
        state: {
          title: item.title,
          name: name,
          path: path,
          businessCategory: getCategory,
          cardlocation: getBusiness
            ? getBusiness.find((items) => items.title === item.title)
                ?.parentName
            : [],
        },
      });
    } else {
      navigate(`/dashboard/Form/Create`, {
        state: {
          title: item.title,
          name: name,
          path: path,
          treeviewdata: data,
          cardlocation: card
            ? card.find((items) => items.title === item.title)?.location
            : [],
        },
      });
    }
  };
  const handleOnDelete = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete: ${data.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Deleted: ${data}`);
        Swal.fire(
          "Deleted!",
          `Your data "${data.title}" has been deleted.`,
          "success"
        );
      } else {
        console.log("Deletion canceled");
      }
    });
  };

  const handleSearch = async (e) => {
    if (e.title === "") {
      setSearchValue([]);
      setFilterCategoryData([]);
      setTreeviewFilter([]);
      setSearchValueBusiness([]);
    } else {
      setTreeviewFilter([]);
      setFilterCategoryData([]);
      if (name === "Business") {
        const filteredResults = await getBusiness.filter((item) =>
          item.title.toLowerCase().includes(e.title.toLowerCase())
        );
        setSearchValueBusiness(filteredResults);
      } else {
        const filteredResults = await businessTypes.filter((item) =>
          item.title.toLowerCase().includes(e.title.toLowerCase())
        );
        setSearchValue(filteredResults);
      }
    }
  };

  const handleCategory = (e) => {
    setFilterCategory(e.target.innerText);
  };

  const handleCreateButton = (e) => {
    navigate(`/dashboard/Form/Create`, {
      state: {
        name: name,
        path: path,
        content: e.target.innerText,
        treeviewdata: data,
        businessCategory: getCategory,
        viewMenus: viewMenu,
      },
    });
  };

  const renderTable = (data) => {
    return (
      <Table
        tblheader={["Title", "Address"]}
        tbldata={data}
        tblrow={["title", "description"]}
        onUpdate={handlOnUpdate}
        onDelete={handleOnDelete}
      />
    );
  };
  return (
    <div>
      {name === "Blog" ? (
        <Blogmenu
          handleBack={handleBack}
          path={path}
          pageName={name}
          blog={blogData}
        />
      ) : (
        <div className="flex flex-col p-5 ">
          <div className="flex px-5 gap-1 justify-between">
            <div className="flex items-center">
              <Button
                onClick={handleBack}
                icon={<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />}
                className={
                  "px-2 text-lg text-gray-800 transform  transition-transform duration-500 hover:translate-x-3"
                }
              />
              <h1 className="text-2xl font-bold">Menu - {name} Page </h1>
            </div>
            <div className="flex ">
              <Searchbar hidden={true} onSearch={handleSearch} />
            </div>
          </div>
          <div className="flex flex-row p-5 gap-4   justify-center">
            <div className="flex flex-col">
              <div className="min-w-full  bg-gray-100 border-t-2 border-r-2 border-l-2 border-dashed rounded-t-lg  flex items-center p-2 text-lg font-bold">
                {name === "Business" ? `${name} Category` : `${name} Tree View`}
              </div>
              <div className="bg-white capitalize flex flex-col p-2 border-b-2 border-r-2 border-l-2  border-dashed rounded-b-lg px-10 h-[70vh] overflow-hidden hover:overflow-y-scroll ">
                {viewMenu
                  ? viewMenu.map(
                      (item) =>
                        item.path === path && (
                          <>
                            <TreeView
                              treeViewContent={[item]}
                              onItemClick={handleTreeview}
                            />
                          </>
                        )
                    )
                  : "Add New"}
              </div>
              <div className="flex py-2">
                <Button
                  text={
                    name === "Business" ? "Add Category" : "Edit Tree Content"
                  }
                  icon={<FontAwesomeIcon icon={faAdd} className="" />}
                  onClick={handleCreateButton}
                  className={
                    "p-2 border-2 gap-2 flex items-center font-bold hover:border-gray-100 hover:bg-blue-700 hover:text-gray-100 rounded-lg"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col  ">
              <div className="min-w-full h-10 bg-gray-100 border-t-2 border-r-2 border-l-2 border-dashed rounded-t-lg  flex items-center p-2 text-lg font-bold">
                {name} Table of Content
              </div>
              <div className="flex  max-w-[60vw] h-[70vh] border-b-2 border-r-2 border-l-2  border-dashed rounded-b-lg">
                {name === "Business" ? (
                  getFilterCategoryData.length > 0 ? (
                    renderTable(getFilterCategoryData)
                  ) : getSearchValueBusiness.length > 0 ? (
                    renderTable(getSearchValueBusiness)
                  ) : getBusiness.length > 0 ? (
                    renderTable(getBusiness)
                  ) : (
                    <div className="text-2xl font-bold flex items-center mx-auto">
                      Please Select Place
                    </div>
                  )
                ) : treeviewFilter.length > 0 ? (
                  renderTable(treeviewFilter)
                ) : getSearchValue.length > 0 ? (
                  renderTable(getSearchValue)
                ) : card.length > 0 ? (
                  renderTable(card)
                ) : (
                  <div className="text-2xl font-bold flex items-center mx-auto">
                    Please Select Place
                  </div>
                )}
              </div>
              <div className="flex py-2">
                <Button
                  text={"Add Content "}
                  icon={<FontAwesomeIcon icon={faAdd} className="" />}
                  className={
                    "p-2 border-2 gap-2 flex items-center font-bold hover:border-gray-100 hover:bg-blue-700 hover:text-gray-100 rounded-lg"
                  }
                  onClick={handleCreateButton}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menus;
