import React, { useState, useEffect } from 'react';
import FavoritesCard from './FavoritesCard';
import FormattedDate from './FormattedDate';

function Favorites({ user }) {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [showDate, setShowDate] = useState(true);

  useEffect(() => {
    fetch(`/userfavorites`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        return response.json();
      })
      .then(setFavorites)
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, [user]);

  const handleRemoveFavorite = (favoriteId) => {
    fetch(`/userfavorites/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favoriteId })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error removing favorite: ${response.status}`);
        }
        setFavorites(prevFavorites =>
          prevFavorites.filter(favorite => favorite.id !== favoriteId)
        );
      })
      .catch(error => {
        console.error('Error removing favorite:', error);
      });
  };

  useEffect(() => {
    setShowDate(favorites.length > 0);
  }, [favorites]);

  return (
    <div>
      {user ? (
        <>
          <h2 className="text-center text-2xl my-4">View Your Favorite Locations At-A-Glance</h2>
          {showDate && <FormattedDate />}
          <div className="flex flex-wrap justify-center p-5 mb-5 pb-8">
            {favorites.length > 0 ? (
              favorites.map(favorite => (
                <FavoritesCard
                  key={favorite.id}
                  favorite={favorite}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              ))
            ) : (
              <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
                Get busy exploring and pick some favorites!
              </p>
            )}
          </div>
        </>
      ) : (
        <p>Please log in to see your favorites.</p>
      )}
    </div>
  );
}

export default Favorites;