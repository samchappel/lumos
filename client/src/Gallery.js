import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Comments from './Comments';
import AddComment from './AddComment';
import DeletePhoto from './DeletePhoto';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Gallery({ userId, isLoggedIn }) {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();

  console.log('isLoggedIn:', isLoggedIn);

  const handleAddPhoto = () => {
    navigate('/add');
  };

  const handleAddComment = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseAddComment = () => {
    setSelectedPhoto(null);
  };

  const handleDeletePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
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

  if (!isLoggedIn) {
    return (
      <div>
        <p>Please log in to interact with the Lumos Community!</p>
        <Link to="/path/to/destination">
          <button className="btn btn-outline btn-accent">Log In or Sign Up!</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <button className="btn btn-outline btn-primary" onClick={handleAddPhoto}>Add To Gallery</button>
      {error && <p>{error}</p>}
      <div className="flex flex-wrap">
        {photos.map(photo => (
          <div key={photo.id} className="card w-96 bg-base-100 shadow-xl m-4">
            {/* <img src={photo.image} alt={photo.caption} onClick={() => navigate(`/photos/${photo.id}`, { state: { photo, userId, handleDeletePhoto, handleAddComment, selectedPhoto, setComments, handleCloseAddComment, photos } })} /> */}
            <img src={photo.image} alt={photo.caption} />
            <div className="card-body">
              <h2 className="card-title">{photo.caption}</h2>
              <p><strong>Photo by: {photo.user.first_name} {photo.user.last_name}</strong></p>
              <Comments photoId={photo.id} userId={userId} onAddComment={() => handleAddComment(photo)} />
              {selectedPhoto && selectedPhoto.id === photo.id && (
                <AddComment
                  photoId={selectedPhoto.id}
                  userId={userId}
                  setComments={setComments}
                  onCancel={handleCloseAddComment}
                />
              )}
              {photo.user.id === userId && (
                <DeletePhoto photo={photo} onDelete={handleDeletePhoto} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   isLoggedIn: state.user.isLoggedIn,
// });

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(mapStateToProps)(Gallery);