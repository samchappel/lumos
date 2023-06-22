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
      <div className="card w-full bg-base-200 shadow-xl mb-8">
        <div className="card-body text-center">
            <h2 className="text-2xl mb-2">Today</h2>
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
                <div className="mb-1 quality-data flex flex-col items-center">
                    {qualityData.features.map((feature, index) => (
                        <div key={index} className="mb-4 p-6 rounded-lg text-center"> {/* Increased padding */}
                        <p className="text-lg font-bold mb-2">Next Event: {feature.properties.type}</p>
                        <p className="mb-2">Quality: {feature.properties.quality}</p> {/* Added margin-bottom */}
                        <p className="mb-4">Quality Percent: {feature.properties.quality_percent}</p> {/* Added margin-bottom */}
                        <button className="btn btn-xs btn-outline btn-primary mb-2" onClick={()=>window.my_modal_4.showModal()}>View Quality Prediction Details</button> {/* Added margin-bottom */}
                        <dialog id="my_modal_4" className="modal">
                            <form method="dialog" className="modal-box">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                <h3 className="font-bold text-lg">Quality Prediction Descriptions</h3>
                                <p className="py-4"><QualityPredictionsTable/></p>
                            </form>
                        </dialog>
                        <p className="mt-2 text-xs font-light">*Please Note: sunrise and sunset quality predictions update periodically throughout the day and aren't always perfect.*</p> {/* Added margin-top */}
                    </div>
                    ))}
                </div>
            ) : (
                <p>Loading quality predictions data...</p>
            )}
        </div>
    </div>
    {weatherData ? (
  <>
    <div className="mb-8 weather-data">
      <div className="card w-180 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Current Weather</h2>
          <div className="mt-4">
            <p>Temperature: {weatherData.forecast[0].temperature}&deg;F</p><br/>
            {/* <p className="text-lg font-bold mb-2 mt-4">Feels Like:</p>
            <p>{weatherData.forecast[0].temperatureHeatIndex}</p> */}
            <p>Weather: {weatherData.forecast[0].shortForecast}</p><br/>
            <p>Description: {weatherData.forecast[0].detailedForecast}</p><br />
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
                  <img src={`/${hourlyData.shortForecast}.png`} alt={hourlyData.shortForecast} className="w-8 h-8 mr-2" />
                  <p>{hourlyData.temperature}&deg;F</p>
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