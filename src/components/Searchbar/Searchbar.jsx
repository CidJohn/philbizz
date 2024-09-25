import React, { useState } from "react";
import Searchinput from "../svg/SearchInputs";
import { useTranslation } from "react-i18next";
import Textline from "../Textline/Textline";
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  const renderTextline = (name, placeholder) => (
    <div className="relative w-full ">
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-2 pointer-events-none text-[#013A63] text-xl">
        <IoSearchSharp />
      </div>
      <Textline
        type="text"
        id={`simple-search-${name}`}
        name={name}
        className="bg-[#013A63]/5 border border-[#013A63]/20 text-[#013A63] py-3 font-bold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        value={searchParams[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 ">
      <label htmlFor="simple-search-title" className="sr-only">
        {t("search")}
      </label>
      {renderTextline("title", t("Search Name"))}{" "}
    </form>
  );
};

export default SearchBar;
