import React from "react";
import PropTypes from "prop-types";
import Images from "../Image/Images";

const Weather = ({
  location,
  temperature,
  condition,
  iconUrl,
  weeklyForecast,
}) => {
  return (
    <div className=" bg-[#013A63] shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white fira-sans-bold">
          {location}
        </h2>
        <Images
          src={iconUrl}
          alt={condition}
          className="w-16 h-[13vh] mx-auto"
        />
        <p className="text-xl font-semibold text-gray-300 fira-sans-condensed-regular">
          {temperature}°C
        </p>
        <p className="text-lg text-gray-300 fira-sans-condensed-regular">
          {condition}
        </p>
      </div>
      <div className="px-4 py-2 bg-gray-100">
        <h3 className="text-lg font-semibold text-[#013A63] fira-sans-bold mt-2">
          Weekly Forecast
        </h3>
        <div className="flex justify-between mt-2 overflow-x-scroll ">
          {weeklyForecast
            ? weeklyForecast.map((day, index) => (
                <div key={index} className="text-center p-2">
                  <p className="text-gray-600 fira-sans-condensed-regular text-lg">
                    {day.day}
                  </p>
                  <img
                    src={day.iconUrl}
                    alt={day.condition}
                    className="w-10 h-10 mx-auto"
                  />
                  <p className="fira-sans-condensed-regular text-[#013A63]">
                    {day.temperature}°C
                  </p>
                  <p className="text-gray-500 fira-sans-condensed-regular text-sm">
                    {day.condition}
                  </p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

Weather.propTypes = {
  location: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  weeklyForecast: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
      condition: PropTypes.string.isRequired,
      iconUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Weather;
