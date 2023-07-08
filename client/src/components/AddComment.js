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
    <div className="p-4">
      {error && <p>{error}</p>}
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={commentSchema}
        onSubmit={handleAddComment}
      >
        {({ isSubmitting }) => (
          <Form className="comment-form space-y-4">
            <Field
              type="text"
              name="comment"
              className="comment-input text-secondary border-2 border-secondary p-2 rounded-md w-full"
              placeholder="Enter your comment..."
            />
            <ErrorMessage name="comment" component="div" className="error-message" />
            <div className="flex justify-center space-x-2">
              <button type="submit" className="btn btn-outline btn-secondary py-2 px-4" disabled={isSubmitting}>
                Submit
              </button>
              <button type="button" onClick={onCancel} className="btn btn-outline btn-secondary py-2 px-4">
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