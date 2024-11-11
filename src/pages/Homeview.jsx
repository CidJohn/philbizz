import React from "react";
import { useTranslation } from "react-i18next";
import { HeroBanner } from "./Homeview/HeroBanner/HeroBanner";

function Homeview({ data }) {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <HeroBanner
        blogData={data.blogData}
        navbar={data.navbar}
        businessCarousel={data.businessSettings}
      />
   
    </div>
  );
}

export default Homeview;
