import React from "react";
import { useTranslation } from "react-i18next";
import { useCardDesc } from "../../../helper/database/useCardPath";
import Images from "../../../components/Image/Images";

const Description = ({ type , pageName}) => {
  const { t } = useTranslation();
  return (
    <>
      {type
        ? type.map(
            (item, index) =>
              item.header === pageName && (
                <div className="" key={index}>
                  <div className="px-2 flex mt-5">
                    <div className="flex flex-col ">
                      <h1 className="text-4xl md:text-6xl mb-4 font-serif">
                        {t(item.header)}
                      </h1>
                      <p className="text-left mb-4 ">{item.paragraph}</p>
                    </div>
                    {item.image && (
                      <figure className="max-w-md">
                        <Images
                          className="rounded-lg"
                          src={item.image}
                          alt="Hair salon interior"
                        />
                        <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                          {t(item.header)}
                        </figcaption>
                      </figure>
                    )}
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-left mb-4 indent-8">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
          )
        : ""}
    </>
  );
};

export default Description;
