import React, { useEffect, useState } from 'react';

function LocationsCard({ location, favorites }) {
  const { name, city, state, image, latitude, longitude, timezone } = location;
  const [sunriseData, setSunriseData] = useState(null);

  const baseUrl = "https://api.sunrisesunset.io/json?";

  useEffect(() => {
    fetch(`${baseUrl}lat=${latitude}&lng=${longitude}`)
      .then(response => response.json())
      .then(data => {
        setSunriseData(data);
      })
      .catch(error => console.error('Error fetching sunrise data:', error));
  }, [latitude, longitude]);

  return (
    <div className="location-card-wrapper" style={{ marginBottom: '30px' }}>
      <div className="card card-compact w-96 bg-primary-color shadow-xl flex justify-center items-center" style={{ marginRight: '20px' }}>
        <img src={image} alt={name} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '350px', height: '300px', objectFit: 'cover' }} />
        <div className="card-body flex flex-col items-center">
          <div className="flex justify-center items-center">
            <h2 className="card-title text-center">{name}</h2>
          </div>
          <h3>{city}, {state}</h3>
          {sunriseData && (
            <div className="tooltip tooltip-primary tooltip-right" data-tip={timezone}>
              <div>
                <p><strong>Sunrise:</strong> {sunriseData.results.sunrise}</p>
                <p><strong>Sunset:</strong> {sunriseData.results.sunset}</p>
                <p><strong>Golden Hour:</strong> {sunriseData.results.golden_hour}</p>
                <p><strong>Day Length:</strong> {sunriseData.results.day_length} Hours</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default LocationsCard;