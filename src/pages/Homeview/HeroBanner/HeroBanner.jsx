import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useWeather } from "../../../helper/fetchAPI/useWeather";
import useGeolocation from "../../../helper/fetchAPI/useGeolocation";
import DigitalClock from "../../../components/DigitalClock/DigitalClock";
import useNewsFeed from "../../../helper/fetchAPI/useNewsFeed";
import Currency from "../../../components/Currency/Currency";
import { useHomeBusiness } from "../../../helper/database/useBusinessData";
import Blogs from "./HomeContent/Blogs";
import Headlines from "./HomeContent/Headlines";
import WeatherContent from "./HomeContent/WeatherContent";
import BusinessList from "./HomeContent/BusinessList";
import {
  useSideMenuView,
  useTreeview,
} from "../../../helper/database/useTreeview";
import { useNavigate } from "react-router-dom";
import TreeView from "../../../components/Treeviews/Treeview";
import changeColor from "../../../content/content.json";
import Rightads from "./HomeContent/Rightads";
import { socialContent } from "../../../content/cardContent";
import { CustomTabs } from "../../../components/Tabs/Tabs";

export const HeroBanner = (props) => {
  const { blogData, navbar, businessCarousel } = props;
  const [getArticles, setArticles] = useState([]);
  const [getLat, setLat] = useState();
  const [getLan, setLan] = useState();
  const [getBlog, setBlog] = useState([]);
  const [getImgCarousel, setImgCarousel] = useState([]);
  const { header, laodHeader } = useHomeBusiness();
  const { t } = useTranslation();
  const { location } = useGeolocation();
  const { weatherData, loading, error } = useWeather(getLat, getLan);
  const { getNewsData } = useNewsFeed();
  const [getBeauty, setBeauty] = useState([]);
  const [getFood, setFood] = useState([]);
  const [getFestival, setFestival] = useState([]);
  const [groupedTreeView, setGroupedTreeView] = useState({});
  const [getfilterNav, setNavbar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { data } = useTreeview();
  const navigate = useNavigate();
  const { viewMenu } = useSideMenuView();

  useEffect(() => {
    const articles = getNewsData ? getNewsData.articles : [];
    setArticles(articles);

    const getlat = location ? location.lat : "";
    setLat(getlat);
    const getlan = location ? location.lon : "";
    setLan(getlan);

    if (blogData) {
      const filterBlog = blogData ? blogData.slice(0, 3) : [];
      setBlog(filterBlog);
    }

  }, [location, getNewsData, blogData]);

  useEffect(() => {
    if (header) {
      const filteredBeauty = businessCarousel
        .filter((item) => item.business.header === "Beauty")
        .slice(0, 5);
      setBeauty(filteredBeauty.length > 0 ? filteredBeauty : []);

      const filteredFood = businessCarousel
        .filter((item) => item.business.header === "Food")
        .slice(0, 5);
      setFood(filteredFood.length > 0 ? filteredFood : []);

      const filteredFestival = businessCarousel
        .filter((item) => item.business.header === "Festival")
        .slice(0, 4);
      setFestival(filteredFestival.legnth > 0 ? filteredFestival : []);
    }

    if (navbar) {
      const filterNav = navbar.map((node) => node.name);
      setNavbar(filterNav);
    }

    if (viewMenu && navbar) {
      const groupedData = navbar.reduce((acc, navItem) => {
        const filterData = viewMenu.filter(
          (node) => node.path === navItem.path
        );
        if (navItem.restrict === 19) {
          return acc;
        }
        if (filterData.length > 0) {
          acc[navItem.name] = filterData;
        }
        return acc;
      }, {});
      setGroupedTreeView(groupedData);
    }

    const carousel = Array.isArray(businessCarousel)
    ? businessCarousel.slice(0, 4)
    : [];
    setImgCarousel(carousel)
  }, [header, navbar, viewMenu, businessCarousel]);

  

  const listItems = [
    { title: "Food", list: getFood },
    { title: "Festival", list: getFestival },
    { title: "Beauty", list: getBeauty },
    { title: "Company", list: getImgCarousel },
  ];
  console.log(listItems);
  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleClick = (id, path) => {
    const formattedPath = capitalize(
      path.startsWith("/") ? path.replace("/", "") : path
    );
    const dynamicColorChanger = changeColor.sideBarColor
      ? changeColor.sideBarColor.filter(
          (node) => node.pageName === formattedPath
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

  const tabs = [
    {
      title: "Weather Forecast",
      content: (
        <WeatherContent
          weatherData={weatherData}
          loading={loading}
          error={error}
        />
      ),
    },
    {
      title: "Currency Converter",
      content: (
        <div className="flex w-full ">
          <div className="w-full">
            <Currency />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mt-0 lg:mt-6 flex flex-col px-6 lg:grid lg:grid-cols-9 lg:grid-rows-5 gap-4 lg:px-[6.5rem]">
      <div className="row-span-5 mt-0 lg:mt-16">
        <div className="space-y-1 hidden lg:block">
          <img
            src="https://i.pinimg.com/originals/37/8b/99/378b99936dd29a3cc185b7437be70737.jpg"
            alt=""
          />
          <img
            src="http://graphicdesignjunction.com/wp-content/uploads/2011/05/creative-advertising-2.jpg"
            alt=""
          />
          ,
        </div>
      </div>
      <div className="w-full lg:col-span-2 lg:row-span-5">
        <Blogs getBlog={getBlog} />
        <div className=" w-full lg:w-[18vw]">
          {Object.keys(groupedTreeView).map((name, index) => (
            <div key={index} className="p-2 ">
              <h3 className="font-bold text-2xl my-2 py-2 text-white bg-[#013A63] px-4 rounded-md">
                {name}
              </h3>
              <div className="w-full p-2 border rounded-lg bg-[#013A63]/5 px-4 py-6">
                <TreeView
                  treeViewContent={groupedTreeView[name]}
                  onItemClick={handleClick}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col lg:col-span-3 lg:row-span-5 lg:col-start-4">
        <div className="w-full flex flex-col gap-3 ">
          <Headlines getArticles={getArticles} getImgCarousel={getImgCarousel ? getImgCarousel : []} />
          <BusinessList listItems={listItems} />
        </div>
      </div>
      <div className="hidden w-full lg:flex flex-col lg:col-span-2 lg:row-span-5 lg:col-start-7">
        <h1 className="text-center w-full lg:text-start text-2xl lg:text-4xl p-2 fira-sans-bold text-[#013A63]">
          Digital Clock
        </h1>
        <div className="z-10 flex shadow border-2 w-full h-auto ">
          <div className="w-full p-4 ">
            <DigitalClock />
            <CustomTabs tabs={tabs} />
          </div>
        </div>
        <Rightads
          selectedDate={selectedDate}
          handleDateSelect={handleDateSelect}
          socialContent={socialContent}
        />
      </div>
      <div className="row-span-5 col-start-9">
        {/* advertisements side images here */}
        <div className="space-y-1 hidden lg:block  mt-14">
          <img
            src="https://i.pinimg.com/originals/37/8b/99/378b99936dd29a3cc185b7437be70737.jpg"
            alt=""
          />
          <img
            src="http://graphicdesignjunction.com/wp-content/uploads/2011/05/creative-advertising-2.jpg"
            alt=""
          />
          ,
        </div>
      </div>
    </div>
  );
};
