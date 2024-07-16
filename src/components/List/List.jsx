import React from "react";
import Image from "../Image/Image";
import { ImageLink } from "../Image/ImageLink";
import Images from "../Image/Images";

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
          className={`bg-white shadow-md rounded-lg flex items-center border gap-2 ${className} ${sizeClass}`}
          style={style}
        >
          {image && (
            <figure className="max-w-md p-4 ">
              <Images src={image} alt={header || title} style={imgstyle} />
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                {header}
              </figcaption>
            </figure>
          )}
          <div className="flex-1">
            <a href={`/${link}`} className={` font-semibold ${titleClass}`}>
              {title}
            </a>
            <p className="text-gray-700 text-sm">{desc}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default List;
