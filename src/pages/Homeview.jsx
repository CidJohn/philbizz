import React from "react";
import { useTranslation } from "react-i18next";
import { HeroBanner } from "./Homeview/HeroBanner/HeroBanner";
import Spinner from "../components/Spinner/Spinner";

function Homeview({ data }) {
  const { t } = useTranslation();

  if (!data.businessSettings) {
    return (
      <div className="flex w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }
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
