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

        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dailyForecast = [];

        // Get the current date
        const today = new Date();

        // Iterate through the API response to get one forecast per day for the next 7 days
        for (let i = 0; i < 7; i++) {
          const dayIndex = (today.getDay() + i) % 7;
          const forecastForDay = response.data.list.filter((entry) => {
            const forecastDate = new Date(entry.dt * 1000);
            return forecastDate.getDate() === today.getDate() + i;
          })[0]; // Get the first forecast of the day

          if (forecastForDay) {
            dailyForecast.push({
              day: daysOfWeek[dayIndex],
              date: new Date(forecastForDay.dt * 1000).toLocaleDateString(),
              temperature: forecastForDay.main.temp,
              condition: forecastForDay.weather[0].description,
              iconUrl: `http://openweathermap.org/img/wn/${forecastForDay.weather[0].icon}.png`,
            });
          }
        }

        const currentWeather = response.data.list[0];

        setWeatherData({
          location: response.data.city.name,
          temperature: currentWeather.main.temp,
          condition: currentWeather.weather[0].description,
          iconUrl: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`,
          sunrise: new Date(
            currentWeather.sys.sunrise * 1000
          ).toLocaleTimeString(),
          sunset: new Date(
            currentWeather.sys.sunset * 1000
          ).toLocaleTimeString(),
          weeklyForecast: dailyForecast,
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
