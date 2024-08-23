import React from "react";
import { useTranslation } from "react-i18next";
import Businessview from "./Homeview/Businessview/Businessview";
import { HeroBanner } from "./Homeview/HeroBanner/HeroBanner";

function Homeview({ data }) {
  const { t } = useTranslation();

  return (
    <>
      <div className="container  w-full mx-auto mt-5">
        <HeroBanner blogData={data.blogData} />
        {/* <Herobanners /> */}
        <div className="mt-5">
          <Businessview navbar={data.navbar} businessCarousel={data.businessSettings} />
        </div>
      </div>
    </>
  );
}

export default Homeview;
