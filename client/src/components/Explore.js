import React, { useState, useEffect } from "react";
import FormattedDate from './FormattedDate';
import LocationsCard from './LocationsCard';
import ExploreSearch from './ExploreSearch';
import { connect } from 'react-redux';
import { setLocationData, setLocations, updateFavoriteStatus, setFavorites } from '../redux/actions';

function Explore({ locations, setLocations, favorites, setFavorites, updateFavoriteStatus }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [view, setView] = useState("all");
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    setLoading(true); // Start loading before fetch operation
    fetch(`/userfavorites`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        return response.json();
      })
      .then(favorites => {
        console.log('Fetched favorites:', favorites); // Add a console log here
        console.log('Locations at the moment of fetching favorites:', locations); // Add a console log here
        setFavorites(favorites); // Dispatch the action to update the favorites state
        setLoading(false); // End loading after updating favorites
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false); // End loading in case of error
      });
  }, [setFavorites]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const allLocations = locations.filter((location) => {
    const name = location.name.toLowerCase();
    const city = location.city.toLowerCase();
    const state = location.state.toLowerCase();
    const search = searchTerm.toLowerCase();
  
    return name.includes(search) || city.includes(search) || state.includes(search);
  });
  
  let filteredLocations;

  if (view === 'favorites') {
    filteredLocations = allLocations.filter(location =>
      favorites ? favorites.some(favorite => favorite.location_id === location.id) : false
    );
  } else {
      filteredLocations = allLocations;
  }

  const handleRemoveFavorite = (favoriteId) => {
    fetch(`/userfavorites/${favoriteId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error removing favorite: ${response.status}`);
        }
        setFavorites(prevFavorites =>
          prevFavorites.filter(favorite => favorite.location_id !== favoriteId)
        );
      })
      .catch(error => {
        console.error('Error removing favorite:', error);
      });
  };

  const locationCards = filteredLocations.map(location => (
    <LocationsCard
      key={location.id}
      location={location}
      setLocations={setLocations}
      favorites={favorites}
      updateFavoriteStatus={updateFavoriteStatus}
      removeFavorite={handleRemoveFavorite}
    />
  ));

  return (
    <>
      <h2 className="text-center text-2xl my-4">Explore Sunrise & Sunset Times in National Parks</h2>
      <FormattedDate />
      <div className="collapse bg-background text-center mb-4">
        <input type="checkbox" />
        <div className="collapse-title text-l text-secondary font-medium">
          Click here to view a few notes on this data
        </div>
        <div className="collapse-content text-secondary">
          <ul className="list-disc list-inside">
            <li>All sunrise and sunset data is dynamically updated daily to ensure you have the most accurate and current information.</li>
            <li>All times are displayed in each park's local timezone.</li>
            <li>To view the local timezones corresponding to a park, simply hover over the displayed times.</li>
          </ul>
        </div>
      </div>
      <button onClick={() => setView('all')}>All</button>
      <button onClick={() => setView('favorites')}>Favorites</button>
      <ExploreSearch searchTerm={searchTerm} updateSearchTerm={handleSearch} />
      <div className="flex flex-wrap justify-center p-5 mb-5 pb-8">
        {filteredLocations.length === 0
          ? <p>You haven't select any favorites. Start exploring!</p>
          : locationCards}
      </div>
    </>
  )
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites
  };
}

const mapDispatchToProps = {
  setLocations,
  updateFavoriteStatus,
  setFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);