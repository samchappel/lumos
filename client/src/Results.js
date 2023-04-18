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

  const handleModalOpen = () => {
    setModalIsOpen(true);
  }

  // const handleModalClose = () => {
  //   setModalIsOpen(false);
  // }

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const qualityDescriptions = [
    { quality: 'Poor', percentage: '0-25%', description: 'Little to no color, with precipitation or a thick cloud layer often blocking a direct view of the sun.' },
    { quality: 'Fair', percentage: '25-50%', description: 'Some color for a short time, with conditions ranging from mostly cloudy, or hazy, to clear, with little to no clouds at all levels.' },
    { quality: 'Good', percentage: '50-75%', description: 'A fair amount of color, often multi-colored, lasting a considerable amount of time. Often caused by scattered clouds at multiple levels.' },
    { quality: 'Great', percentage: '75-100%', description: 'Extremely vibrant color lasting 30 minutes or more. Often caused by multiple arrangements of clouds at multiple levels, transitioning through multiple stages of vivid color.' }
  ];

  return (
    <div>
      <h1>{city && state ? `${city}, ${state}` : 'Loading location...'}</h1>
      {sunData ? (
        <div>
          <p>Sunrise: {sunData.sunrise}</p>
          <p>Sunset: {sunData.sunset}</p>
          <p>Golden Hour: {sunData.golden_hour}</p>
          <p>Day Length: {sunData.day_length} Hours</p>
        </div>
      ) : (
        <p>Loading sun data...</p>
      )}
      {qualityData ? (
        <div>
          {qualityData.features.map((feature, index) => (
            <div key={index}>
              <p>Next Event: {feature.properties.type}</p>
              <p>Quality: {feature.properties.quality}</p>
              <p>Quality Percent: {feature.properties.quality_percent}</p>
              <p>Quality Value: {feature.properties.quality_value}</p>
              <p>Temperature: {feature.properties.temperature}</p>
            </div>
          ))}
          <button onClick={handleModalOpen}>See Quality Descriptions</button>
          {modalIsOpen && (
            <div className="modal">
              <button className="close-button" onClick={toggleModal}>
                X
              </button>
              <h2>Quality Descriptions</h2>
              <table>
                <thead>
                  <tr>
                    <th>Quality (%)</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {qualityDescriptions.map((description, index) => (
                    <tr key={index}>
                      <td>{description.quality}</td>
                      <td>{description.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
          {weatherData.hourlyForecast.slice(0, 12).map((hourlyData, index) => (
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

const mapStateToProps = (state) => ({
    city: state.locationData.city,
    state: state.locationData.state,
  });
  
  export default connect(mapStateToProps)(Results);