import { useState } from 'react';
import Comments from './Comments';
import DeletePhoto from './DeletePhoto';

function GalleryModal({ photo, userId, closeModal }) {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleAddComment = (photo) => {
        setSelectedPhoto(photo);
      };
    
      const handleCloseAddComment = () => {
        setSelectedPhoto(null);
      };
    
      const handleDeletePhoto = (photoId) => {
        setPhotos(photos.filter(photo => photo.id !== photoId));
      };

      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
          <div className="modal-container bg-base-200 p-8 w-full md:w-3/4 lg:w-1/2 max-h-full overflow-y-auto rounded-lg shadow-lg relative">
            <div className="modal-content">
              <div className="modal-image-container flex justify-center">
                  <img src={photo.image} alt={photo.caption} className="modal-image items-center" />
              </div>
              <div className="modal-details">
                <h2 className="modal-caption mb-2 text-secondary">{photo.caption}</h2>
                <p className="mb-4 text-secondary">
                  <strong>
                    Photo by: {photo.user.first_name} {photo.user.last_name}
                  </strong>
                </p>
                <div className="comments-container">
                  <Comments photoId={photo.id} userId={userId} />
                </div>
              </div>
            </div>
            {photo.user.id === userId && (
              <DeletePhoto photo={photo} onDelete={handleDeletePhoto} />
            )}
            <button
              className="modal-close absolute top-4 right-4 text-secondary text-lg"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      );
    }
    
    export default GalleryModal;