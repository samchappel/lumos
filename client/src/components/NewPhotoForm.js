import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const photoSchema = Yup.object().shape({
  image: Yup.mixed().required('Required'),
  caption: Yup.string().required('Required'),
});

function NewPhotoForm({ addPhotoToGallery }) {
  const navigate = useNavigate();
  const imageInputRef = useRef();

  const handleSubmit = async (values, { setSubmitting }) => {
    const imageFile = imageInputRef.current.files[0];
    if (!imageFile) {
      console.error('No image file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('caption', values.caption);

    try {
      const response = await fetch('/photos', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newPhoto = await response.json();
        console.log(newPhoto);
        addPhotoToGallery(newPhoto);
        navigate('/gallery');
      } else {
        console.error('Error adding photo:', response.status);
      }
    } catch (error) {
      console.error('Error adding photo:', error);
    }

    setSubmitting(false);
  };

  const handleCancel = () => {
    navigate('/gallery');
  };

  return (
    <Formik
      initialValues={{
        image: null,
        caption: '',
      }}
      validationSchema={photoSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="max-w-xl mx-auto">
          <label className="block mb-2">
            <span className="text-secondary">Image:</span>
            <input
              type="file"
              name="image"
              onChange={(event) => {
                setFieldValue('image', event.currentTarget.files[0]);
              }}
              ref={imageInputRef}
              className="block mt-1 w-full"
            />
            <ErrorMessage name="image" component="div" className="text-red-500 mt-1" />
          </label>
          <label className="block mb-2">
            <span className="text-secondary">Caption:</span>
            <Field type="text" name="caption" className="form-input mt-1 block w-full" />
            <ErrorMessage name="caption" component="div" className="text-red-500 mt-1" />
          </label>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-4 py-2 rounded-md mr-2 disabled:opacity-50"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NewPhotoForm;