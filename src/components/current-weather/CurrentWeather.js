import "./CurrentWeather.css"

const CurrentWeather = ({currentWeatherData}) => {
    return (
        <div className="weather">
        <div className="top">
            <p className="city">{currentWeatherData.city}</p>
            <p className="weather-description">{currentWeatherData.weather[0].description}</p>
        <img alt="weather" className="weather-icon" src={`icons/${currentWeatherData.weather[0].icon}.png`} />
        </div>
        <div className="bottom">
            <p className="temperature">{Math.round(currentWeatherData.main.temp)}°c</p>
            <div className="details">
                <div className="parameter-row">
                    <span className="parameter-label top">Details</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Feels like</span>
                    <span className="parameter-value">{Math.round(currentWeatherData.main.feels_like)}°c</span>
                </div>
                <div className="parameter-row">
                    <span className="parameter-label">Wind</span>
                    <span className="parameter-value">{Math.round(currentWeatherData.wind.speed)}m/s</span>
                </div>
            </div>
        </div>
    </div>
    )
}

export default CurrentWeather