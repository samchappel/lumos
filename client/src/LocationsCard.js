import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

function LocationsCard({ location }) {
  const { name, city, state, image, id, latitude, longitude, timezone } = location;

  const baseUrl = "https://api.sunrisesunset.io/json?";

  const [sunriseData, setSunriseData] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}lat=${latitude}&lng=${longitude}`)
      .then(response => response.json())
      .then(data => setSunriseData(data))
      .catch(error => console.error('Error fetching sunrise data:', error));
  }, []);

  return (
    <div className="location-card-wrapper">
      <div className="card card-compact w-96 bg-primary-color shadow-xl" style={{ marginRight: '20px' }}>
        {/* <Link to={`/locations/${id}`}> */}
        <img src={image} alt={name} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '350px', height: '300px', objectFit: 'cover' }} />
        {/* </Link> */}
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2 className="card-title">{name}</h2>
          <h3>{city}, {state}</h3>
          {sunriseData && (
            <>
              <p><strong>Sunrise:</strong> {sunriseData.results.sunrise}</p>
              <p><strong>Sunset:</strong> {sunriseData.results.sunset}</p>
              <p><strong>Golden Hour:</strong> {sunriseData.results.golden_hour}</p>
              <p><strong>Day Length:</strong> {sunriseData.results.day_length} Hours</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default LocationsCard;