import React from "react";
import Images from "../Image/Images";
import ImageBinary from "../Image/ImageBinary";

const List = (props) => {
  const {
    title,
    desc,
    id,
    image,
    header,
    className,
    titleClass,
    size,
    link,
    style,
    imgstyle,
    user,
    binaryImage,
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
    <div className="flex flex-col mt-3">
      <ul className="space-y-2">
        <li
          key={id}
          className={`bg-white shadow-md rounded-lg  border gap-2 ${className} `}
          style={style}
        >
          <a href={`/${link}`} className={`flex items-center  `}>
            {image && (
              <figure className="max-w-md p-4 ">
                <Images src={image} alt={header || title} style={imgstyle} />
                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  {header}
                </figcaption>
              </figure>
            )}
            <div className="flex-1 max-w-screen-lg ">
              <div className="font-semibold">{title}</div>
              <p className="text-gray-700 text-xs text-wrap truncate">{desc}</p>
              {user && (
                <p
                  href="/"
                  className="text-gray-700 text-xs italic text-wrap truncate"
                >
                  - {user}
                </p>
              )}
            </div>
            {binaryImage && (
              <div className="flex justify-items-end">
                <figure className="max-w-md p-4 ">
                  <ImageBinary
                    binaryData={binaryImage}
                    alt={header || title}
                    style={imgstyle}
                  />
                  <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    {header}
                  </figcaption>
                </figure>
              </div>
            )}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default List;
