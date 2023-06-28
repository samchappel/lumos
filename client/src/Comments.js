import React, { useState, useEffect } from 'react';
import EditComments from './EditComments';
import AddComment from './AddComment';
import { BsTrash3 } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

function Comments({ photoId, userId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

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

  const handleAddComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setShowCommentForm(false);
  };

  const handleCancel = () => {
    setCommentToEdit(null);
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {comments.map(comment => (
        <div key={comment.id}>
          <p><strong>{comment.user ? comment.user.first_name + ' ' + comment.user.last_name + ':' : 'Unknown:'}</strong> {comment.comment}</p>
          {(comment.user_id === userId) && (
            <div>
              <button onClick={() => handleEdit(comment)}><BsPencil className="text-primary" /></button>
              <button onClick={() => handleDelete(comment.id)}><BsTrash3 className="text-primary"/></button>
            </div>
          )}
        </div>
      ))}
      {showCommentForm ? (
        <AddComment photoId={photoId} userId={userId} onAddComment={handleAddComment} onCancel={() => setShowCommentForm(false)} setComments={setComments}/>
      ) : (
        <button onClick={() => setShowCommentForm(true)}><BsPencilSquare className="text-secondary" /></button>
      )}
      {commentToEdit && (
        <EditComments
        comment={commentToEdit}
        onSave={handleSave}
        onCancel={() => setCommentToEdit(null)}
        setComments={setComments}
        comments={comments}
        photoId={photoId}
        userId={userId}
        setCommentToEdit={setCommentToEdit}
      />
      )}
    </div>
  );
}

export default Comments;