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
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeletePhoto;