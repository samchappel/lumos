import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';
import AddComment from './AddComment';

function Gallery({ userId }) {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  const handleAddPhoto = () => {
    navigate('/add');
  };

  const handleAddComment = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseAddComment = () => {
    setSelectedPhoto(null);
  };

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

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div>
      <button onClick={handleAddPhoto}>Add New Photo</button>
      {error && <p>{error}</p>}
      {photos.map(photo => (
        <div key={photo.id}>
          <img src={photo.image} alt={photo.caption} />
          <p>{photo.caption}</p>
          <Comments photoId={photo.id} userId={userId} onAddComment={() => handleAddComment(photo)} />
          {selectedPhoto && selectedPhoto.id === photo.id && (
            <AddComment
              photoId={selectedPhoto.id}
              userId={userId}
              setComments={setComments}
              onCancel={handleCloseAddComment}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default Gallery;