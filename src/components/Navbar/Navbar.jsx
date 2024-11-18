import React, { useState } from "react";
import "../../styles/Navbar.css";
import Image from "../Image/Image";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Images from "../Image/Images";
import Swal from "sweetalert2";
import changeColor from "../../content/content.json";
import { BsThreeDots } from "react-icons/bs";
import HeadlessDropdown from "../Dropdown/HeadlessDropdown";
import Button from "../Button/Button";
import AdvertisementSlider from "../Advertisement/Advertisement";
import { sliderData } from "./sliderData";
import { SwiperSlide } from "swiper/react";

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

  const handleClick = (item) => {
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
    console.log(item);
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
        className='  p-2 relative mt-2 hover:text-gray-900  '
        onMouseEnter={() => setShowDropdown(item.name)}
      >
        {item.restrict !== 19 ? (
          <>
            <a
              className={`border-b-2 hover:border-gray-900 cursor-pointer flex flex-col text-gray-600 hover:text-gray-900 hover:font-bold items-center  transform transition-transform duration-500 hover:scale-90 ${
                isActive === item.name
                  ? "border-gray-900 text-gray-900 font-bold"
                  : "border-transparent"
              } `}
              onClick={() => handleClick(item)}
              target={item.name === "Business" ? "_blank" : "_self"}
            >
              <span className='text-2xl hover:border-gray-900 px-4 py-2 rounded '>
                <Images src={item.icons || item.iconPath} style={{ width: "50px" }} />
              </span>
              <span className='fira-sans-bold'>{t(item.name)}</span>
            </a>
          </>
        ) : (
          ""
        )}

        {item.children && showDropdown === item.name && (
          <div
            className='absolute bg-white rounded-lg shadow-lg z-50'
            onMouseLeave={() => setShowDropdown(false)}
          >
            {item.children.map((childItem, childIndex) => (
              <a
                key={childIndex}
                href={childItem.path}
                className='block px-4 py-2 hover:bg-gray-200'
              >
                <p className='fira-sans-bold'>{t(childItem.name)}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <nav className={!hidden ? "bg-white " : "hidden"}>
      <div className=' w-full border-b px-4 sm:px-6 lg:px-[5rem]  mx-auto shadow-inner'>
        <div className='w-full flex items-center justify-between'>
          <div className='hidden lg:block'>
            <AdvertisementSlider slides={sliderData} />
          </div>
          <div className='hidden lg:block mx-auto'>
            <div className='z-50 flex items-baseline  bg-[#013A63]/5 space-x-0.4 relative  '>
              {!navbarData ? "" : !hidden ? navbarItem(navbarData) : ""}
              <div className='hidden lg:flex items-center justify-center flex-col cursor-pointer'>
                <HeadlessDropdown
                  icon={<BsThreeDots />}
                  menuTitle='Additional'
                  className='z-50 fira-sans-bold text-slate-600 cursor-pointer flex items-center justify-center flex-col pr-4 '
                >
                  <div className='flex items-center justify-center space-x-1 relative gap-2 p-4'>
                    {navbarData
                      ? navbarData.map(
                          (item, index) =>
                            item.restrict === 19 && (
                              <React.Fragment key={index}>
                                <Button
                                  onClick={handleKtvJtvClick(item)}
                                  icon={
                                    <div className='flex flex-col items-center justify-center gap-3'>
                                      <Images
                                        src={item.icons || item.iconPath}
                                        alt=''
                                        className='px-4 w-20 h-auto'
                                      />
                                      <p className='fira-sans-bold text-slate-600'>
                                        {item.name}
                                      </p>
                                    </div>
                                  }
                                />
                              </React.Fragment>
                            )
                        )
                      : ""}
                  </div>
                </HeadlessDropdown>
              </div>
            </div>
          </div>
          <div
            className={
              hidden
                ? "hidden"
                : "-mr-2 w-full flex lg:hidden justify-center items-center p-4 gap-4"
            }
          >
            <a href='/' className='font-bold text-3xl text-gray-800 flex '>
              <Image src={"philbizzLogo.png"} style={{ width: "200px" }} />
            </a>
            <button
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500'
              aria-controls='mobile-menu'
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className={`${
                  isMenuOpen ? "hidden" : "flex"
                } h-7 w-7 text-[#013A63]`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
              <svg
                className={`${
                  isMenuOpen ? "flex" : "hidden"
                } h-7 w-7 text-[#013A63]`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='hidden lg:block'>
            <AdvertisementSlider slides={sliderData} />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className='w-full px-4  py-2 lg:hidden' id='mobile-menu'>
          <div className='px-2  pb-3 space-y-1 sm:px-3'>
            {navbarData.map((item, index) => (
              <div
                key={index}
                className='w-full'
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={item.path}
                  className=' text-gray-600 hover:text-gray-900 w-full '
                  onClick={
                    item.name === "Ktv/jtv"
                      ? handleKtvJtvClick(item)
                      : handleClick
                  }
                >
                  <div className=' border rounded bg-[#013A63]/5 p-4 fira-sans-regular hover:bg-[#013A63] flex items-center justify-center w-full hover:text-white'>
                    {t(item.name)}
                  </div>
                </a>
                {item.children && showDropdown2 === item.name && (
                  <div className='absolute mt-2  bg-white border rounded-lg shadow-lg z-50'>
                    {item.children.map((childItem, childIndex) => (
                      <a
                        key={childIndex}
                        href={childItem.path}
                        className='block px-4 py-2 hover:bg-gray-200'
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
