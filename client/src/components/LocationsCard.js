import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setLocationData, updateFavoriteStatus } from '../redux/actions';
import pinIcon from '../assets/pin_icon.jpg';
import pinIconActive from '../assets/pin_icon_clicked.jpg';

function LocationsCard({ location, favorites }) {
  const { id, name, city, state, image, latitude, longitude, timezone } = location;
  const [sunriseData, setSunriseData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(favorites.some(favorite => favorite.id === id));

  const baseUrl = "https://api.sunrisesunset.io/json?";

  useEffect(() => {
    fetch(`${baseUrl}lat=${latitude}&lng=${longitude}`)
      .then(response => response.json())
      .then(data => {
        setSunriseData(data);
      })
      .catch(error => console.error('Error fetching sunrise data:', error));
  }, [latitude, longitude]);

  useEffect(() => {
    const localFavorite = localStorage.getItem(`favorite_${id}`);
    if (localFavorite !== undefined && localFavorite !== null && localFavorite !== "undefined" && JSON.parse(localFavorite) !== isFavorite) {
      setIsFavorite(JSON.parse(localFavorite));
    }
  }, [id, isFavorite]);

  const handleFavoriteClick = () => {
    fetch(`/userfavorites/toggle?location_id=${id}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const updatedIsFavorite = data.is_favorite;

        updateFavoriteStatus(id, updatedIsFavorite);
        setIsFavorite(updatedIsFavorite);

        localStorage.setItem(`favorite_${id}`, JSON.stringify(updatedIsFavorite));
      })
      .catch(error => {
        console.error('Error toggling favorite status:', error);
      });
  };

  return (
    <div className="location-card-wrapper" style={{ marginBottom: '30px' }}>
      <div className="card card-compact w-96 bg-primary-color shadow-xl flex justify-center items-center" style={{ marginRight: '20px' }}>
        <img src={image} alt={name} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '350px', height: '300px', objectFit: 'cover' }} />
        <div className="card-body flex flex-col items-center">
          <div className="flex justify-center items-center">
            <h2 className="card-title text-center">{name}</h2>
            <div className="relative group">
              <img
                src={isFavorite ? pinIconActive : pinIcon}
                alt="Favorite"
                style={{ width: '60px', height: '60px' }}
                className={`cursor-pointer ${isFavorite ? 'active' : ''}`}
                onClick={handleFavoriteClick}
              />
              <div className="absolute top-12 right-700 bg-primary text-white text-xs invisible group-hover:visible p-2 rounded w-24 h-22 flex items-center justify-center">
                {isFavorite ? "Click me to remove this spot from your favorites" : "Click me to add this spot to your favorites"}
              </div>
            </div>
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

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  setLocationData,
  updateFavoriteStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsCard);