import React, { useState } from "react";
import "../../styles/Navbar.css";
import Image from "../Image/Image";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Images from "../Image/Images";
import Swal from "sweetalert2";
import changeColor from "../../content/content.json";

export default function Navbar(props) {
  const { navbarData, hidden } = props;
  const [showDropdown, setShowDropdown] = useState(true);
  const [showDropdown2, setShowDropdown2] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistration, setRegistration] = useState(false);
  const [isActive, setActive] = useState("");
  const navigation = useNavigate();
  const { t } = useTranslation();

  const handleClickDelete = (item) => {
    const dynamicColorChanger = changeColor.sideBarColor
      ? changeColor.sideBarColor.filter((node) => node.pageName === item.name)
      : [];
    navigation(item.path, {
      state: {
        path: item.path,
        pageName: item.name,
        sideBarColorChanger: dynamicColorChanger[0],
      },
    });
    setActive(item.name);
  };

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
  const handleRegistrationOpen = () => {
    setRegistration(!isRegistration);
    setIsModalOpen(false);
  };

  const handleKtvJtvClick = (item) => (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Age Restriction",
      text: "You must be 19 years or older to access this content. Are you 19 or older?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, I'm 19 or older",
      cancelButtonText: "No, I'm not",
    }).then((result) => {
      if (result.isConfirmed) {
        const dynamicColorChanger = changeColor.sideBarColor
          ? changeColor.sideBarColor.filter(
              (node) => node.pageName === item.name
            )
          : [];
        navigation(item.path, {
          state: {
            path: item.path,
            pageName: item.name,
            sideBarColorChanger: dynamicColorChanger[0],
          },
        });
        setActive(item.name);
      } else {
        Swal.fire(
          "Access Denied",
          "You must be 19 or older to view this content.",
          "error"
        );
      }
    });
  };

  const navbarItem = (navitem) => {
    return navitem.map((item, index) => (
      <div
        key={index}
        className="  p-2 relative mt-2 hover:text-gray-900  "
        onMouseEnter={() => setShowDropdown(item.name)}
      >
        <a
          className={`border-b-2 hover:border-gray-900 cursor-pointer flex flex-col text-gray-600 hover:text-gray-900 hover:font-bold items-center  transform transition-transform duration-500 hover:scale-90 ${
            isActive === item.name
              ? "border-gray-900 text-gray-900 font-bold"
              : "border-transparent"
          } `}
          onClick={
            item.restrict === 19
              ? handleKtvJtvClick(item)
              : () => handleClickDelete(item)
          }
          target={item.name === "Business" ? "_blank" : "_self"}
        >
          <span className="text-2xl hover:border-gray-900 px-4 py-2 rounded ">
            <Images src={item.iconPath} style={{ width: "50px" }} />
          </span>
          <span>{t(item.name)}</span>
        </a>
        {item.children && showDropdown === item.name && (
          <div
            className="absolute bg-white rounded-lg shadow-lg z-50"
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
    <nav className={!hidden ? "bg-white " : "hidden"}>
      <div className="bg-[#013A63]/5 w-full border-b px-4 sm:px-6 lg:px-8  mx-auto shadow-inner">
        <div className="flex items-center justify-between  ">
          <div className="hidden md:block mx-auto">
            <div className=" flex items-baseline space-x-1 relative gap-5 ">
              {!navbarData ? "" : !hidden ? navbarItem(navbarData) : ""}
            </div>
          </div>
          <div
            className={
              hidden ? "hidden" : "-mr-2 flex md:hidden justify-between"
            }
          >
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
              <Image src={"philbizz.png"} style={{ width: "200px" }} />
            </a>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="max-w-md ms-5 me-5 md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navbarData.map((item, index) => (
              <div
                key={index}
                className=""
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.path}
                  className=" text-gray-600 hover:text-gray-900 "
                  onClick={
                    item.name === "Ktv/jtv"
                      ? handleKtvJtvClick(item)
                      : handleClickDelete
                  }
                >
                  <div className=" border rounded p-4 hover:bg-gray-400">
                    {t(item.name)}
                  </div>
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
