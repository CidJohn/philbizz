import React from 'react'
import '../../styles/Navbar.css'

export default function Navbar() {
  return (
    <nav className="bg-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center  h-16">
          <div className="flex-shrink-0">
            <a href="/" className="font-bold text-xl text-gray-800">Philtong</a>
          </div>
          <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-1">
            <div className="border rounded p-4 hover:bg-gray-400">
              <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
            </div>
            <div className="border rounded p-4 hover:bg-gray-400">
              <a href="/" className="text-gray-600 hover:text-gray-900">Features</a>
            </div>
            <div className="border rounded p-4 hover:bg-gray-400">
              <a href="/" className="text-gray-600 hover:text-gray-900">Pricing</a>
            </div>
            <div className="border rounded p-4 hover:bg-gray-400">
              <a href="/" className="text-gray-600 hover:text-gray-900">Disabled</a>
            </div>
          </div>
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
