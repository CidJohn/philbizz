import React, { useEffect, useState } from "react";
import Images from "../Image/Images";
import Image from "../Image/Image";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaRegFileArchive, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { GrDocumentText } from "react-icons/gr";
import { RxExit } from "react-icons/rx";
import { TbLayoutNavbar } from "react-icons/tb";
import { useNavbarView } from "../../helper/database/useNavbarSettings";

function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenAchived, setIsDropdownOpenAchived] = useState(false);
  const [viewNavbarList, setNavbarList] = useState();
  const { navbarData, loadingData } = useNavbarView();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setTimeout(() => {
      setNavbarList(navbarData);
    }, 500);
  }, [navbarData]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdownArchived = () => {
    setIsDropdownOpenAchived(!isDropdownOpenAchived);
  };

  const handleSidebar = (path, name, id) => {
    navigate(`/dashboard${path}`, { state: { name: name, path: path, id:id } });
  };

  const handleArchived = (path, name) => {
    navigate(`/dashboard/archived${path}`, {
      state: { name: name, path: path },
    });
  };

  const handleDynamicNavbar = (data) => {
    navigate(`/dashboard/item/Navigation`);
  };

  return (
    <div className='sticky top-0'>
      <button
        data-drawer-target='default-sidebar'
        data-drawer-toggle='default-sidebar'
        aria-controls='default-sidebar'
        type='button'
        className='inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        onClick={toggleSidebar}
      >
        <span className='sr-only'>Open sidebar</span>
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            clipRule='evenodd'
            fillRule='evenodd'
            d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
          />
        </svg>
      </button>

      <aside
        id='default-sidebar'
        className={` top-0 left-0 z-40 w-64 h-screen transition-transform gap-4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto bg-white drop-shadow-md dark:bg-gray-800'>
          <ul className='space-y-2 font-medium'>
            <li>
              <a
                href='/dashboard#dashboard'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white  group'
              >
                <Images src={"philbizzLogo.png"} style={{ width: "200px" }} />
              </a>
            </li>
            <hr />
            <li>
              <a
                href='/dashboard#dashboard'
                className='flex items-center p-4 text-[#013A63] rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <RxDashboard className='text-lg' />
                <span className='ms-3 fira-sans-regular'>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href='/dashboard/account/list'
                className='flex items-center p-4 text-[#013A63] fira-sans-regular rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <FaRegUserCircle className='text-lg' />
                <span className='flex-1 ms-3 whitespace-nowrap fira-sans-regular'>
                  Users
                </span>
              </a>
            </li>
            <li>
              <a
                href='/dashboard#inbox'
                className='flex items-center p-4 text-[#013A63] fira-sans-regular rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <MdOutlineNotificationsActive className='text-lg' />
                <span className='flex-1 ms-3 whitespace-nowrap fira-sans-regular'>
                  Notification
                </span>
                <span className='inline-flex items-center justify-center w-3 h-2 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300'>
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleDynamicNavbar(viewNavbarList)}
                className='cursor-pointer flex items-center p-4 text-[#013A63] fira-sans-regular rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <TbLayoutNavbar className='text-lg' />
                <span className='flex-1 ms-3 whitespace-nowrap fira-sans-regular'>
                  Navigation bar
                </span>
              </a>
            </li>
            <li>
              <a
                onClick={toggleDropdown}
                className='cursor-pointer flex items-center p-4 text-[#013A63] fira-sans-regular rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <GrDocumentText className='text-lg' />
                <span className='flex-1 ms-3 whitespace-nowrap fira-sans-regular'>
                  Page Section
                </span>
              </a>
              <ul
                className={`ms-4 overflow-hidden hover:overflow-y-scroll transition-all duration-500 ease-in-out scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200  ${
                  isDropdownOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {viewNavbarList &&
                  viewNavbarList.map((item, index) => (
                    <li key={index} className='ms-6'>
                      <button
                        type='button'
                        className='flex p-1 gap-2'
                        onClick={() => handleSidebar(item.path, item.name, item.id)}
                      >
                        <Images src={item.icons} style={{ width: "20px" }} />
                        <span className='text-[#013A63] fira-sans-regular'>
                          {item.name}
                        </span>
                      </button>
                    </li>
                  ))}
              </ul>
            </li>
            <li>
              <a
                onClick={toggleDropdownArchived}
                className='cursor-pointer flex items-center p-4 text-[#013A63] fira-sans-regular rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <FaRegFileArchive className='text-lg' />
                <span className='flex-1 ms-3 whitespace-nowrap fira-sans-regular'>
                  Archived
                </span>
              </a>
              <ul
                className={`ms-4 overflow-hidden hover:overflow-y-scroll transition-all duration-500 ease-in-out scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200  ${
                  isDropdownOpenAchived
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {viewNavbarList &&
                  viewNavbarList.map((item, index) => (
                    <li key={index} className='ms-6'>
                      <button
                        type='button'
                        className='flex p-1 gap-2'
                        onClick={() => handleArchived(item.path, item.name)}
                      >
                        <Images src={item.icons} style={{ width: "20px" }} />
                        <span className='text-[#013A63] fira-sans-regular'>
                          {item.name}
                        </span>
                      </button>
                    </li>
                  ))}
              </ul>
            </li>
            <li>
              <a
                href='/'
                className='flex items-center p-4 text-[#013A63] fira-sans-regular rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
              >
                <RxExit className='text-lg' />
                <span className='flex-1 ms-3 whitespace-nowrap fira-sans-regular'>
                  Sign Out
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
