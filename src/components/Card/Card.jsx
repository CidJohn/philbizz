import React from "react";
import Images from "../Image/Images";
import { FaAngleRight } from "react-icons/fa";

function Card({ title, src, desc, style, hidden, link, onLink }) {
  return (
    <div
      className=" mx-1 bg-[#013A63]/5  rounded-md dark:bg-gray-800 dark:border-gray-700 shadow-md border border-[#013A63]/5 cursor-pointer p-4 "
      style={style}
    >
      <a className="block" onClick={onLink}>
        <div className=" w-full overflow-hidden ">
          <div className="h-full">
            <Images
              src={src}
              className="object-cover h-full w-full rounded-sm"
              style={{ height: "200px" }}
            />
          </div>
        </div>
      </a>
      <div className="p-4 mt-2">
        <a className="block cursor-pointer" onClick={onLink}>
          <h5 className=" font-bold tracking-tight text-[#013A63] fira-sans-bold text-2xl">
            {title}
          </h5>
        </a>
        <p
          className="font-normal text-wrap truncate text-sm text-gray-600 fira-sans-condensed-regular"
          title={desc}
        >
          {desc}
        </p>
        <a
          href={`/${link}`}
          className="flex items-center justify-center text-center py-3 fira-sans-condensed-regular text-white mt-4 bg-[#013A63] rounded-lg hover:bg-[#013A63]/95 "
        >
          Read more
          <FaAngleRight className="ml-2" />
        </a>
      </div>
    </div>
  );
}

export default Card;
