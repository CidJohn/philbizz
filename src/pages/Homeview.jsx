import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HeroBanner } from "./Homeview/HeroBanner/HeroBanner";
import { useGlobalContext } from "../helper/context/useContext";
import Spinner from "../components/Spinner/Spinner";

function Homeview({ data }) {
  const { t } = useTranslation();
  const { contentList, setHeader } = useGlobalContext();

  useEffect(() => {
    setHeader("Food");
  }, []);
  if(contentList.contentList === 0) {
    return (
      <div className="w-full flex items-center jsutify-center min-h-screen">

        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full">
      <HeroBanner
        blogData={data.blogData}
        navbar={data.navbar}
        businessCarousel={contentList}
      />
    </div>
  );
}

export default Homeview;
