import React, { useState } from "react";

const Weather = (props) => {
  const { location, weather, error } = props;
  const [searchQuery, setSearchQuery] = useState("");

  // Filter function to match search query against city names
  const filteredLocations = location
    ? location.filter((loc) =>
        loc.city.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col items-center justify-center max-w-screen-md max-h-screen-md bg-blue-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Weather Forecast</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city..."
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      {filteredLocations.map((loc) => (
        <div
          key={loc.city.id}
          className="bg-white p-4 rounded shadow-md w-full max-w-md mb-4"
        >
          <h2 className="text-2xl font-semibold">
            {loc.city.name}, {loc.country.name}
          </h2>
          <p className="text-sm text-gray-500">
            Lat: {loc.location.latitude}, Lon: {loc.location.longitude}
          </p>
          {weather && (
            <div className="bg-white p-4 rounded shadow-md w-full max-w-md mt-4">
              <h2 className="text-xl font-semibold">Current Weather</h2>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity} %</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Weather;
