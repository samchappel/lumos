import { useState } from 'react';
import Comments from './Comments';
import DeletePhoto from './DeletePhoto';

function GalleryModal({ photo, photosProp, userId, closeModal }) {
  const [photos, setPhotos] = useState([]);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleDeletePhoto = (photoId) => {
    setPhotos(photos.filter((photo) => photo.id !== photoId));
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? photosProp.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % photosProp.length;
      return newIndex;
    });
  };

  if (!photo) {
    return null;
  }

  const selectedPhoto = photosProp[selectedPhotoIndex];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
      <div className="modal-container bg-base-200 p-8 w-full md:w-3/4 lg:w-1/2 max-h-full overflow-y-auto rounded-lg shadow-lg relative">
        <div className="modal-content">
          <div className="carousel w-full">
            {photosProp.map((photo, index) => (
              <div key={photo.id} id={`slide${index}`} className={`carousel-item relative w-full ${index === selectedPhotoIndex ? 'active' : ''}`}>
                <img src={photo.image} className="object-contain h-full mx-auto" alt={photo.caption} />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={`#slide${index === 0 ? photosProp.length - 1 : index - 1}`} className="btn btn-circle" onClick={handlePrev}>
                    ❮
                  </a>
                  <a href={`#slide${(index + 1) % photosProp.length}`} className="btn btn-circle" onClick={handleNext}>
                    ❯
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-details">
            <h2 className="modal-caption mb-2 text-secondary">{selectedPhoto.caption}</h2>
            <p className="mb-4 text-secondary">
              <strong>
                Photo by: {selectedPhoto.user.first_name} {selectedPhoto.user.last_name}
              </strong>
            </p>
            <div className="comments-container">
              <Comments photoId={selectedPhoto.id} userId={userId} />
            </div>
          </div>
          {selectedPhoto.user.id === userId && (
            <DeletePhoto photo={selectedPhoto} onDelete={handleDeletePhoto} />
          )}
          <button className="modal-close absolute top-4 right-4 text-secondary text-lg" onClick={closeModal}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;