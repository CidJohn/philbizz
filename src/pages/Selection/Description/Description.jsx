import React from "react";
import selectionContent from "../../../content/selectionContent";
import { ImageLink } from "../../../components/Image/ImageLink";
import Horizontal from "../../../components/Horizontal/Horizontal";
import { useTranslation } from "react-i18next";
import useCardSettings from "../../../helper/database/useCardSettings";
import { useCardDesc } from "../../../helper/database/useCardPath";

const Description = ({ type, path }) => {
  const { t } = useTranslation();
  const { businesses } = useCardDesc(type);

  return (
    <>
      {businesses
        ? businesses.map(
            (item, index) =>
              item.header === path && (
                <div className="" key={index}>
                  <div className="px-2 grid gap-4 md:grid-cols-2 mt-10">
                    <div className="flex flex-col ">
                      <h1 className="text-4xl md:text-6xl mb-4 font-serif">
                        {t(item.header)}
                      </h1>
                      <p className="text-left mb-4">{item.paragraph}</p>
                    </div>
                    <figure className="max-w-md">
                      <ImageLink
                        className="rounded-lg"
                        src={item.image}
                        alt="Hair salon interior"
                      />
                      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                        {t(item.header)}
                      </figcaption>
                    </figure>
                  </div>
                  <div className="flex flex-col ">
                    <h1 className="text-4xl md:text-6xl mb-4 font-serif">
                      {t(item.header)}
                    </h1>
                    <p className="text-left mb-4">{item.paragraph}</p>
                  </div>
                  <Horizontal />
                </div>
              )
          )
        : ""}
    </>
  );
};

export default Description;
