import React from "react";
import Images from "../Image/Images";
import ImageBinary from "../Image/ImageBinary";
import Dateformat from "../Dateformat/Dateformat";

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
          className={`bg-[#013A63]/5 shadow-md  border  ${className} `}
          style={style}
        >
          <a onClick={onLink} className={`flex items-center cursor-pointer `}>
            {image && (
              <figure className="max-w-md p-4 ">
                <Images src={image} alt={header || title} style={imgstyle} />
                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                  {header}
                </figcaption>
              </figure>
            )}
            <div className="flex-1 max-w-screen-lg ">
              <div className={`font-semibold   ${classStyle}`}>{title}</div>
              <p className="text-gray-700 text-xs text-wrap truncate">{desc}</p>
              {user ||
                (datetime && (
                  <div className="">
                    <p className="text-gray-700 text-xs italic text-wrap truncate">
                      - {user}
                    </p>
                    {datetime && (
                      <p className="text-gray-700 text-xs  text-wrap truncate">
                        <Dateformat dateString={datetime} />
                      </p>
                    )}
                  </div>
                ))}
            </div>
            {binaryImage ? (
              <div className="flex ">
                <figure className="max-w-md p-4 ">
                  <Images
                    src={binaryImage}
                    alt={header || title}
                    style={imgstyle}
                  />
                  <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    {header}
                  </figcaption>
                </figure>
              </div>
            ) : (
              ""
            )}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default List;
