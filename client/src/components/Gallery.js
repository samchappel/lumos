import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GalleryModal from './GalleryModal';
import GalleryHover from './GalleryHover';

function Gallery({ userId, isLoggedIn }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photosProp, setPhotosProp] = useState([]);

  const navigate = useNavigate();

  const handleAddPhoto = () => {
    navigate('/add');
  };

  useEffect(() => {
    const fetchPhotos = () => {
      fetch(`/photos?user_id=${userId}`)
        .then(response => {
          if (!response.ok) {
            console.error(`Error fetching data: ${response.status}`);
            return;
          }
          return response.json()
        })
        .then(data => {
          setPhotosProp(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };
    fetchPhotos();
  }, [userId]);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleDeletePhoto = (photoId) => {
    setPhotosProp(photosProp.filter(photo => photo.id !== photoId));
  };

  if (!isLoggedIn) {
    return (
      <div>
        <p>Please log in to interact with the Lumos Community!</p>
        <Link to="/login">
          <button className="btn btn-outline btn-accent">Log In or Sign Up!</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center mt-8">
      <h1 className="text-3xl font-bold mb-4">For the Glow Getters: Our Community's Sunrise and Sunset Hub</h1>
      <button className="btn btn-outline btn-primary mb-4" onClick={handleAddPhoto}>Add To Gallery</button>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photosProp.map(photo => (
          <GalleryHover key={photo.id} photo={photo} openModal={openModal} />
        ))}
      </div>
      {selectedPhoto && (
        <GalleryModal 
          photo={selectedPhoto} 
          photosProp={photosProp} 
          userId={userId} 
          closeModal={closeModal}
          handleDeletePhoto={handleDeletePhoto}
        />
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Gallery);
