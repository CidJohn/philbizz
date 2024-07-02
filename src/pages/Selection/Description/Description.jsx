import React from "react";
import selectionContent from "../../../content/selectionContent";
import { ImageLink } from "../../../components/Image/ImageLink";
import Horizontal from "../../../components/Horizontal/Horizontal";

const Description = ({ type }) => {
  return (
    <>
      {selectionContent.map(
        (item, index) =>
          item.path === type &&
          item.business.map((itemBusiness, businessIndex) => (
            <div className="">
              <div className="px-2 grid gap-4 md:grid-cols-2 mt-10">
                <div className="flex flex-col " key={index}>
                  <h1 className="text-4xl md:text-6xl mb-4 font-serif">
                    {itemBusiness.header}
                  </h1>
                  <p className="text-left mb-4">{itemBusiness.paragraph}</p>
                </div>
                <figure className="max-w-md">
                  <ImageLink
                    className="rounded-lg"
                    src={itemBusiness.image}
                    alt="Hair salon interior"
                  />
                  <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    {itemBusiness.header}
                  </figcaption>
                </figure>
              </div>
              <div className="flex flex-col ">
                <h1 className="text-4xl md:text-6xl mb-4 font-serif">
                  {itemBusiness.header}
                </h1>
                <p className="text-left mb-4">{itemBusiness.paragraph}</p>
              </div>
              <Horizontal />
            </div>
          ))
      )}
    </>
  );
};

export default Description;
