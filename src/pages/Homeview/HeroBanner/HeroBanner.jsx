import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../../../components/Card/Card";
import { useWeather } from "../../../helper/fetchAPI/useWeather";
import Weather from "../../../components/Weather/Weather";
import useGeolocation from "../../../helper/fetchAPI/useGeolocation";
import Images from "../../../components/Image/Images";
import cardContent from "../../../content/cardContent";
import DigitalClock from "../../../components/DigitalClock/DigitalClock";
import useNewsFeed from "../../../helper/fetchAPI/useNewsFeed";
import NewsFeed from "../../../components/NewsFeed/NewsFeed";
import Currency from "../../../components/Currency/Currency";
import restAPI from "../../../helper/database/restAPI";
import { useHomeBusiness } from "../../../helper/database/useBusinessData";
import Imagecarousel from "../../../components/Carousel/Imagecarousel";

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
  const imagelink = restAPI();

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

    const filterTypes = header.filter((item) => item.types && item.title);
    setImgCarousel(filterTypes);
  }, [location, getNewsData, blogData]);

  return (
    <div className="flex flex-col lg:flex-row w-[75vw]  mx-auto ">
      <div className="flex flex-col-reverse lg:flex-row w-full">
        <div className="flex flex-wrap justify-center rounded-lg p-5 lg:max-w-80">
          <h1 className="text-4xl p-2 font-bold">Top Blogs</h1>
          {getBlog
            ? getBlog.map((item, index) => (
                <div
                  key={index}
                  className="transform transition-transform duration-500 hover:scale-105 p-2 max-w-96 md:min-w-80"
                >
                  <Card
                    src={imagelink.image + item.imageURL}
                    title={item.title}
                    desc={item.description}
                    link={item.title}
                    hidden={true}
                  />
                </div>
              ))
            : ""}
        </div>

        <div className="flex flex-col p-5 gap-3 w-full">
          <div className="flex flex-col">
            <h1 className="text-4xl p-2 font-bold">Top Headlines</h1>
            {getArticles.length > 0 ? (
              <NewsFeed articles={getArticles} />
            ) : (
              <div className="flex">
                <Imagecarousel images={getImgCarousel} />
              </div>
            )}
          </div>

          <div className="flex flex-col transform transition-transform duration-500 hover:scale-105">
            <h1 className="text-4xl p-2 font-bold">Weather Forecast</h1>
            <div className="flex flex-col p-2">
              {weatherData && (
                <Weather
                  location={weatherData.location}
                  temperature={weatherData.temperature}
                  condition={weatherData.condition}
                  iconUrl={weatherData.iconUrl}
                  weeklyForecast={weatherData.weeklyForecast}
                />
              )}
              {loading && <p>Loading weather data...</p>}
              {error && (
                <p className="text-red-500">Error fetching weather data</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-col lg:px-3 gap-5 lg:min-w-80 py-5 w-full">
        <h1 className=" text-2xl px-2 font-bold">Digital Clock</h1>
          <div className="z-20 flex rounded-lg shadow transform transition-transform duration-500 hover:scale-105 w-full">
            <div className="w-full">
              <DigitalClock />
            </div>
          </div>

          <h1 className="text-2xl p-2 font-bold">Currency Converter</h1>
          <div className="flex  transform transition-transform duration-500 hover:scale-105 w-full p-5">
            <div className="w-full">
              <Currency />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
