import React from "react";
import Horizontal from "../Horizontal/Horizontal";

const Categories = (props) => {
  const { footerContent, handleClick, handleClickParent, colorChanger } = props;
  return (
    <div>
      <div className="mx-auto w-full ">
        <span
          className="self-center text-4xl font-bold font-sans "
          style={{ color: colorChanger }}
        >
          Categories
        </span>
        <Horizontal />
        <div className="flex justify-center   p-1">
          <div className="flex flex-wrap justify-center mx-auto gap-2 ">
            {footerContent.map((section, index) => (
              <div key={index} className=" p-2 ">
                <button
                  className=" text-sm font-bold font-sans text-gray-900 uppercase  underline underline-offset-1"
                  href={section.href}
                  onClick={handleClickParent}
                >
                  {section.title}
                </button>
                <ul className="grid grid-cols-2   text-gray-100 dark:text-gray-400   p-5 gap-2">
                  {section.links.map((link, linkIndex) => (
                    <button
                      className=" hover:bg-gray-200 border bg-blue-200 p-2 rounded-full hover:text-blue-400 "
                      onClick={handleClick}
                      alt={link.name}
                      title={link.name}
                      style={{ backgroundColor: colorChanger }}
                      key={linkIndex}
                    >
                      <li className="w-full ">
                        <p className="truncate">{link.name}</p>
                      </li>
                    </button>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
