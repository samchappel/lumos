import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LocationsCard({ location }) {
  const { name, city, state, image, id, latitude, longitude, timezone } = location;

  const baseUrl = "https://api.sunrisesunset.io/json?";
//   const endUrl = "&date=today";

  const [sunriseData, setSunriseData] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}lat=${latitude}&lng=${longitude}`)
      .then(response => response.json())
      .then(data => setSunriseData(data))
      .catch(error => console.error('Error fetching sunrise data:', error));
  }, []);

  return (
    <li className="card">
      <div className="image">
        <Link to={`/locations/${id}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className="center">
        <h3 className="name">{name}</h3>
        <h4>{city}, {state}</h4>
        {sunriseData && (
          <>
            <p>Sunrise: {sunriseData.results.sunrise}</p>
            <p>Sunset: {sunriseData.results.sunset}</p>
            <p>Golden Hour: {sunriseData.results.golden_hour}</p>
            <p>Day Length: {sunriseData.results.day_length} Hours</p>
          </>
        )}
      </div>
    </li>
  );
}

export default LocationsCard;