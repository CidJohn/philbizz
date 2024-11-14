import Weather from "../../../../components/Weather/Weather";

export default function WeatherContent({ weatherData, loading, error }) {
  return (
    <div className='w-full flex flex-col  h-full bg-[#013A63]/5 p-4 '>
      <h1 className='text-center w-full lg:text-start text-2xl lg:text-4xl p-2 fira-sans-bold text-[#013A63]'>
        Weather Forecast
      </h1>
      <div className='w-full flex flex-col p-2'>
        {weatherData && (
          <Weather
            location={weatherData.location}
            temperature={weatherData.temperature}
            condition={weatherData.condition}
            iconUrl={weatherData.iconUrl}
            weeklyForecast={weatherData.weeklyForecast}
          />
        )}
        {loading && <p>Loading weather data...</p>}
        {error && <p className='text-red-500'>Error fetching weather data</p>}
      </div>
    </div>
  );
}
