import React, { useState, useEffect } from 'react';
import FavoritesCard from './FavoritesCard';
import FormattedDate from './FormattedDate';

function Favorites({ user }) {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      {user ? (
        <>
          <h2 className="text-center text-2xl my-4">View Your Favorite Locations At-A-Glance</h2>
          <FormattedDate />
          <div className="flex flex-wrap justify-center p-5 mb-5 pb-8">
            {favorites.map(favorite => (
              <FavoritesCard key={favorite.id} favorite={favorite} />
            ))}
          </div>
        </>
      ) : (
        <p>Please log in to see your favorites.</p>
      )}
    </div>
  );
}

export default Favorites;