import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HeroBanner } from "./Homeview/HeroBanner/HeroBanner";
import { useGlobalContext } from "../helper/context/useContext";
import Spinner from "../components/Spinner/Spinner";

function Homeview({ data }) {
  const { t } = useTranslation();
  const {mainContentList} = useGlobalContext();


  return (
    <div className="w-full">
      <HeroBanner
        blogData={data.blogData}
        navbar={data.navbar}
        mainContentList = {mainContentList}
      />
    </div>
  );
}

export default Homeview;
