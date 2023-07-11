import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import TodaysDate from './TodaysDate';
import QualityPredictionsTable from './QualityPredictionsTable';
import {
  TiWeatherCloudy,
  TiWeatherStormy,
  TiWeatherSnow,
  TiWeatherWindy,
  TiWeatherSunny,
  TiWeatherPartlySunny,
} from 'react-icons/ti';


function Results({ city, state }) {
  const [sunData, setSunData] = useState(null);
  const [qualityData, setQualityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const { latitude, longitude } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);

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
          'Authorization': `Bearer ${process.env.REACT_APP_QUALITY_ACCESS_TOKEN}`
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

  const Modal = ({ onClose, children }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="relative bg-base-200 p-8 w-full md:w-3/4 lg:w-1/2 max-h-full overflow-y-auto rounded-lg shadow-lg">
        <button className="absolute top-4 right-4 text-xl" onClick={onClose}>✕</button>
        <div className="overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  );

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Results for {city && state ? `${city}, ${state}` : 'Loading location...'}</h1>
      <div className="card w-full bg-base-200 shadow-xl mb-8">
        <div className="card-body text-center">
            <h2 className="text-2xl mb-1">Today</h2>
            <h3 className="mb-8"><TodaysDate/></h3>
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
              <div className="mb-2 quality-data flex flex-col items-center">
                {qualityData.features.map((feature, index) => (
                  <div key={index} className="mb-4 p-6 rounded-lg text-center">
                          <p className="text-lg font-bold mb-2">Next Event: {feature.properties.type}</p>
                          <p className="mb-2">Quality: {feature.properties.quality}</p>
                          <p className="mb-4">Quality Percent: {feature.properties.quality_percent}</p>
                          <button className="btn btn-xs btn-outline btn-primary mb-2" onClick={openModal}>View Quality Prediction Details</button>
                          <p className="mt- text-xs font-light">*Please Note: sunrise and sunset quality predictions update periodically throughout the day and aren't always perfect.*</p>
                      </div>
                  ))}
              </div>
          ) : (
              <p>Loading quality predictions data...</p>
          )}
          {isModalOpen ? (
          <Modal onClose={closeModal}>
            <h2 className="text-xl font-bold mb-4">Quality Prediction Details</h2>
            <QualityPredictionsTable />
          </Modal>
        ) : null}
        </div>
    </div>
    {weatherData ? (
      <>
        <div className="mb-8 weather-data">
          <div className="card w-180 bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Current Weather</h2>
              <div className="mt-4 flex items-center">
                <div className="mr-4">
                  {weatherData.forecast[0].shortForecast === 'Sunny' && <TiWeatherSunny size={64} />}
                  {weatherData.forecast[0].shortForecast === 'Mostly Sunny' && <TiWeatherPartlySunny size={64} />}
                  {weatherData.forecast[0].shortForecast === 'Partly Cloudy' && <TiWeatherPartlySunny size={64} />}
                  {weatherData.forecast[0].shortForecast === 'Mostly Cloudy' && <TiWeatherCloudy size={64} />}
                  {weatherData.forecast[0].shortForecast === 'Cloudy' && <TiWeatherCloudy size={64} />}
                  {weatherData.forecast[0].shortForecast === 'Stormy' && <TiWeatherStormy size={64} />}
                  {weatherData.forecast[0].shortForecast === 'Snow' && <TiWeatherSnow size={64} />}
                  {weatherData.forecast[0].shortForecast === 'Windy' && <TiWeatherWindy size={64} />}
                </div>
                <div>
                  <p className="text-xl font-semibold">{weatherData.forecast[0].shortForecast}</p>
                  <p className="text-gray-500">{weatherData.forecast[0].detailedForecast}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    <div className="mb-8 hourly-weather-data">
    <div className="card w-300 bg-base-200 shadow-xl">
      <div className="card-body">
      <h2 className="card-title">Hourly Weather</h2>
          <div className="flex overflow-x-auto">
            {weatherData.hourlyForecast.slice(0, 12).map((hourlyData, index) => (
              <div key={index} className="m-2 flex-none bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg shadow-md text-white p-4 w-64">
                <h3 className="text-lg font-bold">{new Date(hourlyData.startTime).toLocaleTimeString()}</h3>
                <div className="flex items-center mt-2">
                  {hourlyData.shortForecast === 'Sunny' && <TiWeatherSunny size={24} />}
                  {hourlyData.shortForecast === 'Mostly Sunny' && <TiWeatherPartlySunny size={24} />}
                  {hourlyData.shortForecast === 'Partly Cloudy' && <TiWeatherPartlySunny size={24} />}
                  {hourlyData.shortForecast === 'Mostly Cloudy' && <TiWeatherCloudy size={24} />}
                  {hourlyData.shortForecast === 'Cloudy' && <TiWeatherCloudy size={24} />}
                  {hourlyData.shortForecast === 'Stormy' && <TiWeatherStormy size={24} />}
                  {hourlyData.shortForecast === 'Snow' && <TiWeatherSnow size={24} />}
                  {hourlyData.shortForecast === 'Windy' && <TiWeatherWindy size={24} />}
                </div>
                <p className="mt-2">{hourlyData.shortForecast}</p>
                <p className="mt-1"><i className="fas fa-wind"></i> {hourlyData.windSpeed} {hourlyData.windDirection}</p>
              </div>
            ))}
          </div>
      </div>
    </div>
  </div>
</>
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