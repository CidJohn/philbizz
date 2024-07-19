import axios from "axios";
import React, { useEffect, useState } from "react";

const useGeolocation = (cityName) => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchLocation = async () => {
      const locationOptions = {
        method: "GET",
        url: "https://ip-geo-location4.p.rapidapi.com/",
        params: { format: "json" },
        headers: {
          "x-rapidapi-key":
            "27fea8c926msh193375031ff63fap1d9b15jsn8fd10704b156",
          "x-rapidapi-host": "ip-geo-location4.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(locationOptions);
        setLocation(response.data);
        if (cityName) {
          const cityData = response.data.cities.find(
            (city) => city.city.name.toLowerCase() === cityName.toLowerCase()
          );
          if (cityData) {
            fetchWeather(
              cityData.location.latitude,
              cityData.location.longitude
            );
          } else {
            setError(`City '${cityName}' not found.`);
          }
        } else {
          fetchWeather(
            response.data.location.latitude,
            response.data.location.longitude
          );
        }
      } catch (error) {
        setError("Failed to fetch location data.");
      }
    };

    const fetchWeather = async (lat, lon, retries = 3) => {
      const weatherOptions = {
        method: "GET",
        url: "https://yahoo-weather5.p.rapidapi.com/weather",
        params: {
          lat: lat,
          long: lon,
          format: "json",
          u: "f",
        },
        headers: {
          "x-rapidapi-key":
            "27fea8c926msh193375031ff63fap1d9b15jsn8fd10704b156",
          "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(weatherOptions);
        setWeather(response.data);
      } catch (error) {
        setError("Failed to fetch weather data.");
      }
    };

    fetchLocation();
  }, [cityName]); // Dependency array to re-fetch when cityName changes

  return { location, weather, error };
};

export default useGeolocation;
