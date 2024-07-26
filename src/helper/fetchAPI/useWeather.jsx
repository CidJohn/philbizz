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
        console.log(response);
        // Example: Selecting the first entry from the list
        const weatherEntry = response.data.list[0];

        setWeatherData({
          location: response.data.city.name, // Adjust according to actual response
          temperature: weatherEntry.main.temp,
          condition: weatherEntry.weather[0].description,
          iconUrl: `http://openweathermap.org/img/wn/${weatherEntry.weather[0].icon}.png`,
          sunrise: new Date(
            weatherEntry.sys.sunrise * 1000
          ).toLocaleTimeString(),
          sunset: new Date(weatherEntry.sys.sunset * 1000).toLocaleTimeString(),
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
