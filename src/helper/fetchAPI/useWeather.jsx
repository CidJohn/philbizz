// src/hooks/useWeather.js

import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_WEATHER;
const BASE_URL = process.env.REACT_APP_API_WEATHER_URL;
console.log(API_KEY, BASE_URL);
export const useWeather = (city) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(BASE_URL, {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric", // Change to 'imperial' for Fahrenheit
          },
        });

        // Extracting the first available data point
        const firstEntry = response.data.list[0];

        setWeatherData({
          location: response.data.city.name,
          temperature: firstEntry.main.temp,
          condition: firstEntry.weather[0].description,
          iconUrl: firstEntry.weather[0].icon,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weatherData, loading, error };
};
