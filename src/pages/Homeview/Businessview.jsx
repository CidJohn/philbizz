import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useBusinessSettings,
  useHomeBusiness,
} from "../../helper/database/useBusinessData";
import Listedcard from "../../components/Listedcard/Listedcard";
import Spinner from "../../components/Spinner/Spinner";
import Carousel from "../../components/Carousel/Carousel";

const Businessview = () => {
  const { t } = useTranslation();
  const [getBeauty, setBeauty] = useState([]);
  const [getBusiness, setBusiness] = useState([]);
  const [getFood, setFood] = useState([]);
  const [getKtvjtv, setKtvjtv] = useState([]);
  const { header, laodHeader } = useHomeBusiness();
  const { getCardInfo, getCompanyLoad } = useBusinessSettings();

  useEffect(() => {
    if (header) {
      const filteredBeauty = header.filter((item) => item.Header === "Beauty");
      setBeauty(filteredBeauty);

      const filteredBusiness = header.filter(
        (item) => item.Header === "Business"
      );
      setBusiness(filteredBusiness);
      const filteredFood = header.filter((item) => item.Header === "Food");
      setFood(filteredFood);
      const filteredKtvjtv = header.filter((item) => item.Header === "Ktv/Jtv");
      setKtvjtv(filteredKtvjtv);
    }
  }, [header]);
  const beautyList = Array.isArray(getBeauty) ? getBeauty.slice(1, 4) : [];
  const beautyCard = Array.isArray(getBeauty) ? getBeauty.slice(0, 1) : [];

  const businessList = Array.isArray(getBusiness)
    ? getBusiness.slice(0, 4)
    : [];

  const foodList = Array.isArray(getFood) ? getFood.slice(1, 4) : [];
  const foodCard = Array.isArray(getFood) ? getFood.slice(0, 1) : [];

  const ktvjtvList = Array.isArray(getKtvjtv) ? getKtvjtv.slice(1, 4) : [];
  const ktvjtvCard = Array.isArray(getKtvjtv) ? getKtvjtv.slice(0, 1) : [];
  const carousel = Array.isArray(getCardInfo) ? getCardInfo.slice(0, 10) : [];

  return (
    <div>
      {laodHeader ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap md:max-w-screen-lg mx-auto gap-2  justify-center">
          <Listedcard
            section={"food"}
            title={"Food"}
            cardItems={foodCard}
            listItems={foodList}
            listclass={"text-sm"}
            listclasses={"hover:bg-slate-100"}
          />
          <Listedcard
            section={"ktvjtv"}
            title={"Ktv/Jtv"}
            cardItems={ktvjtvCard}
            listItems={ktvjtvList}
            listclass={"text-sm"}
            listclasses={"hover:bg-slate-100"}
          />

          <Listedcard
            section={"beauty"}
            title={"Beauty"}
            cardItems={beautyCard}
            listItems={beautyList}
            listclass={"text-sm"}
            listclasses={"hover:bg-slate-100"}
          />
        </div>
      )}
      <div className=" max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg  mt-5 mx-auto ">
        <h1 className="text-4xl text-center font-serif p-5 underline decoration-sky-500 decoration-double decoration-2 underline-offset-8 ">
          {t("Companies")}
        </h1>
        <div className="flex mx-auto">
          <Carousel items={carousel} />
        </div>
      </div>
    </div>
  );
};

export default Businessview;
