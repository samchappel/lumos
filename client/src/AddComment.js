import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const commentSchema = Yup.object().shape({
  comment: Yup.string().required('*Required - please enter a comment or cancel*'),
});

function AddComment({ photoId, userId, setComments, onCancel }) {
  const [error, setError] = useState(null);

  const handleAddComment = (values, { setSubmitting }) => {
    console.log('user id:', userId);
    fetch(`/photos/${photoId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: values.comment,
        user_id: userId,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error adding comment: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setComments((comments) => [...comments, data]);
        setSubmitting(false);
        onCancel();
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
        setError(error.message);
      });
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={commentSchema}
        onSubmit={handleAddComment}
      >
        {({ isSubmitting }) => (
          <Form className="comment-form text-secondary">
            <Field
              type="text"
              name="comment"
              className="comment-input"
              placeholder="Enter your comment..."
            />
            <ErrorMessage name="comment" component="div" className="error-message" />
            <div className="button-container text-secondary">
              <button type="submit" className="text-secondary" disabled={isSubmitting} >
                Submit
              </button>
              <div className="button-separator text-secondary" />
              <button type="button" onClick={onCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddComment;