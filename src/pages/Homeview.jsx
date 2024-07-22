import React, { useState } from "react";
import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import CarouselContent from "../content/CarouselContent";
import Carousel from "../components/Carousel/Carousel";
import { useTranslation } from "react-i18next";
import Businessview from "./Homeview/Businessview";
import Herobanners from "../components/Herobanners/Herobanners";
import { useBusinessSettings } from "../helper/database/useBusinessData";

function Homeview() {
  const { t } = useTranslation();
  const { getCardInfo, getCompanyLoad } = useBusinessSettings();

  const carousel = Array.isArray(getCardInfo) ? getCardInfo.slice(0, 10) : [];
  console.log(carousel);
  return (
    <>
      <div className="container  w-full mx-auto  mt-5">
        <HeroBanner />
        {/* <Herobanners /> */}
        <div className="mt-5">
          <Businessview />
        </div>
        <div className="p-5">
          <h1 className="text-4xl  font-serif p-5 underline decoration-sky-500 decoration-double decoration-2 underline-offset-8 ">
            {t("Companies")}
          </h1>
          <Carousel items={carousel} />
        </div>
      </div>
    </>
  );
}

export default Homeview;
