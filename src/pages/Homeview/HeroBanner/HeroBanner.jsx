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

export const HeroBanner = ({ blogData }) => {
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

  useEffect(() => {
    const articles = getNewsData ? getNewsData.articles : [];
    setArticles(articles);

    const getlat = location ? location.lat : "";
    setLat(getlat);
    const getlan = location ? location.lon : "";
    setLan(getlan);

    if (blogData) {
      const filterBlog = blogData ? blogData.slice(0, 2) : [];
      setBlog(filterBlog);
    }

    const filterTypes = header.filter((item) => item.types && item.title);
    setImgCarousel(filterTypes);
  }, [location, getNewsData, blogData]);

  return (
    <div className='w-full flex flex-col px-6 lg:grid lg:grid-cols-8 lg:grid-rows-5 gap-4 lg:px-60 mt-10'>
      <div className='w-full lg:col-span-2 lg:row-span-5'>
        <Blogs getBlog={getBlog} />
      </div>
      <div className='w-full flex flex-col lg:col-span-4 lg:row-span-5 lg:col-start-3'>
        {" "}
        <div className='w-full flex flex-col gap-3 '>
          <Headlines
            getArticles={getArticles}
            getImgCarousel={getImgCarousel}
          />
          <WeatherContent
            weatherData={weatherData}
            loading={loading}
            error={error}
          />
        </div>
      </div>
      <div className='w-full flex flex-col lg:col-span-2 lg:row-span-5 lg:col-start-7'>
        <h1 className='text-center w-full lg:text-start text-2xl lg:text-4xl p-2 fira-sans-bold text-[#013A63]'>
          Digital Clock
        </h1>
        <div className='z-20 flex shadow border-2 w-full '>
          <div className='w-full '>
            <DigitalClock />
          </div>
        </div>
        <h1 className='text-center w-full lg:text-start text-2xl lg:text-4xl p-2 fira-sans-bold text-[#013A63]'>
          Currency Converter
        </h1>
        <div className='flex w-full '>
          <div className='w-full'>
            <Currency />
          </div>
        </div>
      </div>
    </div>
  );
};
