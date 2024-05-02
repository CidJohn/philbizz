import React, { useState } from 'react'
import '../../styles/Navbar.css'
import Button from '../Button/Button'
import { ReactComponent as SearchInputIcon } from '../../assets/svg/searchinput.svg'
import {ReactComponent as SearchIcon} from '../../assets/svg/searchIcon.svg'
import navbarContent from '../../content/navbarContent'

export default function Navbar() {
  const handleClick = () => {
    console.log("clicked");
  }
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
            <a href="/" className="font-bold text-xl text-gray-800">Philtong</a>
          </div>
          <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-1">
            {navbarContent.map((item, index) => (
              <div key={index} className="border rounded p-4 hover:bg-gray-400" onMouseEnter={() => setShowDropdown(item.name)} onMouseLeave={() => setShowDropdown(false)}>
                <a href={item.path} className="text-gray-600 hover:text-gray-900">{item.name}</a>
                {item.children && showDropdown === item.name && (
                  <div className="absolute mt-2 bg-white border rounded-lg shadow-lg">
                    {item.children.map((childItem, childIndex) => (
                      <a key={childIndex} href={childItem.path} className="block px-4 py-2 hover:bg-gray-200">{childItem.childname}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}

           
          </div>
          </div>
          
          <div className=" hidden md:block ">
              <form className="flex items-center max-w-sm mx-auto space-x-3">   
                <label for="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <SearchInputIcon />
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                </div>
                <button type="submit" className="border rounded p-5 hover:bg-gray-400">
                    <SearchIcon />
                    <span className="sr-only">Search</span>
                </button>
                <div className="border rounded p-4 hover:bg-gray-400">
                      <Button
                        text="Login"
                        onClick={handleClick}
                        className="text-gray-600 hover:text-gray-900"
                      />
                </div>
            </form>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="block text-base font-medium text-gray-700 hover:text-gray-900">Home</a>
          <a href="/" className="block text-base font-medium text-gray-700 hover:text-gray-900">Features</a>
          <a href="/" className="block text-base font-medium text-gray-700 hover:text-gray-900">Pricing</a>
          <a href="/" className="block text-base font-medium text-gray-700 hover:text-gray-900">Disabled</a>
        </div>
      </div>
    </nav>
  )
}
