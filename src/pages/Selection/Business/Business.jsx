import React, { useEffect, useState } from "react";
import Categories from "../../../components/Categories/Categories";
import Description from "../Description/Description";
import Dropdown from "../../../components/Dropdown/Dropdown";
import SearchBar from "../../../components/Searchbar/Searchbar";
import useBusinessCategory from "../../../helper/database/usebusinessCategory";
import {
  useBusinessSettings,
  useCompanyFilter,
} from "../../../helper/database/useBusinessData";
import Spinner from "../../../components/Spinner/Spinner";
import HandleCompanyCard from "../../../utils/HandleCompanyCard/handleCompanyCard";
import { useTranslation } from "react-i18next";

const Business = ({ businessSettings }) => {
  const [getLocation, setLocation] = useState("");
  const [getDataInfo, setDataInfo] = useState([]);
  const [filterFound, setFilterFound] = useState();
  const [getdropDown, setDropdown] = useState("");
  const { getCategory, loadCategory } = useBusinessCategory();
  const { t } = useTranslation();
  const { CompanyFilter } = useCompanyFilter({
    name: getLocation,
    title: filterFound,
    description: getdropDown,
  });

  const category = getCategory ? getCategory : "";

  useEffect(() => {
    if (businessSettings.businessSettings) {
      setDataInfo(businessSettings.businessSettings);
    }
  }, [businessSettings.businessSettings]);

  const handleLocation = (e) => {
    const selectedLocation = e.target.innerText;
    setDropdown("");
    setFilterFound("");
    setLocation(selectedLocation);
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

  if (businessSettings.getCompanyLoad) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="">
      <div className="flex flex-wrap mx-auto max-w-screen-lg">
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col">
            <div className="flex flex-col container ">
              <div className="flex">
                <div className="px-2 flex mt-5">
                  <div className="flex flex-col ">
                    <h1 className="text-4xl md:text-6xl mb-4 font-serif">
                      {t("Business")}
                    </h1>
                    <p className="text-left mb-4 ">
                      We present a range of local Philippine businesses
                      categorized by industry! We also include interviews with
                      business professionals operating in the Philippines, as
                      well as serialized pieces written by specialists in law,
                      accounting, market research, and other areas. For anyone
                      who work in the Philippines or are thinking about doing
                      business there, we offer helpful business information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex block">
                <Categories
                  footerContent={category}
                  handleClick={handleLocation}
                />
              </div>
            </div>
            <div
              className="flex flex-col lg:flex-row items-center justify-center mt-5"
              id="card"
            >
              <div className="flex flex-col max-w-80">
                <div className="text-md">Address:</div>
                <Dropdown
                  name="category"
                  value={getdropDown}
                  onChange={handleDropdownChange}
                  options={dropdownOptions}
                  placeholder={"Select Address"}
                />
              </div>
              <div className="hidden lg:block text-sm py-5 h-[30px] border-gray-500 mx-3">
                <div className="flex font-black text-sm">or</div>
              </div>
              <div className="flex flex-col mt-5 lg:mt-0">
                <div className="text-md">Branch Name:</div>
                <SearchBar hidden={true} onSearch={handleSearch} />
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex flex-wrap pt-10">
                <HandleCompanyCard category={CompanyFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
