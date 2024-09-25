import React, { useState } from "react";

const Dropdown = ({ name, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    onChange({ target: { name, value } });
    setIsOpen(false);
  };
  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`justify-between w-[250px]  text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center `}
        type="button"
        onClick={handleToggle}
      >
        {value
          ? options.find((option) => option.value === value)?.label
          : placeholder}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-[200px]  dark:bg-gray-700 absolute`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-60 overflow-y-scroll ">
            {options.map((option, index) => (
              <li key={index}>
                <a
                  //href="#card"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
