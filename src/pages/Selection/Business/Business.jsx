import React, { useEffect, useRef, useState } from "react";
import Categories from "../../../components/Categories/Categories";
import Dropdown from "../../../components/Dropdown/Dropdown";
import SearchBar from "../../../components/Searchbar/Searchbar";
import useBusinessCategory from "../../../helper/database/usebusinessCategory";
import { useCompanyFilter } from "../../../helper/database/useBusinessData";
import Spinner from "../../../components/Spinner/Spinner";
// import HandleCompanyCard from "../../../utils/HandleCompanyCard/handleCompanyCard";
import HandleCompanyCard from "../../Selection_handler/HandleCompanyCard/handleCompanyCard";
import { useTranslation } from "react-i18next";
import Description from "../Description/Description";
import { useLocation } from "react-router-dom";
import { useCardDesc } from "../../../helper/database/useCardPath";
import { useSideMenuView } from "../../../helper/database/useTreeview";

const Business = (props) => {
  const { businessSettings } = props;
  const { state } = useLocation();
  const location = useLocation();
  const { path, pageName, sideBarColorChanger } = state || {
    path: null,
    pageName: null,
    sideBarColorChanger: null,
  };
  const cardSectionRef = useRef(null);
  const [getLocation, setLocation] = useState("");
  const [getDataInfo, setDataInfo] = useState([]);
  const [filterFound, setFilterFound] = useState();
  const [getCategoryMenu, setCategoryMenu] = useState([]);
  const [getdropDown, setDropdown] = useState("");
  const { getCategory, loadCategory } = useBusinessCategory();
  const { t } = useTranslation();
  const { CompanyFilter } = useCompanyFilter({
    name: getLocation,
    title: filterFound,
    description: getdropDown,
  });
  const { businesses } = useCardDesc(
    pageName.toLowerCase() === "ktv/jtv" ? "ktv_jtv" : pageName.toLowerCase()
  );
  const { viewMenu, menuLoading } = useSideMenuView();

  const category = getCategory ? getCategory : "";
  const desc = businesses ? businesses : "";

  useEffect(() => {
    if (businessSettings) {
      const filterCompanyCard = businessSettings
        ? businessSettings.filter((item) => item.business.header === "Company")
        : [];
      setDataInfo(filterCompanyCard);
    }
    const filterCategory = viewMenu
      ? viewMenu.filter((item) => item.path === location.pathname)
      : [];
    setCategoryMenu(filterCategory);
  }, [businessSettings, viewMenu]);

  const handleLocation = (e) => {
    const selectedLocation = e.target.innerText;
    setDropdown("");
    setFilterFound("");
    setLocation(selectedLocation);
    if (cardSectionRef.current) {
      cardSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDropdownChange = (e) => {
    setLocation("");
    setFilterFound("");
    setDropdown(e.target.value);
  };
  const handleSearch = async (e) => {
    setLocation("");
    setDropdown("");
    setFilterFound(e.title);
  };

  const uniqueDescriptions = [
    ...new Set(getDataInfo.map((item) => item.description)),
  ];

  const dropdownOptions = [
    { value: "", label: "Select All" },
    ...uniqueDescriptions.map((description) => ({
      value: description,
      label: description,
    })),
  ];

  const imagecarousel = getDataInfo ? getDataInfo.slice(1) : [];

  if (menuLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Spinner />
      </div>
    );
  }
  
  return (
    <div className="p-2">
      <div className=" md:w-[73vw]  mx-auto flex items-center">
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col">
            <div className="flex flex-col container ">
              <div className="flex flex-col gap-2 p-2">
                <Description
                  content={getDataInfo}
                  pageName={"Company"}
                  carousel={imagecarousel}
                  txtHeaderColor={
                    sideBarColorChanger.textColor
                      ? sideBarColorChanger.textColor
                      : ""
                  }
                />
              </div>
              <div className="flex block">
                <Categories
                  footerContent={getCategoryMenu}
                  handleClick={handleLocation}
                  colorChanger={
                    sideBarColorChanger.textColor
                      ? sideBarColorChanger.textColor
                      : ""
                  }
                />
              </div>
            </div>
            <div
              className="flex flex-col lg:flex-row items-center justify-center mt-5"
              id="card"
              ref={cardSectionRef}
            >
              <div className="flex flex-col max-w-80">
                <div className="text-md">Address:</div>
                <Dropdown
                  name="category"
                  value={getdropDown}
                  onChange={handleDropdownChange}
                  options={dropdownOptions}
                  placeholder={"Select Address"}
                  adsBorder={sideBarColorChanger.textColor}
                  textColor={sideBarColorChanger.textColor}
                />
              </div>
              <div className="hidden lg:block text-sm py-5 h-[30px] border-gray-500 mx-3">
                <div className="flex font-black text-sm">or</div>
              </div>
              <div className="flex flex-col mt-5 lg:mt-0">
                <div className="text-md">Branch Name:</div>
                <SearchBar
                  hidden={true}
                  onSearch={handleSearch}
                  adsBorder={sideBarColorChanger.textColor}
                  textColor={sideBarColorChanger.textColor}
                  placeholderColor={sideBarColorChanger.placeholderColor}
                />
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <div className="  items-center w-full ">
                <HandleCompanyCard
                  content={getDataInfo}
                  sideBarColor={sideBarColorChanger}
                  navigates={{ path, pageName, sideBarColorChanger }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
