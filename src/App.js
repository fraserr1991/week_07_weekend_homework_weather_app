import './App.css';
import { useState } from 'react'
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';

import { WEATHER_API_KEY, WEATHER_API_URL } from './Api';
function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForcast] = useState(null)

  const onSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastWeatherFetch])
      .then(async (response) => {
        const awaitWeatherResponse = await response[0].json()
        const awaitForecastResponse = await response[1].json()

        setCurrentWeather({ city: searchData.label, ...awaitWeatherResponse })
        setForcast({ city: searchData.label, ...awaitForecastResponse })
      })
      .catch((err) => console.log(err))
  }

  console.log(currentWeather)
  console.log(forecast)
  return (
    <div className="container">
      <Search onSearchChange={onSearchChange} />
      {currentWeather && <CurrentWeather currentWeatherData={currentWeather} />}
      {forecast && <Forecast forecastData={forecast} />}
    </div>
  );
}

export default App;
