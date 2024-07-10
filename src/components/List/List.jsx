import React from "react";
import Image from "../Image/Image";

const List = (props) => {
  const { title, desc, id, image, header } = props;
  return (
    <div className="flex flex-col mt-5">
      <ul className="space-y-4">
        <li
          key={id}
          className="bg-white shadow-md rounded-lg p-4 flex items-center border"
        >
          {image && (
            <figure className="max-w-md p-4">
              <Image
                className="rounded-lg"
                src={image}
                alt={header || title}
                style={{ width: "100px" }}
              />
              <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                {header}
              </figcaption>
            </figure>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-700">{desc}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default List;
