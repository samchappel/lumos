import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const commentSchema = Yup.object().shape({
  comment: Yup.string().required('Required'),
});

function AddComment({ photoId, userId, setComments }) {
  const [error, setError] = useState(null);

  const handleAddComment = (values, { setSubmitting }) => {
    console.log('user id:', userId); // add this line
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
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error adding comment: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setComments((comments) => [...comments, data]);
        setSubmitting(false);
      })
      .catch(error => {
        console.error('Error adding comment:', error);
        setError(error.message);
      });
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={commentSchema}
        onSubmit={handleAddComment}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="comment" />
            <ErrorMessage name="comment" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddComment;