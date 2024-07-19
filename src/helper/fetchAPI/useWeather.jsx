import { useState, useEffect } from "react";
import axios from "axios";

const useWeather = (city) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const options = {
        method: "GET",
        url: `https://forecast9.p.rapidapi.com/rapidapi/forecast/${city}`,
        headers: {
          "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
          "x-rapidapi-host": "forecast9.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        if (response.data) {
          const forecast = response.data.forecast[0]; // Assuming we take the first forecast entry
          setWeatherData({
            city: response.data.location.name,
            temperature: forecast.max_temp,
            condition: forecast.description,
            icon: `https://www.weatherbit.io/static/img/icons/${forecast.icon}.png`,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  return weatherData;
};

export default useWeather;
