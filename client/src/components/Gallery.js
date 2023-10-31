import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GalleryModal from './GalleryModal';
import GalleryHover from './GalleryHover';

function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photosProp, setPhotosProp] = useState([]);

  const navigate = useNavigate();

  const handleAddPhoto = () => {
    navigate('/add');
  };

  const fetchPhotos = () => {
    fetch('/photos')
      .then((response) => {
        if (!response.ok) {
          console.error(`Error fetching data: ${response.status}`);
          return;
        }
        return response.json();
      })
      .then((data) => {
        setPhotosProp(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleDeletePhoto = (photoId) => {
    setPhotosProp(photosProp.filter(photo => photo.id !== photoId));
  };

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
          closeModal={closeModal}
          handleDeletePhoto={handleDeletePhoto}
        />
      )}
    </div>
  );
}

export default Gallery;