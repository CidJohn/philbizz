import React, { useState } from "react";
import "../../styles/Navbar.css";
import { Login } from "../../pages/Login/Login";
import Image from "../Image/Image";
import { useLocation } from "react-router-dom";
import SearchBar from "../Searchbar/Searchbar";
import { useTranslation } from "react-i18next";
import Translation from "../Translation/Translation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faBowlFood,
  faMicrophone,
  faFaceKiss,
  faMedkit,
  faTent,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ ...props }) {
  const { navbarData, loading, hidden } = props;
  const [showDropdown, setShowDropdown] = useState(true);
  const [showDropdown2, setShowDropdown2] = useState(null);
  const [getFontTitle, setFonttitle] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const handleClickDelete = () => {
    const path = location.pathname;
    const storedItem = localStorage.getItem("selectedItem");
    if (storedItem) {
      const itemToStore = JSON.parse(storedItem);

      delete itemToStore.id;
    } else {
      console.log("No item found in localStorage");
    }
    localStorage.setItem("selectedItem", JSON.stringify({ path }));
  };
  // const toggleDropdown = () => {
  //   setShowDropdown(!showDropdown);
  // };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = (name) => {
    setShowDropdown(name);
    setShowDropdown2(name);
  };

  const handleMouseLeave = () => {
    setShowDropdown2(null);
  };
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSearch = () => {};
  if (loading) {
    return <div>Loading...</div>;
  }
  const iconMap = {
    Business: faBuilding,
    Food: faBowlFood,
    "Ktv/Jtv": faMicrophone,
    Medical: faMedkit,
    Festival: faTent,
    Beauty: faFaceKiss,
  };
  const navbarItem = (navitem) => {
    return navitem.map((item, index) => (
      <div
        key={index}
        className=" rounded p-2 hover:bg-gray-400 relative mt-2"
        onMouseEnter={() => setShowDropdown(item.name)}
      >
        <a
          href={item.path}
          className="flex flex-col text-gray-600 hover:text-gray-900 items-center"
          onClick={handleClickDelete}
          target={item.name === "Business" ? "_black" : "_self"}
        >
          <span className="text-2xl mx-auto border border-gray-300 shadow px-4 py-2 rounded">
            {iconMap[item.name] && (
              <FontAwesomeIcon icon={iconMap[item.name]} />
            )}{" "}
          </span>
          {t(item.name)}
        </a>
        {item.children && showDropdown === item.name && (
          <div
            className="absolute  bg-white  rounded-lg shadow-lg z-50"
            onMouseLeave={() => setShowDropdown(false)}
          >
            {item.children.map((childItem, childIndex) => (
              <a
                key={childIndex}
                href={childItem.path}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                {t(childItem.name)}
              </a>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <nav className="bg-white mb-5">
      <div className="hidden md:block">
        {!hidden && (
          <div className="flex items-center justify-between  container mx-auto">
            <div className="">
              <Translation />
            </div>
            <a
              href="/"
              className="font-bold text-3xl text-gray-800 flex bg-cover w-auto mx-auto"
            >
              {/* <div className="font-bold text-3xl text-blue-800 ">P</div>
            <div className="font-bold text-xl text-blue-800 mt-2">
              HILIPPINE
            </div>
            <div className="font-bold text-3xl text-red-800 ">Z</div>
            <div className="font-bold text-xl text-gray-800 mt-2">ONE</div> */}
              <Image src={"philzone12.png"} />
            </a>
            <div className="flex p-2">
              <SearchBar
                onSearch={handleSearch}
                isModalOpen={isModalOpen}
                handleModalOpen={handleModalOpen}
              />
            </div>

            {isModalOpen && <Login handleModalOpen={handleModalOpen} />}
          </div>
        )}
      </div>

      <div className="bg-white max-w-auto  px-4 sm:px-6 lg:px-8 mt-1">
        <div className="flex items-center justify-between h-16 ">
          <div className="hidden md:block mx-auto">
            <div className="ml-10 flex items-baseline space-x-1 relative">
              {!navbarData ? "" : !hidden ? navbarItem(navbarData) : ""}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden justify-between">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <a href="/" className="font-bold text-3xl text-gray-800 flex ">
              <div className="font-bold text-gl text-blue-800 ">P</div>
              <div className="font-bold text-sm text-blue-800 mt-3">
                HILIPPINE
              </div>
              <div className="font-bold text-gl text-red-800 ">Z</div>
              <div className="font-bold text-sm text-gray-800 mt-3">ONE</div>
            </a>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="">
              <Translation IsOpenMenu={isMenuOpen} />
            </div>
            {navbarData.map((item, index) => (
              <div
                key={index}
                className="border rounded p-4 hover:bg-gray-400 relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.path}
                  className="text-gray-600 hover:text-gray-900"
                  onClick={handleClickDelete}
                >
                  {t(item.name)}
                </a>
                {item.children && showDropdown2 === item.name && (
                  <div className="absolute mt-2 bg-white border rounded-lg shadow-lg z-50">
                    {item.children.map((childItem, childIndex) => (
                      <a
                        key={childIndex}
                        href={childItem.path}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        {t(childItem.name)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
