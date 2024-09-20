import React from "react";
import { useTranslation } from "react-i18next";
import Businessview from "./Homeview/Businessview/Businessview";
import { HeroBanner } from "./Homeview/HeroBanner/HeroBanner";

function Homeview({ data }) {
  const { t } = useTranslation();

  return (
    <>
        <HeroBanner blogData={data.blogData} />
        {/* <Herobanners /> */}
          <Businessview navbar={data.navbar} businessCarousel={data.businessSettings} />
    </>
  );
}

export default Homeview;
