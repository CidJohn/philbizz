import React from "react";
import Horizontal from "../Horizontal/Horizontal";

const Categories = ({ footerContent, handleClick, handleClickParent }) => {
  return (
    <div>
      <div className="mx-auto w-full max-w-screen-lg">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Categories
        </span>
        <Horizontal />
        <div className="flex flex-wrap mx-auto justify-center gap-3">
          {footerContent.map((section, index) => (
            <div key={index}>
              <a
                className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white underline underline-offset-1"
                href={section.href}
                onClick={handleClickParent}
              >
                {section.title}
              </a>
              <ul className="grid md:grid-cols-2 text-gray-500 dark:text-gray-400  font-medium mt-5">
                {section.links.map((link, linkIndex) => (
                  <li className="mb-4" key={linkIndex}>
                    <a
                      href="#card"
                      className="hover:bg-gray-200 border bg-blue-200 p-2 rounded-full hover:text-gray-600 "
                      onClick={handleClick}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
