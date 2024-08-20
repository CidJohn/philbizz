import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "../Card/Card";
import { useWeather } from "../../helper/fetchAPI/useWeather";
import Weather from "../Weather/Weather";
import useGeolocation from "../../helper/fetchAPI/useGeolocation";
import Images from "../Image/Images";
import cardContent from "../../content/cardContent";
import DigitalClock from "../DigitalClock/DigitalClock";
import useNewsFeed from "../../helper/fetchAPI/useNewsFeed";
import NewsFeed from "../NewsFeed/NewsFeed";

export const HeroBanner = ({ darkMode }) => {
  const [currentTimePHT, setCurrentTimePHT] = useState("");
  const [currentTimeKST, setCurrentTimeKST] = useState("");
  const [currentTimeJST, setCurrentTimeJST] = useState("");
  const [selectedOption, setSelectedOption] = useState("Philippines");
  const [getArticles, setArticles] = useState([]);
  const [getLat, setLat] = useState();
  const [getLan, setLan] = useState();
  const { t } = useTranslation();
  const { location } = useGeolocation();
  const { weatherData, loading, error } = useWeather(getLat, getLan);
  const { getNewsData } = useNewsFeed();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTimePHT(
        now.toLocaleTimeString("en-US", { timeZone: "Asia/Manila" })
      );
      setCurrentTimeKST(
        now.toLocaleTimeString("en-US", { timeZone: "Asia/Seoul" })
      );
      setCurrentTimeJST(
        now.toLocaleTimeString("en-US", { timeZone: "Asia/Tokyo" })
      );
    }, 1000);
    const articles = getNewsData ? getNewsData.articles.slice(0, 3) : [];
    setArticles(articles);

    const getlat = location ? location.lat : "";
    setLat(getlat);
    const getlan = location ? location.lon : "";
    setLan(getlan);

    return () => clearInterval(interval);
  }, [location, getNewsData]);

  return (
    <div className={`lg:flex  flex-row  gap-3  ${darkMode && "dark"}`}>
      {" "}
      <div className="flex min-w-80 gap-3">
        <div className="flex flex-col   border-gray-300 rounded-lg shadow-r p-2 min-w-80 border-2">
          <div className="transform transition-transform duration-500 hover:scale-105 p-1">
            <Card
              src={
                "https://lh3.googleusercontent.com/p/AF1QipMlprtNkiskp0-5IV_3_sKrIDneoRDwraoYfLHD=s680-w680-h510"
              }
              title={"Advertisement"}
              hidden={true}
            />
          </div>
          <div className="transform transition-transform duration-500 hover:scale-105 p-1">
            <Card
              src={
                "https://lh3.googleusercontent.com/p/AF1QipMlprtNkiskp0-5IV_3_sKrIDneoRDwraoYfLHD=s680-w680-h510"
              }
              title={"Advertisement"}
              hidden={true}
            />
          </div>
        </div>
        <div className="flex flex-col p-5 gap-3   border-gray-300  border-2 rounded-lg">
          <h1 className="text-2xl font-bold">News Updates</h1>
          <div className="flex flex-col">
            {getArticles.length > 0 ? (
              <NewsFeed articles={getArticles} />
            ) : (
              cardContent.map((item) => (
                <div className="flex p-5 border-b-2 rounded-lg items-center transform transition-transform duration-500 hover:scale-105">
                  <Images src={item.images} style={{ width: "150px" }} />
                  <div className="p-2">
                    <h1 className="text-lg font-bold">{item.title}</h1>
                    <span className="text-sx">{item.desc}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex md:flex-col justify-center  lg:px-3 border-gray-300 border-2  rounded-lg  gap-5 min-w-80 p-5">
        <h1 className=" text-2xl text-center font-bold">Digital Clock</h1>
        <div className="flex p-4 items-center mx-auto  rounded-lg shadow-md transform transition-transform duration-500 hover:scale-105">
          <DigitalClock />
        </div>
        <div className="flex transform transition-transform duration-500 hover:scale-105 ">
          <div className="flex flex-col items-center justify-center mx-auto gap-3 ">
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
  );
};
