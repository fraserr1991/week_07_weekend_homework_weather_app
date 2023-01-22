import './App.css';
import { useState } from 'react'
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';

import { WEATHER_API_KEY, WEATHER_API_URL } from './Api';

function App() {
  //creates two useStates that begins null and holds the current weather and forecast details given by the API
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForcast] = useState(null)

  const onSearchChange = (searchData) => {
    //the lat and lon values from the searchData are split from one value to two, and stored in their own variables
    const [lat, lon] = searchData.value.split(" ")

    //fetches the current weather from the API, by using some fixed variables from Api.js and the values from the search function
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    //fetches the forecast weather from the API, by using some fixed variable from Api.js and the values from teh search funciton
    const forecastWeatherFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    //returns a promise once each promise inside has been completed
    Promise.all([currentWeatherFetch, forecastWeatherFetch])
    //we call a function, awaiting a response, and store the responses into variables
      .then(async (response) => {
        const awaitWeatherResponse = await response[0].json()
        const awaitForecastResponse = await response[1].json()
        //creating a spread array, we feed in a new key value, city label to both responses (don't completely understand this part)
        setCurrentWeather({ city: searchData.label, ...awaitWeatherResponse })
        setForcast({ city: searchData.label, ...awaitForecastResponse })
      })
      //error catching
      .catch((err) => console.log(err))
  }

  return (
    <div className="container">
      {/* calls the search component and stores the result of onSearchChange function in the onSearchChange prop */}
      <Search onSearchChange={onSearchChange} />
      {currentWeather && <CurrentWeather currentWeatherData={currentWeather} />}
      {forecast && <Forecast forecastData={forecast} />}
    </div>
  );
}

export default App;
