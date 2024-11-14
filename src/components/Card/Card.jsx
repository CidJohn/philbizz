import React from "react";
import Images from "../Image/Images";
import { FaAngleRight } from "react-icons/fa";

function Card(props) {
  const { title, src, desc, style, theme, link, onLink, btnColor, textColor } =
    props;

  return (
    <div
      className={`bg-[#013A63]/5  rounded-md dark:bg-gray-800 dark:border-gray-700 shadow-md border border-[#013A63]/5 cursor-pointer p-4 `}
      style={style}
    >
      {theme === 1 ? (
        <>
          <button onClick={onLink} className='block'>
            <div className='w-full overflow-hidden'>
              <a
                className='block cursor-pointer border text-center p-3 shadow rounded-sm'
                onClick={onLink}
              >
                <h5
                  className={
                    textColor
                      ? "text-md font-bold tracking-tight text-[#013A63] fira-sans-bold"
                      : "text-2xl font-bold tracking-tight text-[#013A63] fira-sans-bold "
                  }
                  style={{ color: textColor }}
                >
                  {title}
                </h5>
              </a>
              <div className='flex w-full'>
                <div className=' w-full overflow-hidden '>
                  <div className='w-full h-full p-2  '>
                    <Images
                      src={src}
                      className='object-cover h-full w-full  rounded-sm shadow-lg '
                      style={{ height: "200px", width: "200px" }}
                    />
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <p
                    className='px-3 py-1 font-normal h-[15vh]  w-[10vw] text-sm text-gray-600 fira-sans-condensed-regular'
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={desc}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          </button>
        </>
      ) : theme === 2 ? (
        <>
          <button className='block' onClick={onLink}>
            <div className=' w-full overflow-hidden '>
              <div
                className='block cursor-pointer border text-center p-3 shadow rounded-sm'
                onClick={onLink}
              >
                <h5
                  className={
                    textColor
                      ? "text-md font-bold tracking-tight text-[#013A63] fira-sans-bold truncate w-[10vw]"
                      : "text-2xl font-bold tracking-tight text-[#013A63] fira-sans-bold truncate"
                  }
                  style={{ color: textColor }}
                >
                  {title}
                </h5>
              </div>
              <div className='flex flex-col'>
                <div className=' w-full overflow-hidden '>
                  <div className='h-full p-2  '>
                    <Images
                      src={src}
                      className='object-cover h-full  rounded-sm shadow-lg '
                      style={{ height: "200px" }}
                    />
                  </div>
                </div>
                <div className='flex flex-wrap'>
                  <p
                    className='font-normal text-wrap min-h-[4vh] truncate text-sm text-gray-600 fira-sans-condensed-regular'
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={desc}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          </button>
        </>
      ) : (
        <>
          <button className='block' onClick={onLink}>
            <div className=' w-full overflow-hidden '>
              <div className='h-full p-3 '>
                <Images
                  src={src}
                  className='object-cover h-full w-full rounded-sm'
                  style={{ height: "200px" }}
                />
              </div>
            </div>
          </button>
          <div className='p-2 '>
            <button className='block cursor-pointer' onClick={onLink}>
              <h5
                className={
                  textColor
                    ? "text-md font-bold tracking-tight text-[#013A63] fira-sans-bold"
                    : "text-2xl font-bold tracking-tight text-[#013A63] fira-sans-bold "
                }
                style={{ color: textColor }}
              >
                {title}
              </h5>
            </button>
            <p
              className='font-normal text-wrap truncate text-sm text-gray-600 fira-sans-condensed-regular'
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={desc}
            >
              {desc}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
