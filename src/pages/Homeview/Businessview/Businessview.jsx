import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useBusinessSettings,
  useHomeBusiness,
} from "../../../helper/database/useBusinessData";
import Listedcard from "../../../components/Listedcard/Listedcard";
import Spinner from "../../../components/Spinner/Spinner";
import Carousel from "../../../components/Carousel/Carousel";
import TreeView from "../../../components/Treeviews/Treeview";
import { useTreeview } from "../../../helper/database/useTreeview";
import { useNavbarcontent } from "../../../helper/database/useNavbarcontent";
import { useNavigate } from "react-router-dom";
import Calendar from "../../../components/Calendar/Calendar";
import cardContent from "../../../content/cardContent";
import Images from "../../../components/Image/Images";

const Businessview = () => {
  const { t } = useTranslation();
  const [getBeauty, setBeauty] = useState([]);
  const [getFood, setFood] = useState([]);
  const [getKtvjtv, setKtvjtv] = useState([]);
  const [groupedTreeView, setGroupedTreeView] = useState({});
  const [getfilterNav, setNavbar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { header, laodHeader } = useHomeBusiness();
  const { getCardInfo } = useBusinessSettings();
  const { data } = useTreeview();
  const { navbarData } = useNavbarcontent();
  const navigate = useNavigate();

  useEffect(() => {
    if (header) {
      const filteredBeauty = header
        .filter((item) => item.Header === "Beauty")
        .slice(0, 5);
      setBeauty(filteredBeauty);

      const filteredFood = header
        .filter((item) => item.Header === "Food")
        .slice(0, 5);
      setFood(filteredFood);

      const filteredKtv = header
        .filter((item) => item.Header === "Ktv/Jtv")
        .slice(0, 5);
      setKtvjtv(filteredKtv);
    }

    if (navbarData) {
      const filterNav = navbarData.map((node) => node.name);
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

  const carousel = Array.isArray(getCardInfo) ? getCardInfo.slice(0, 10) : [];

  const handleClick = (id, path) => {
    navigate(path, { state: { id } });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-wrap ">
      {laodHeader ? (
        <Spinner />
      ) : (
        <div className=" flex flex-col md:flex-row  gap-3  ">
          <div className="flex flex-col  border-2 border-gray-300 hover:border-violet-300 rounded-lg  p-2 ">
            <div className="sticky top-0 min-w-80">
              {Object.keys(groupedTreeView).map((name) => (
                <div key={name}>
                  <h3 className="font-bold text-2xl my-2 font-serif bg-blue-300 px-2">
                    {name}
                  </h3>
                  <div className="p-2">
                    <TreeView
                      treeViewContent={groupedTreeView[name]}
                      onItemClick={handleClick}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <div className="flex flex-wrap  border-2 border-gray-300 hover:border-yellow-300 rounded-lg ">
              <div className="min-w-full p-5 ">
                <Listedcard
                  section={"food"}
                  title={"Food"}
                  listItems={getFood}
                  listclass={"text-sm"}
                  listclasses={"hover:bg-slate-100 "}
                />
              </div>
              <div className="min-w-full p-5">
                <Listedcard
                  section={"beauty"}
                  title={"Beauty"}
                  listItems={getBeauty}
                  listclass={"text-sm"}
                  listclasses={"hover:bg-slate-100 "}
                />
              </div>
              <div className="min-w-full p-5">
                <Listedcard
                  section={"ktvjtv"}
                  title={"Ktv/Jtv"}
                  listItems={getKtvjtv}
                  listclass={"text-sm"}
                  listclasses={"hover:bg-slate-100 "}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-2 rounded-lg min-w-80 p-5 hover:border-orange-300">
            <div className="sticky top-5">
              <div className="transform transition-transform duration-500 hover:scale-105 ">
                <h1 className="text-4xl font-serif mx-2 font-bold">Calendar</h1>
                <Calendar onDateSelect={handleDateSelect} />
                {selectedDate && (
                  <div className="mt-4">
                    Selected Date: {selectedDate.toDateString()}
                  </div>
                )}
              </div>
              <div className="">
                {cardContent.map((item) => (
                  <div className="flex">
                    <a
                      href={"/"}
                      className="transform transition-transform duration-500 hover:scale-105"
                    >
                      <Images src={item.imageURL} style={{ width: "250px" }} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-screen-sm md:max-w-screen-md lg:min-w-full mt-3 mx-auto border-2 rounded-lg p-2">
        <h1 className="text-4xl font-serif  underline decoration-sky-500 decoration-double decoration-2 underline-offset-8">
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
