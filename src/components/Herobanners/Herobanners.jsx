import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import Card from "../Card/Card";
import Weather from "../Weather/Weather";
import { useWeather } from "../../helper/fetchAPI/useWeather";
import useGeolocation from "../../helper/fetchAPI/useGeolocation";
import GeolocationComponent from "../GeolocationComponent/GeolocationComponent";

const Herobanners = () => {
  const [currentTimePHT, setCurrentTimePHT] = useState("");
  const [currentTimeKST, setCurrentTimeKST] = useState("");
  const [currentTimeJST, setCurrentTimeJST] = useState("");
  const [selectedOption, setSelectedOption] = useState("Philippines");
  const [getLat, setLat] = useState();
  const [getLan, setLan] = useState();
  const { t } = useTranslation();
  const { location } = useGeolocation();
  const { weatherData, loading, error } = useWeather(getLat, getLan);

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
    const getlat = location ? location.lat : "";
    setLat(getlat);
    const getlan = location ? location.lon : "";
    setLan(getlan);

    return () => clearInterval(interval);
  }, [location]);

  const options = [
    { value: "phil", label: "Philippines" },
    { value: "korea", label: "Korea" },
    { value: "japan", label: "Japan" },
  ];

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const selectResult = selectedOption ? selectedOption : "";

  return (
    <div>
      <GeolocationComponent />
      <div className="flex flex-wrap">
        <div className="  flex flex-col items-center justify-center gap-3">
          {weatherData && (
            <Weather
              location={weatherData.location}
              temperature={weatherData.temperature}
              condition={weatherData.condition}
              iconUrl={weatherData.iconUrl}
            />
          )}
          <input
            type="text"
            // value={city}
            onChange={handleCityChange}
            placeholder="Enter city"
            className="justify-between w-[200px]  text-gray-900 focus:ring-4 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          />
          {loading && <p>Loading weather data...</p>}
          {error && <p className="text-red-500">Error fetching weather data</p>}
        </div>
        <div className="">
          <Card
            src={
              "https://www.rockstarktvmanila.com/wp-content/uploads/2022/12/deluxe-1-maroon-5-600x600.jpg"
            }
            alt="Left Image"
            className="w-auto h-full object-cover"
            hidden={true}
            title={"Advertisement"}
          />
        </div>
        <div className="flex flex-col py-5 items-center border">
          <div
            className={`${
              selectResult === "Philippines" ? "block" : "hidden"
            } border-4 border-red-500 rounded-lg px-10 py-5 text-center bg-slate-950 transform transition-transform duration-500 hover:scale-105`}
          >
            <span className="text-sm md:text-2xl font-bold text-red-500">
              {currentTimePHT}
            </span>
            <span className="block text-gray-300 font-bold">
              {t("Philippines")}
            </span>
          </div>
          <div
            className={`${
              selectResult === "Korea" ? "block" : "hidden"
            } border-4 border-red-500 rounded-lg px-10 py-5 text-center bg-slate-950 transform transition-transform duration-500 hover:scale-105`}
          >
            <span className="text-sm md:text-2xl font-bold text-red-500">
              {currentTimeKST}
            </span>
            <span className="block text-gray-300 font-bold">{t("Korea")}</span>
          </div>
          <div
            className={`${
              selectResult === "Japan" ? "block" : "hidden"
            } border-4 border-red-500 rounded-lg px-10 py-5 text-center bg-slate-950 transform transition-transform duration-500 hover:scale-105`}
          >
            <span className="text-sm md:text-2xl font-bold text-red-500">
              {currentTimeJST}
            </span>
            <span className="block text-gray-300 font-bold">{t("Japan")}</span>
          </div>
          <div className="flex p-2">
            <div className="z-50 flex transform transition-transform duration-500 hover:scale-105 block">
              <Dropdown
                name={"selection"}
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder={selectedOption}
                width="200px"
                selectWidth={"200px"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herobanners;
