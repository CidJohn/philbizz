import React, { useState } from "react";
import Searchinput from "../svg/SearchInputs";
import SearchIcons from "../svg/SearchIcons";

const SearchBar = ({ onSearch, handleModalOpen, isModalOpen, hidden }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center max-w-sm space-x-3"
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Searchinput />
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search branch name..."
            required
            value={searchInput}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center border rounded px-4 py-2 bg-gray-600 hover:bg-gray-100 text-gray-100 hover:text-gray-900"
        >
          <SearchIcons />
          <span className="sr-only">Search</span>
        </button>
        {!hidden && (
          <button
            type="button"
            className="flex items-center justify-center border rounded px-4 py-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
            onClick={handleModalOpen}
          >
            Login
          </button>
        )}
      </form>
    </>
  );
};

export default SearchBar;
