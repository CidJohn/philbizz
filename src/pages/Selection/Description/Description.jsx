import React from "react";
import { useTranslation } from "react-i18next";
import Images from "../../../components/Image/Images";
import Imagecarousel from "../../../components/Carousel/Imagecarousel";

const Description = (props) => {
  const { content, pageName, txtHeaderColor, carousel } = props;
  const { t } = useTranslation();
  return (
    <>
      {content
        ? content.map(
            (item, index) =>
              item.header === pageName && (
                <div className="" key={index}>
                  <div className=" flex mt-5">
                    <div className="flex flex-col ">
                      <h1
                        className="text-4xl md:text-6xl mb-4 fira-sans-bold "
                        style={{ color: txtHeaderColor }}
                      >
                        {t(item.header)}
                      </h1>
                      <p className="text-left mb-2 fira-sans-bold ">
                        {item.paragraph}
                      </p>
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
                  <div className="grid grid-cols-2 ">
                    <div className={carousel ? "flex flex-col " : "flex flex-col max-w-[30vw] "}>
                      <p className="text-left text-gray-400  font-sans ">
                        {item.description}
                      </p>
                    </div>
                    {carousel && (
                      <>
                        <div className="p-2 border">
                          <Imagecarousel images={carousel} /> 
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
          )
        : ""}
    </>
  );
};

export default Description;
