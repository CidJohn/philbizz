import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_WEATHER;
const BASE_URL = process.env.REACT_APP_API_WEATHER_URL;

export const useWeather = (lat, lon) => {
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
            lat,
            lon,
            appid: API_KEY,
            units: "metric", // Change to 'imperial' for Fahrenheit
          },
        });

        const currentWeather = response.data.list[0];
        const weeklyForecast = response.data.list.slice(1, 8).map((entry) => ({
          day: new Date(entry.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          temperature: entry.main.temp,
          condition: entry.weather[0].description,
          iconUrl: `http://openweathermap.org/img/wn/${entry.weather[0].icon}.png`,
        }));

        setWeatherData({
          location: response.data.city.name, // Adjust according to actual response
          temperature: currentWeather.main.temp,
          condition: currentWeather.weather[0].description,
          iconUrl: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`,
          sunrise: new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString(),
          weeklyForecast,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchWeather();
    }
  }, [lat, lon]);

  return { weatherData, loading, error };
};
