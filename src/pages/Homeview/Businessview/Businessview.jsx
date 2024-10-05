import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHomeBusiness } from "../../../helper/database/useBusinessData";
import Listedcard from "../../../components/Listedcard/Listedcard";
import Spinner from "../../../components/Spinner/Spinner";
import TreeView from "../../../components/Treeviews/Treeview";
import { useTreeview } from "../../../helper/database/useTreeview";
import { useNavigate } from "react-router-dom";
import Calendar from "../../../components/Calendar/Calendar";
import { socialContent } from "../../../content/cardContent";
import Images from "../../../components/Image/Images";
import changeColor from "../../../content/content.json";

const Businessview = (props) => {
  const { navbar, businessCarousel } = props;
  const { t } = useTranslation();
  const [getBeauty, setBeauty] = useState([]);
  const [getFood, setFood] = useState([]);
  const [getKtvjtv, setKtvjtv] = useState([]);
  const [getFestival, setFestival] = useState([]);
  const [groupedTreeView, setGroupedTreeView] = useState({});
  const [getfilterNav, setNavbar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { header, laodHeader } = useHomeBusiness();
  const { data } = useTreeview();
  const navigate = useNavigate();

  useEffect(() => {
    if (header) {
      const filteredBeauty = header
        .filter((item) => item.Header === "Beauty")
        .slice(0, 4);
      setBeauty(filteredBeauty);

      const filteredFood = header
        .filter((item) => item.Header === "Food")
        .slice(0, 4);
      setFood(filteredFood);

      const filteredKtv = header
        .filter((item) => item.Header === "Ktv/Jtv")
        .slice(0, 4);
      setKtvjtv(filteredKtv);

      const filteredFestival = header
        .filter((item) => item.Header === "Festival")
        .slice(0, 4);
      setFestival(filteredFestival);
    }

    if (navbar) {
      const filterNav = navbar.map((node) => node.name);
      setNavbar(filterNav);
    }

    if (data && navbar) {
      const groupedData = navbar.reduce((acc, navItem) => {
        const filterData = data.filter((node) => node.path === navItem.path);
        if (navItem.name === "Ktv/Jtv") {
          return acc;
        }
        if (filterData.length > 0) {
          acc[navItem.name] = filterData;
        }
        return acc;
      }, {});
      setGroupedTreeView(groupedData);
    }
  }, [header, navbar, data]);

  const carousel = Array.isArray(businessCarousel)
    ? businessCarousel.slice(0, 4)
    : [];

  const listItems = [
    { title: "Food", list: getFood },
    { title: "Festival", list: getFestival },
    { title: "Beauty", list: getBeauty },
    { title: "Company", list: carousel },
  ];

  const handleClick = (id, path) => {
    const formattedPath = path.startsWith("/") ? path.replace("/", "") : path;
    const dynamicColorChanger = changeColor.sideBarColor
      ? changeColor.sideBarColor.filter(
          (node) => node.pageName.toLowerCase() === formattedPath
        )
      : [];

    navigate(`${path}#cards`, {
      state: {
        id: id,
        path: path,
        pageName: formattedPath,
        sideBarColorChanger: dynamicColorChanger[0],
      },
    });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-wrap  px-60 mt-12 ">
      {laodHeader ? (
        <div className="flex  justify-center min-h-screen mx-auto">
          <Spinner />
        </div>
      ) : (
        <div className=" flex flex-col md:flex-row  gap-3 w-full ">
          <div className="flex flex-col   rounded-lg ">
            {/*sticky top-0 */}
            <div className=" w-[16vw] ">
              {Object.keys(groupedTreeView).map((name) => (
                <div key={name} className="p-2 ">
                  <h3 className="font-bold text-2xl my-2 py-2 text-white bg-[#013A63] px-2">
                    {name}
                  </h3>
                  <div className="p-2 border">
                    <TreeView
                      treeViewContent={groupedTreeView[name]}
                      onItemClick={handleClick}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col   ">
            {listItems.map((item) => (
              <div className="w-full" key={item.id}>
                <Listedcard
                  section={item.title}
                  listItems={item.list}
                  listclass={"text-md"}
                  listclasses={"hover:bg-slate-100  "}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col min-w-80 p-2 ">
            <div className="sticky top-5">
              <div className="transform transition-transform duration-500 hover:scale-105 ">
                <h1 className="text-4xl p-2 fira-sans-bold text-[#013A63]">
                  Calendar
                </h1>
                <Calendar onDateSelect={handleDateSelect} />
                {selectedDate && (
                  <div className="mt-4">
                    Selected Date: {selectedDate.toDateString()}
                  </div>
                )}
              </div>
              <div className="mt-5 rounded-lg shadow-lg p-3 bg-[#013A63]/5">
                <h1 className="text-4xl p-2 fira-sans-bold text-[#013A63]">
                  Social media
                </h1>
                {socialContent.map((item, index) => (
                  <div className="flex " key={index}>
                    <a
                      href={item.link}
                      className="transform  transition-transform duration-500 hover:scale-105 p-5"
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
      {/* <div className="max-w-screen-sm md:max-w-screen-md lg:min-w-full mt-3 mx-auto border-2 rounded-lg p-2">
        <h1 className="text-4xl   underline decoration-sky-500 decoration-double decoration-2 underline-offset-8">
          {t("Companies")}
        </h1>
        <div className="flex mx-auto">
          <Carousel items={carousel} />
        </div>
      </div> */}
    </div>
  );
};

export default Businessview;
