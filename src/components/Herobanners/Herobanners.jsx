import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Weather from "../Weather/Weather";
import { useWeather } from "../../helper/fetchAPI/useWeather";
import useGeolocation from "../../helper/fetchAPI/useGeolocation";
import DigitalClock from "../DigitalClock/DigitalClock";

const Herobanners = () => {
  const [getLat, setLat] = useState();
  const [getLan, setLan] = useState();
  const { t } = useTranslation();
  const { location } = useGeolocation();
  const { weatherData, loading, error } = useWeather(getLat, getLan);

  useEffect(() => {
    const getlat = location ? location.lat : "";
    setLat(getlat);
    const getlan = location ? location.lon : "";
    setLan(getlan);
  }, [location]);

  const options = [
    { value: "phil", label: "Philippines" },
    { value: "korea", label: "Korea" },
    { value: "japan", label: "Japan" },
  ];

  // const handleCityChange = (e) => {
  //   setCity(e.target.value);
  // };

  return (
    <div>
      <div className="flex flex-row">
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
        <div className="flex transform transition-transform duration-500 hover:scale-105 p-10">
          <div className="flex flex-col items-center justify-center mx-auto gap-3 border p-10 shadow-md rounded-lg ">
            <DigitalClock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herobanners;
