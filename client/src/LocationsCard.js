import React, { useState, useEffect } from 'react';
import pinIcon from './assets/pin_icon.jpg';
import pinIconActive from './assets/pin_icon_clicked.jpg';

function LocationsCard({ location }) {
  const { id, name, city, state, image, latitude, longitude, timezone } = location;

  const baseUrl = "https://api.sunrisesunset.io/json?";

  const [sunriseData, setSunriseData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch(`${baseUrl}lat=${latitude}&lng=${longitude}`)
      .then(response => response.json())
      .then(data => setSunriseData(data))
      .catch(error => console.error('Error fetching sunrise data:', error));
  }, []);

  const handleFavoriteClick = () => {
    const requestBody = {
      location_id: location.id
    };

    fetch('/userfavorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error adding location to favorites: ${response.status}`);
        }
        setIsFavorite(true);
      })
      .catch(error => {
        console.error('Error adding location to favorites:', error);
      });
  };

  return (
    <div className="location-card-wrapper">
      <div className="card card-compact w-96 bg-primary-color shadow-xl" style={{ marginRight: '20px' }}>
        <img src={image} alt={name} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '350px', height: '300px', objectFit: 'cover' }} />
        <div className="card-body flex flex-col items-center">
          <div className="flex justify-center items-center">
            <h2 className="card-title text-center">{name}</h2>
            <div className="relative group">
              <img src={isFavorite ? pinIconActive : pinIcon} alt="Favorite" style={{width: '60px', height: '60px'}} className="cursor-pointer" onClick={handleFavoriteClick} />
              <div className="absolute top-12 right-700 bg-primary text-white text-xs invisible group-hover:visible p-2 rounded w-24 h-22 flex items-center justify-center">
                Psst! Click me to add this spot to your favorites
              </div>
            </div>
          </div>
          <h3>{city}, {state}</h3>
          {sunriseData && (
            <div className="tooltip tooltip-primary tooltip-right" data-tip={location.timezone}>
              <div>
                <p><strong>Sunrise:</strong> {sunriseData.results.sunrise}</p>
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
