import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Results() {
  const [sunData, setSunData] = useState(null);
  const [qualityData, setQualityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const { latitude, longitude } = useParams();

  useEffect(() => {
    if (latitude && longitude) {
      // Fetch sunrise and sunset data
      fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.results); 
          setSunData(data.results);
        })
        .catch(error => console.error('Error fetching sun data:', error));

      // Fetch quality predictions data
      fetch(`https://sunburst.sunsetwx.com/v1/quality?geo=${latitude},${longitude}`, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}` 
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setQualityData(data);
        })
        .catch(error => console.error('Error fetching quality data:', error));

      // Fetch weather data
      fetch(`https://api.weather.gov/points/${latitude},${longitude}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const forecastUrl = data.properties.forecast;
          const hourlyForecastUrl = data.properties.forecastHourly;
          Promise.all([
            fetch(forecastUrl).then(response => response.json()),
            fetch(hourlyForecastUrl).then(response => response.json())
          ])
          .then(([forecastData, hourlyForecastData]) => {
            console.log(forecastData.properties.periods);
            console.log(hourlyForecastData.properties.periods);
            setWeatherData({ forecast: forecastData.properties.periods, hourlyForecast: hourlyForecastData.properties.periods });
          });
        })
        .catch(error => console.error('Error fetching weather data:', error));
    }
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
  }, [latitude, longitude]);

  return (
    <div>
      {sunData ? (
        <div>
          <p>Sunrise: {sunData.sunrise}</p>
          <p>Sunset: {sunData.sunset}</p>
          <p>Golden Hour: {sunData.golden_hour}</p>
          <p>Day Length: {sunData.day_length}</p>
        </div>
      ) : (
        <p>Loading sun data...</p>
      )}
      {qualityData ? (
        <div>
          {qualityData.features.map((feature, index) => (
            <div key={index}>
              <p>Type: {feature.properties.type}</p>
              <p>Quality: {feature.properties.quality}</p>
              <p>Quality Percent: {feature.properties.quality_percent}</p>
              <p>Quality Value: {feature.properties.quality_value}</p>
              <p>Temperature: {feature.properties.temperature}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading quality predictions data...</p>
      )}
      {weatherData ? (
        <div>
          <h2>Current Weather</h2>
          <p>Temperature: {weatherData.forecast[0].temperature}</p>
          <p>Feels Like: {weatherData.forecast[0].temperatureHeatIndex}</p>
          <p>Weather: {weatherData.forecast[0].shortForecast}</p>
          <p>Description: {weatherData.forecast[0].detailedForecast}</p>
          <h2>Hourly Weather</h2>
          {weatherData.hourlyForecast.map((hourlyData, index) => (
            <div key={index}>
              <p>Time: {new Date(hourlyData.startTime).toLocaleTimeString()}</p>
              <p>Temperature: {hourlyData.temperature}</p>
              <p>Feels Like: {hourlyData.temperatureHeatIndex}</p>
              <p>Weather: {hourlyData.shortForecast}</p>
              <p>Description: {hourlyData.detailedForecast}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

  export default Results;