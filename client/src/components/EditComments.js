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
      <form onSubmit={handleEdit} className="space-y-4">
        <div className="text-primary">Edit comment:</div>
        <div className="mb-4">
          <input
            type="text"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
            className="border-primary border-2 p-2 rounded-md w-full"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-outline btn-primary py-2 px-4">
            Save
          </button>
          <button
            type="button"
            className="btn btn-outline btn-primary py-2 px-4 ml-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditComments;