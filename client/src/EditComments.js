import React, { useState } from 'react';

function EditComments({ comment, setCommentToEdit, setComments, comments, onSave, onCancel, photoId }) {
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [error, setError] = useState(null);

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`/comments/${comment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        photo_id: photoId,
        comment: editedComment,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error updating comment: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        onSave(data);
      })
      .catch(error => {
        console.error('Error updating comment:', error);
        setError(error.message);
      });
  }

  const handleSave = (e) => {
    e.preventDefault();
    fetch(`/comments/${comment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: editedComment,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error updating comment: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        onSave(data); 
        setEditedComment('');
      })
      .catch(error => {
        console.error('Error updating comment:', error);
        setError(error.message);
      });
  };

  const handleCancel = () => {
    setCommentToEdit(null);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleEdit}>
        <label>
          Edit comment:
          <input
            type="text"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditComments;