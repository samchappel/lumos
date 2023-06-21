import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import TodaysDate from './TodaysDate';
import QualityPredictionsTable from './QualityPredictionsTable';

function Results({ city, state }) {
  const [sunData, setSunData] = useState(null);
  const [qualityData, setQualityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const modalRef = useRef(null);
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

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Results for {city && state ? `${city}, ${state}` : 'Loading location...'}</h1>
      <h2 className="text-center text-2xl mb-2">Today</h2>
      <h3 className="text-center mb-8"><TodaysDate/></h3>
      {sunData ? (
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <img src="/1.png" alt="Sunrise" style={{ width: '200px', height: '150px' }} />
            <p className="text-center">Sunrise: {sunData.sunrise}</p>
            <p className="text-center">Golden Hour: {sunData.golden_hour}</p>
          </div>
          <div className="flex flex-col items-center">
            <img src="/2.png" alt="Sunset" style={{ width: '200px', height: '150px' }} />
            <p className="text-center">Sunset: {sunData.sunset}</p>
            <p className="text-center">Day Length: {sunData.day_length} Hours</p>
          </div>
        </div>
      ) : (
        <p>Loading sun data...</p>
      )}
      {qualityData ? (
        <div className="mb-8 quality-data flex items-center justify-center">
          {qualityData.features.map((feature, index) => (
            <div key={index} className="mb-4 p-4 rounded-lg shadow-md text-center">
              <p className="text-lg font-bold mb-2">Next Event: {feature.properties.type}</p>
              <p>Quality: {feature.properties.quality}</p>
              <p>Quality Percent: {feature.properties.quality_percent}</p>
              <button className="btn btn-xs btn-outline btn-primary" onClick={()=>window.my_modal_4.showModal()}>View Quality Prediction Details</button>
              <dialog id="my_modal_4" className="modal">
                <form method="dialog" className="modal-box">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  <h3 className="font-bold text-lg">Quality Prediction Descriptions</h3>
                  <p className="py-4"><QualityPredictionsTable/></p>
                </form>
              </dialog>
              <p>*Please Note: sunrise and sunset quality predictions update periodically throughout the day and aren't always perfect.*</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading quality predictions data...</p>
      )}
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