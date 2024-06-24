import React, { useState } from 'react'
import '../../styles/Navbar.css'
import Button from '../Button/Button'
import navbarContent from '../../content/navbarContent'
import SearchIcon from '../svg/SearchIcons'
import Searchinput from '../svg/SearchInputs'


export default function Navbar() {
  const handleClick = () => {
    console.log("clicked");
  }
  const [showDropdown, setShowDropdown] = useState(true);
  const [showDropdown2, setShowDropdown2] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseEnter = (name) => {
    setShowDropdown(name);
  };

  const handleMouseLeave = () => {
    setShowDropdown2(null);
  };
  return (
    <nav className="bg-gray-100">
     <div className="hidden md:block">
        <div className="flex items-center justify-between mt-2">
          <div className=""></div>
          <a href="/" className="font-bold text-3xl text-gray-800 flex">
            <div className="font-bold text-3xl text-blue-800 ">P</div>
            <div className="font-bold text-xl text-blue-800 mt-2">HILIPPINE</div>
            <div className="font-bold text-3xl text-red-800 ">Z</div>
            <div className="font-bold text-xl text-gray-800 mt-2">ONE</div>
          </a>
          <form className="flex items-center max-w-sm space-x-3">
            <label htmlFor="simple-search" className="sr-only">Search</label>
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
              />
            </div>
            <button type="submit" className="flex items-center justify-center border rounded px-4 py-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900">
              <SearchIcon />
              <span className="sr-only">Search</span>
            </button>
            <button 
              type="button"
              onClick={handleClick} 
              className="flex items-center justify-center border rounded px-4 py-2 hover:bg-gray-400 text-gray-600 hover:text-gray-900"
            >
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-200 max-w-auto  px-4 sm:px-6 lg:px-8 mt-1">
          <div className="flex items-center justify-between h-16 ">
          <div className="hidden md:block mx-auto">
          <div className="ml-10 flex items-baseline space-x-1 relative">
            {navbarContent.map((item, index) => (
              <div key={index} className="border rounded p-4 hover:bg-gray-400 relative" onMouseEnter={() => setShowDropdown(item.name)} >
                <a href={item.path} className="text-gray-600 hover:text-gray-900">{item.name}</a>
                {item.children && showDropdown === item.name && (
                  <div className="absolute mt-2 bg-white border rounded-lg shadow-lg z-50" onMouseLeave={() => setShowDropdown(false)}>
                    {item.children.map((childItem, childIndex) => (
                      <a key={childIndex} href={childItem.path} className="block px-4 py-2 hover:bg-gray-200">{childItem.childname}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}

           
          </div>
          </div>
          
          
          <div className="-mr-2 flex md:hidden justify-between">
          
            <button type="button"  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500" aria-controls="mobile-menu" aria-expanded={isMenuOpen} onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <a href="/" className="font-bold text-3xl text-gray-800 flex ">
            <div className="font-bold text-gl text-blue-800 ">P</div>
            <div className="font-bold text-sm text-blue-800 mt-3">HILIPPINE</div>
            <div className="font-bold text-gl text-red-800 ">Z</div>
            <div className="font-bold text-sm text-gray-800 mt-3">ONE</div>
          </a>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navbarContent.map((item, index) => (
              <div
                key={index}
                className="border rounded p-4 hover:bg-gray-400 relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <a href={item.path} className="text-gray-600 hover:text-gray-900">
                  {item.name}
                </a>
                {item.children && showDropdown2 === item.name && (
                  <div className="absolute mt-2 bg-white border rounded-lg shadow-lg z-50">
                    {item.children.map((childItem, childIndex) => (
                      <a
                        key={childIndex}
                        href={childItem.path}
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        {childItem.childname}
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
  )
}
