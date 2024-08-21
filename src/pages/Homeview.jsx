import React from "react";
import { useTranslation } from "react-i18next";
import Businessview from "./Homeview/Businessview/Businessview";
import { HeroBanner } from "./Homeview/HeroBanner/HeroBanner";

function Homeview() {
  const { t } = useTranslation();

  return (
    <>
      <div className="container  w-full mx-auto mt-5">
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
