import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import AddComment from './AddComment';
import DeletePhoto from './DeletePhoto';

function PhotoPage({ userId }) {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    fetchPhoto();
  }, []);

  const fetchPhoto = () => {
    fetch(`/photos/${id}?user_id=${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPhoto(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  };

  const handleAddComment = (newComment) => {
    setPhoto(prevPhoto => ({
      ...prevPhoto,
      comments: [...prevPhoto.comments, newComment],
    }));
    setShowCommentForm(false);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {photo ? (
        <div>
          <figure><img src={photo.image} alt={photo.caption} /></figure>
          <h2>{photo.caption}</h2>
          <p><strong>{photo.user.first_name} {photo.user.last_name}:</strong> {photo.caption}</p>
          {photo.user.id === userId && (
            <DeletePhoto photo={photo} />
          )}
          <Comments comments={photo.comments} userId={userId} photoId={photo.id} onAddComment={() => setShowCommentForm(true)} />
          {showCommentForm && (
            <AddComment
              photoId={photo.id}
              userId={userId}
              setComments={setPhoto}
              onCancel={() => setShowCommentForm(false)}
              onAddComment={handleAddComment}
            />
          )}
        </div>
      ) : (
        <p>Loading photo...</p>
      )}
    </div>
  );
}

export default PhotoPage;