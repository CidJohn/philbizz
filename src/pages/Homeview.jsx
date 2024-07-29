import React from "react";
import { HeroBanner } from "../components/HeroBanner/HeroBanner";
import Carousel from "../components/Carousel/Carousel";
import { useTranslation } from "react-i18next";
import Businessview from "./Homeview/Businessview";
import { useBusinessSettings } from "../helper/database/useBusinessData";

function Homeview() {
  const { t } = useTranslation();

  return (
    <>
      <div className="container  w-full mx-auto  mt-5">
        <HeroBanner />
        {/* <Herobanners /> */}
        <div className="mt-5">
          <Businessview />
        </div>
        
      </div>
    </>
  );
}

export default Homeview;
