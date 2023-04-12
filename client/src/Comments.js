import React, { useState, useEffect } from 'react';
import EditComments from './EditComments';

function Comments({ photoId, userId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    fetch(`/photos/${photoId}/comments`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        return response.json()
      })
      .then(setComments)
      .catch(error => {
        console.error('Error fetching data:', error)
        setError(error.message)
      });
  }

  const handleDelete = (commentId) => {
    fetch(`/comments/${commentId}`, { method: 'DELETE' })
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.error('Error deleting comment:', error));
  }

  const handleEdit = (comment) => {
    setCommentToEdit(comment);
  }

  const handleSave = (updatedComment) => {
    fetch(`/comments/${updatedComment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedComment),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error updating comment: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const updatedComments = comments.map(comment => {
          if (comment.id === data.id) {
            return data;
          } else {
            return comment;
          }
        });
        setComments(updatedComments);
        setCommentToEdit(null);
      })
      .catch(error => {
        console.error('Error updating comment:', error);
        setError(error.message);
      });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.comment}</p>
          <p>Posted by: {comment.user ? comment.user.first_name + ' ' + comment.user.last_name : 'Unknown'}</p>
          {(comment.user_id === userId) && (
            <div>
              <button onClick={() => handleEdit(comment)}>Edit</button>
              <button onClick={() => handleDelete(comment.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
      {commentToEdit && (
        <EditComments
          comment={commentToEdit}
          onSave={handleSave}
          onCancel={() => setCommentToEdit(null)}
          setComments={setComments}
          comments={comments}
        />
      )}
    </div>
  );
}

export default Comments;