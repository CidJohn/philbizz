// src/components/WeatherCard.js

import React from "react";
import PropTypes from "prop-types";

const Weather = ({ location, temperature, condition, iconUrl }) => {
  return (
    <div className="w-[700px] lg:w-[200px] bg-white shadow-md rounded-lg overflow-hidden ">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">{location}</h2>
        <img
          src={`http://openweathermap.org/img/wn/${iconUrl}.png`}
          alt={condition}
          className="w-16 h-16 mx-auto"
        />
        <p className="text-xl font-semibold text-gray-600">{temperature}°C</p>
        <p className="text-lg text-gray-500">{condition}</p>
      </div>
    </div>
  );
};

Weather.propTypes = {
  location: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  condition: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
};

export default Weather;
