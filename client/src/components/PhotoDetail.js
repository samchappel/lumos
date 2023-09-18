import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Comments from './Comments';
import AddComment from './AddComment';
import DeletePhoto from './DeletePhoto';

function PhotoDetail() {
  const { state: { userId, handleDeletePhoto, handleAddComment, selectedPhoto, handleCloseAddComment } } = useLocation();
  const location = useLocation();

  const [photoData, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const photoId = location.pathname.split('/').pop();
    fetch(`/photos/${photoId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        return response.json()
      })
      .then(setPhoto)
      .catch(error => {
        console.error('Error fetching data:', error)
      });
  }, [location.pathname]);

  // const handleDeleteComment = (commentId) => {
  //   setComments(comments.filter(comment => comment.id !== commentId));
  // };

  return (
    <div>
      {photoData && (
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure><img src={photoData.image} alt={photoData.caption} /></figure>
          <div className="card-body">
            <h2 className="card-title">{photoData.caption}</h2>
            <p><strong>Photo by: {photoData.user.first_name} {photoData.user.last_name}</strong></p>
            {photoData.user.id === userId && (
                <DeletePhoto photo={photoData} onDelete={handleDeletePhoto} />
              )}
              <p>Total Comments: {comments.length}</p>
              <Comments photoId={photoData.id} userId={userId} onAddComment={() => handleAddComment(photoData)} />
              {selectedPhoto && selectedPhoto.id === photoData.id && (
                <AddComment
                  photoId={selectedPhoto.id}
                  userId={userId}
                  setComments={setComments}
                  onCancel={handleCloseAddComment}
                />
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoDetail;