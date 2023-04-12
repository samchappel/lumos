import React, { useState } from 'react';

function EditComments({ comment, setCommentToEdit, setComments, comments, onSave, onCancel }) {
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
        comment: editedComment,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error updating comment: ${response.status}`);
        }
        onCancel();
        setComments(comments.map(c => {
          if (c.id === comment.id) {
            return { ...c, comment: editedComment };
          } else {
            return c;
          }
        }));
      })
      .catch(error => {
        console.error('Error updating comment:', error);
        setError(error.message);
      });
  }

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
        <button onClick={() => setCommentToEdit(null)}>Cancel</button>
        </form>
    </div>
    );
}

export default EditComments;