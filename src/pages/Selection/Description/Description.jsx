import React from "react";
import { useTranslation } from "react-i18next";
import Images from "../../../components/Image/Images";
import Imagecarousel from "../../../components/Carousel/Imagecarousel";

const Description = (props) => {
  const { content, pageName, txtHeaderColor, carousel, decription } = props;
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-between w-full ">
          <div className=" flex mt-5">
            <div className="flex flex-col ">
              <h1
                className="text-4xl md:text-6xl mb-4 fira-sans-bold "
                style={{ color: txtHeaderColor }}
              >
                {t(pageName)}
              </h1>
              <p className="text-left mb-2 text-sm md:text-md lg:text-lg text-slate-500 fira-sans-condensed-regular ">
                {decription}
              </p>
            </div>
          </div>
        <div className="flex w-full lg:grid lg:grid-cols-2 ">
          <div
            className={carousel ? "flex flex-col " : "flex flex-col w-full "}
          >
            {carousel && (
              <>
                <div className="p-2 ">
                  <Imagecarousel images={carousel} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
