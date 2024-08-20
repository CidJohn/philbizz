import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useBusinessSettings,
  useHomeBusiness,
} from "../../helper/database/useBusinessData";
import Listedcard from "../../components/Listedcard/Listedcard";
import Spinner from "../../components/Spinner/Spinner";
import Carousel from "../../components/Carousel/Carousel";
import TreeView from "../../components/Treeviews/Treeview";
import { useTreeview } from "../../helper/database/useTreeview";
import { useNavbarcontent } from "../../helper/database/useNavbarcontent";
import { useNavigate } from "react-router-dom";

const Businessview = () => {
  const { t } = useTranslation();
  const [getBeauty, setBeauty] = useState([]);
  const [getFood, setFood] = useState([]);
  const [groupedTreeView, setGroupedTreeView] = useState({});
  const [getfilterNav, setNavbar] = useState([]);
  const { header, laodHeader } = useHomeBusiness();
  const { getCardInfo } = useBusinessSettings();
  const { data } = useTreeview();
  const { navbarData } = useNavbarcontent();
  const navigate = useNavigate();

  useEffect(() => {
    if (header) {
      const filteredBeauty = header.filter((item) => item.Header === "Beauty");
      setBeauty(filteredBeauty);

      const filteredFood = header.filter((item) => item.Header === "Food");
      setFood(filteredFood);
    }

    if (navbarData) {
      const filterNav = navbarData.map((node) => node.path);
      setNavbar(filterNav);
    }

    if (data && navbarData) {
      const groupedData = navbarData.reduce((acc, navItem) => {
        const filterData = data.filter((node) => node.path === navItem.path);
        if (filterData.length > 0) {
          acc[navItem.name] = filterData;
        }
        return acc;
      }, {});
      setGroupedTreeView(groupedData);
    }
  }, [header, navbarData, data]);

  const beautyList = Array.isArray(getBeauty) ? getBeauty.slice(0, 4) : [];
  const beautyCard = Array.isArray(getBeauty) ? getBeauty.slice(0, 1) : [];

  const foodList = Array.isArray(getFood) ? getFood.slice(0, 4) : [];
  const foodCard = Array.isArray(getFood) ? getFood.slice(0, 1) : [];

  const carousel = Array.isArray(getCardInfo) ? getCardInfo.slice(0, 10) : [];

  const handleClick = (id, path) => {
    navigate(path, { state: { id } });
  };

  return (
    <div>
      {laodHeader ? (
        <Spinner />
      ) : (
        <div className="flex flex-row mx-auto gap-3 ">
          <div className="flex flex-col min-w-80 border-2 border-gray-300 rounded-lg  p-5">
            {Object.keys(groupedTreeView).map((name) => (
              <div key={name}>
                <h3 className="font-bold text-2xl my-2 font-serif">{name}</h3>
                <TreeView
                  treeViewContent={groupedTreeView[name]}
                  onItemClick={handleClick}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col p-10 min-w-80 mx-auto border-2 border-gray-300 rounded-lg">
            <Listedcard
              section={"food"}
              title={"Food"}
              cardItems={foodCard}
              listItems={foodList}
              listclass={"text-sm"}
              listclasses={"hover:bg-slate-100 "}
            />
            <Listedcard
              section={"beauty"}
              title={"Beauty"}
              cardItems={beautyCard}
              listItems={beautyList}
              listclass={"text-sm"}
              listclasses={"hover:bg-slate-100 "}
            />
          </div>
          <div className="flex min-w-80 border-2 rounded-lg border-gray-300 p-10">
            <h1 className="text-2xl">Currency Changing</h1>
          </div>
        </div>
      )}
      <div className="max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg mt-5 mx-auto">
        <h1 className="text-4xl font-serif p-5 underline decoration-sky-500 decoration-double decoration-2 underline-offset-8">
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
