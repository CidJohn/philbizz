import React, { useEffect, useState } from "react";
import Searchinput from "../svg/SearchInputs";
import SearchIcons from "../svg/SearchIcons";
import { useTranslation } from "react-i18next";
import Textline from "../Textline/Textline";
import { useProtect } from "../../helper/auth/useAuthentication";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";
import { useAuth } from "../../helper/auth/useAuthContext";

const SearchBar = ({ onSearch, handleModalOpen, hidden }) => {
  const { t } = useTranslation();
  const { data, error, loadprotect } = useProtect();
  const [searchParams, setSearchParams] = useState({
    title: "",
  });
  const { isAuthenticated, logout, authload } = useAuth();

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
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Searchinput />
      </div>
      <Textline
        type="text"
        id={`simple-search-${name}`}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        value={searchParams[name]}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex items-center max-w-sm gap-3">
      <label htmlFor="simple-search-title" className="sr-only">
        {t("search")}
      </label>
      {renderTextline("title", t("Search Name"))}{" "}
      <button
        type="submit"
        className="flex items-center justify-center border rounded px-4 py-2 bg-gray-600 hover:bg-gray-100 text-gray-100 hover:text-gray-900"
      >
        <SearchIcons />
        <span className="sr-only">{t("search")}</span>
      </button>
      {authload ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Button
          type="button"
          className={
            hidden
              ? "hidden"
              : "flex items-center text-xs justify-center border rounded px-4 py-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
          }
          onClick={logout}
          text={"logout"}
        />
      ) : (
        <Button
          type="button"
          className={
            hidden
              ? "hidden"
              : "flex items-center text-xs justify-center border rounded px-4 py-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
          }
          onClick={handleModalOpen}
          text={t("login")}
        />
      )}
    </form>
  );
};

export default SearchBar;
