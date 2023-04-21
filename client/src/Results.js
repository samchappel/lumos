import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

function Results({ city, state }) {
  const [sunData, setSunData] = useState(null);
  const [qualityData, setQualityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { latitude, longitude } = useParams();

  useEffect(() => {
    if (latitude && longitude) {
      fetch(`https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`)
        .then(response => response.json())
        .then(data => {
          console.log(data.results); 
          setSunData(data.results);
        })
        .catch(error => console.error('Error fetching sun data:', error));
  
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
  }, [latitude, longitude]);

  const qualityDescriptions = [
    { quality: 'Poor', percentage: '0-25%', description: 'Little to no color, with precipitation or a thick cloud layer often blocking a direct view of the sun.' },
    { quality: 'Fair', percentage: '25-50%', description: 'Some color for a short time, with conditions ranging from mostly cloudy, or hazy, to clear, with little to no clouds at all levels.' },
    { quality: 'Good', percentage: '50-75%', description: 'A fair amount of color, often multi-colored, lasting a considerable amount of time. Often caused by scattered clouds at multiple levels.' },
    { quality: 'Great', percentage: '75-100%', description: 'Extremely vibrant color lasting 30 minutes or more. Often caused by multiple arrangements of clouds at multiple levels, transitioning through multiple stages of vivid color.' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">{city && state ? `${city}, ${state}` : 'Loading location...'}</h1>
      {sunData ? (
        <div className="mb-8">
          <img src="/sunrise.png" alt="Sunrise" style={{ width: '100px', height: '75px' }} />
          <p>Sunrise: {sunData.sunrise}</p>
          <img src="/sunset.png" alt="Sunset" style={{ width: '100px', height: '75px' }} />
          <p>Sunset: {sunData.sunset}</p>
          <p>Golden Hour: {sunData.golden_hour}</p>
          <p>Day Length: {sunData.day_length} Hours</p>
        </div>
      ) : (
        <p>Loading sun data...</p>
      )}
      {qualityData ? (
        <div className="mb-8 quality-data">
          {qualityData.features.map((feature, index) => (
            <div key={index} className="mb-4 p-4 rounded-lg shadow-md">
              <p className="text-lg font-bold mb-2">Next Event: {feature.properties.type}</p>
              <p>Quality: {feature.properties.quality}</p>
              <p>Quality Percent: {feature.properties.quality_percent}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading quality predictions data...</p>
      )}
      <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Quality (%)</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>{qualityDescriptions[0].quality} ({qualityDescriptions[0].percentage})</th>
            <td>{qualityDescriptions[0].description}</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>{qualityDescriptions[1].quality} ({qualityDescriptions[1].percentage})</th>
            <td>{qualityDescriptions[1].description}</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>{qualityDescriptions[2].quality} ({qualityDescriptions[2].percentage})</th>
            <td>{qualityDescriptions[2].description}</td>
          </tr>
          {/* row 4 */}
          <tr>
            <th>{qualityDescriptions[3].quality} ({qualityDescriptions[3].percentage})</th>
            <td>{qualityDescriptions[3].description}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>Please Note: sunrise and sunset quality predictions update periodically throughout the day and aren't always perfect.</p>
    {weatherData ? (
  <div className="mb-8 weather-data">
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Current Weather</h2>
        <div className="mt-4">
          <p>Temperature: {weatherData.forecast[0].temperature}&deg;F</p><br/>
          {/* <p className="text-lg font-bold mb-2 mt-4">Feels Like:</p>
          <p>{weatherData.forecast[0].temperatureHeatIndex}</p> */}
          <p>Weather: {weatherData.forecast[0].shortForecast}</p><br/>
          <p>Description: {weatherData.forecast[0].detailedForecast}</p><br />
          <h2 className="card-title">Hourly Weather</h2>
          {weatherData.hourlyForecast.slice(0, 12).map((hourlyData, index) => (
            <div key={index} className="mb-4 p-4 rounded-lg shadow-md bg-base-100">
              <p>Time: {new Date(hourlyData.startTime).toLocaleTimeString()}</p>
              <p>Temperature: {hourlyData.temperature}&deg;F</p>
              <p>Weather: {hourlyData.shortForecast}</p>
              <p>Wind: {hourlyData.windSpeed} {hourlyData.windDirection}</p>
              <p>Description: {hourlyData.shortForecast}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
) : (
  <p>Loading weather data...</p>
)}
    </div>
  );
            }

const mapStateToProps = (state) => ({
  city: state.locationData.city,
  state: state.locationData.state
});

export default connect(mapStateToProps)(Results);