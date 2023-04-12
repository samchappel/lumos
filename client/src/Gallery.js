import React, { useState, useEffect } from 'react';
import Comments from './Comments';

function Gallery({ userId }) {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = () => {
    fetch(`/photos?user_id=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        return response.json()
      })
      .then(setPhotos)
      .catch(error => {
        console.error('Error fetching data:', error)
        setError(error.message)
      });
  }

  return (
    <div>
      {error && <p>{error}</p>}
      {photos.map(photo => (
        <div key={photo.id}>
          <img src={photo.image} alt={photo.caption} />
          <p>{photo.caption}</p>
          <Comments photoId={photo.id} userId={userId} />
        </div>
      ))}
    </div>
  );
}

export default Gallery;