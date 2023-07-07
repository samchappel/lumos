import { useState, useEffect } from 'react';
import Comments from './Comments';
import DeletePhoto from './DeletePhoto';

function GalleryModal({ photo, photosProp, userId, closeModal, handleDeletePhoto }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(photosProp.findIndex(p => p.id === photo.id));
  const [photos, setPhotos] = useState(photosProp);

  useEffect(() => {
    setPhotos(photosProp);
  }, [photosProp]);

  const handlePrev = () => {
    setSelectedPhotoIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? photos.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleNext = () => {
    setSelectedPhotoIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % photos.length;
      return newIndex;
    });
  };

  if (!photo) {
    return null;
  }

  const selectedPhoto = photos[selectedPhotoIndex];

  if (!selectedPhoto) {
    return null;
  }

  const onDeletePhoto = (photoId) => {
    handleDeletePhoto(photoId);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
      <div className="modal-container bg-base-200 p-8 w-full md:w-3/4 lg:w-1/2 max-h-full overflow-y-auto rounded-lg shadow-lg relative">
        <div className="modal-content">
          <div className="carousel w-full relative">
            <img src={selectedPhoto.image} className="object-contain h-full mx-auto" alt={selectedPhoto.caption} />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#" className="btn btn-circle" onClick={handlePrev}>
                ❮
              </a>
              <a href="#" className="btn btn-circle" onClick={handleNext}>
                ❯
              </a>
            </div>
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
            <DeletePhoto photo={selectedPhoto} onDelete={() => onDeletePhoto(selectedPhoto.id)} />
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