import React from "react";
import Images from "../Image/Images";
import ImageBinary from "../Image/ImageBinary";
import Dateformat from "../Dateformat/Dateformat";
import { IoPersonCircleOutline } from "react-icons/io5";

const List = (props) => {
  const {
    title,
    desc,
    id,
    image,
    header,
    className,
    size,
    onLink,
    style,
    imgstyle,
    user,
    binaryImage,
    datetime,
    classStyle,
    colorText,
  } = props;
  let sizeClass;
  switch (size) {
    case "small":
      sizeClass = "text-sm";
      break;
    case "medium":
      sizeClass = "text-base";
      break;
    case "large":
      sizeClass = "text-lg";
      break;
    default:
      sizeClass = "text-base";
  }

  return (
    <div className='w-full flex flex-col mt-3 py-3'>
      <ul className='space-y-2'>
        <li
          key={id}
          className={`bg-[#013A63]/5 shadow-md  border  ${className} `}
          style={style}
        >
          <a onClick={onLink} className={`flex items-center cursor-pointer `}>
            {image && (
              <figure className='max-w-md p-4 '>
                <Images
                  src={image}
                  alt={header || title}
                  style={imgstyle}
                  className={"cover"}
                />
                <figcaption className='mt-2 text-sm text-center text-gray-500 dark:text-gray-400'>
                  {header}
                </figcaption>
              </figure>
            )}
            <div className='w-full md:w-full lg:w-[48rem] p-4 lg:p-8 h-auto shadow-none lg:shadow-md border border-[#013A63]/5'>
              <div className=''>
                <div className='flex items-center gap-4 w-full'>
                  {user && (
                    <>
                      <IoPersonCircleOutline className='text-2xl text-[#390099]' />
                      <div className='flex flex-col lg:flex-row justify-start items-start lg:items-center lg:justify-between w-full'>
                        <h1 className='text-[#390099]/80 font-bold fira-sans-bold text-lg italic text-wrap truncate'>
                          {user}
                        </h1>
                        <p className=' text-[#390099] bg-transparent border border-[#390099] px-6 rounded-full py-2 fira-sans-condensed-regular text-sm text-wrap truncate'>
                          <Dateformat dateString={datetime} />
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className='mt-12 flex items-start justify-start flex-col'>
                <div
                  className={`text-gray-800 font-bold fira-sans-bold text-xl`}
                >
                  {title}
                </div>
                <p className='text-gray-700 text-xs text-wrap truncate'>
                  {desc}
                </p>
                {binaryImage ? (
                  <div className='w-full mt-4 '>
                    <figure className='w-full '>
                      <Images
                        src={binaryImage}
                        alt={header || title}
                        style={imgstyle}
                      />
                      <figcaption className='mt-2 text-sm text-center text-gray-500 dark:text-gray-400'>
                        {header}
                      </figcaption>
                    </figure>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default List;
