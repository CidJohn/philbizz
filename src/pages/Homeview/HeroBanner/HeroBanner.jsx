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
import useBlogSettings from "../../../helper/database/useBlogSettings";
import restAPI from "../../../helper/database/restAPI";
import Image from "../../../components/Image/Image";

export const HeroBanner = ({ blogData }) => {
  const [getArticles, setArticles] = useState([]);
  const [getLat, setLat] = useState();
  const [getLan, setLan] = useState();
  const [getBlog, setBlog] = useState([]);

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
  }, [location, getNewsData, blogData]);

  return (
    <div className={`flex  flex-col lg:flex-row  gap-3 `}>
      {" "}
      <div className="flex flex-col-reverse lg:flex-row min-w-80 gap-3">
        <div className="flex flex-wrap justify-center border-gray-300 hover:border-blue-300 rounded-lg shadow-r p-2  border-2 lg:max-w-80">
          {getBlog
            ? getBlog.map((item, index) => (
                <div
                  key={index}
                  className="transform transition-transform duration-500 hover:scale-105 p-3  max-w-96 md:min-w-80"
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
        <div className="flex flex-col p-5 gap-3 min-w-80   border-gray-300 hover:border-red-300  border-2 rounded-lg ">
          <div className="flex flex-col transform transition-transform duration-500 hover:scale-105">
            <h1 className="text-4xl font-serif m-2 font-bold">News Updates</h1>

            {getArticles.length > 0 ? (
              <NewsFeed articles={getArticles} />
            ) : (
              cardContent.map((item, index) => (
                <div
                  key={index}
                  className="flex p-5 border-b-2 rounded-lg items-center transform transition-transform duration-500 hover:scale-105"
                >
                  <Images src={item.images} style={{ width: "150px" }} />
                  <div className="p-2">
                    <h1 className="text-lg font-bold">{item.title}</h1>
                    <span className="text-sx">{item.desc}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex flex-col transform transition-transform duration-500 hover:scale-105 ">
            <h1 className="text-4xl font-serif m-2 font-bold">
              Weather Forecast
            </h1>
            <div className="flex flex-col p-2 ">
              {weatherData && (
                <Weather
                  location={weatherData.location}
                  temperature={weatherData.temperature}
                  condition={weatherData.condition}
                  iconUrl={weatherData.iconUrl}
                  weeklyForecast={weatherData.weeklyForecast} // Passing the weekly forecast data
                />
              )}

              {loading && <p>Loading weather data...</p>}
              {error && (
                <p className="text-red-500">Error fetching weather data</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex md:flex-col  lg:px-3 border-gray-300 hover:border-green-300 border-2  rounded-lg  gap-5 lg:min-w-80 py-5 ">
        <div className="z-20 flex mx-auto  rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105 ">
          <DigitalClock />
        </div>
        <div className="flex transform transition-transform duration-500 hover:scale-105 ">
          <Currency />
        </div>
      </div>
    </div>
  );
};
