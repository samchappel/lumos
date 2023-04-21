import React from 'react';

function DeletePhoto({ photo, onDelete }) {
  const handleDelete = () => {
    fetch(`/photos/${photo.id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error deleting photo: ${response.status}`);
        }
        onDelete(photo.id);
      })
      .catch(error => console.error('Error deleting photo:', error));
  };

  return (
    <button className="btn btn-outline btn-accent" onClick={handleDelete}>Delete Photo</button>
  );
}

export default DeletePhoto;