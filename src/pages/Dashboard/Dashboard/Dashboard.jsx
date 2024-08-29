import React, { useEffect, useState } from "react";
import DigitalClock from "../../../components/DigitalClock/DigitalClock";
import Calendar from "../../../components/Calendar/Calendar";
import { useWeather } from "../../../helper/fetchAPI/useWeather";
import useGeolocation from "../../../helper/fetchAPI/useGeolocation";
import Weather from "../../../components/Weather/Weather";
import Graph from "../../../components/Graph/Graph";
import { Commentdata, Likeddata } from "../../../content/cardContent";

function Dashboard() {
  const [getLat, setLat] = useState();
  const [getLan, setLan] = useState();

  const { location } = useGeolocation();
  const { weatherData, loading, error } = useWeather(getLat, getLan);

  useEffect(() => {
    const getlat = location ? location.lat : "";
    setLat(getlat);
    const getlan = location ? location.lon : "";
    setLan(getlan);
  }, [location]);

  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl  font-bold">Dashboard</h1>
        <div className="flex flex-wrap  p-5 gap-4">
          <div className="flex flex-col border-2  border-dashed rounded-lg gap-2 items-center">
            <h1 className="text-2xl  font-bold">Blog Analysis</h1>

            <div className="flex min-w-80 p-2 rounded-lg ">
              <div className="shadow-lg rounded-lg bg-gray-100  items-center justify-center min-w-full min-h-64 p-2 transform transition-transform duration-500 hover:scale-105">
                <Graph title={"Likes"} data={Likeddata} />
              </div>
            </div>
            <div className="flex min-w-80 p-2 rounded-lg ">
              <div className="shadow-lg rounded-lg bg-gray-100  items-center justify-center min-w-full min-h-64 p-2 transform transition-transform duration-500 hover:scale-105">
                <Graph title={"Comments"} data={Commentdata} />
              </div>
            </div>
          </div>
          <div className="flex flex-col  border-2  border-dashed  min-w-64 gap-2">
            <h1 className="text-2xl  font-bold text-center">Weather </h1>
            <div className="flex  rounded-lg gap-2 ">
              <div className="flex flex-col  p-2 min-w-full transform transition-transform duration-500 hover:scale-105">
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
            <div className="flex flex-row  gap-2 ">
              <div className="flex  rounded-lg transform transition-transform duration-500 hover:scale-105">
                <Calendar />
              </div>
              <div className="flex rounded-lg transform transition-transform duration-500 hover:scale-105">
                <DigitalClock />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
