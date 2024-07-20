import React, { useEffect, useState } from "react";
import List from "../../../components/List/List";
import Categories from "../../../components/Categories/Categories";
import Description from "../Description/Description";
import Dropdown from "../../../components/Dropdown/Dropdown";
import SearchBar from "../../../components/Searchbar/Searchbar";
import Card from "../../../components/Card/Card";
import useBusinessCategory from "../../../helper/database/usebusinessCategory";
import { useBusinessSettings } from "../../../helper/database/useBusinessData";
import Spinner from "../../../components/Spinner/Spinner";
import HandleCompanyCard from "../../../utils/HandleCompanyCard/handleCompanyCard";

const Business = () => {
  const [getLocation, setLocation] = useState("");
  const [getDataInfo, setDataInfo] = useState([]);
  const [getdropDown, setDropdown] = useState("");
  const [filterFound, setFilterFound] = useState([]);
  const { getCategory, loadCategory } = useBusinessCategory();
  const { getCardInfo, getCompanyLoad } = useBusinessSettings();
  const category = getCategory ? getCategory : "";

  useEffect(() => {
    if (getCardInfo) {
      setDataInfo(getCardInfo);
    }
  }, [getCardInfo]);

  useEffect(() => {
    let filteredData = getDataInfo;

    if (getLocation) {
      filteredData = filteredData.filter(
        (item) => item.parentName === getLocation
      );
    }

    if (getdropDown) {
      filteredData = filteredData.filter((item) =>
        item.description.toLowerCase().includes(getdropDown.toLowerCase())
      );
    } else {
      setLocation("");
      setDropdown("");
    }

    setFilterFound(filteredData);
  }, [getLocation, getdropDown, getDataInfo]);

  const handleLocation = (e) => {
    const selectedLocation = e.target.innerText;
    setLocation(selectedLocation);
  };

  const handleDropdownChange = (e) => {
    setDropdown(e.target.value);
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
  if (getCompanyLoad) {
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
            <div className="flex flex-col container mx-auto">
              <div className="flex">
                <Description type={"business"} path={"Business"} />
              </div>
              <div className="flex">
                <Categories
                  footerContent={category}
                  handleClick={handleLocation}
                />
              </div>
            </div>
            <div
              className="flex flex-col lg:flex-row items-center justify-center mt-5"
              id="company"
            >
              <div className="flex flex-col max-w-80">
                <div className="text-md">Address:</div>
                <Dropdown
                  name="category"
                  value={getdropDown}
                  onChange={handleDropdownChange}
                  options={dropdownOptions}
                  placeholder={"Select Address"}
                  width={"200px"}
                  selectWidth={"100px"}
                />
              </div>
              <div className="hidden lg:block text-sm py-5 h-[30px] border-gray-500 mx-3">
                <div className="flex font-black text-sm">or</div>
              </div>
              <div className="flex flex-col mt-5 lg:mt-0">
                <div className="text-md">Branch Name:</div>
                <SearchBar hidden={true} />
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex flex-wrap pt-10">
                <HandleCompanyCard
                  getDataInfo={getDataInfo}
                  getLocation={getLocation}
                  filterdata={filterFound}
                  getdropDown={getdropDown}
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
