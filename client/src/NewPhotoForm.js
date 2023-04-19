import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const photoSchema = Yup.object().shape({
  image: Yup.mixed().required('Required'),
  location: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  caption: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
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
    formData.append('location', values.location);
    formData.append('city', values.city);
    formData.append('state', values.state);
    formData.append('caption', values.caption);
    formData.append('date', values.date);

    try {
      const response = await fetch('/photos', {
        method: 'POST',
        body: formData
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
        location: '',
        city: '',
        state: '',
        caption: '',
        date: '',
      }}
      validationSchema={photoSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <label>
            Image:
            <input
              type="file"
              name="image"
              onChange={(event) => {
                setFieldValue('image', event.currentTarget.files[0]);
              }}
              ref={imageInputRef}
            />
            <ErrorMessage name="image" component="div" />
          </label>
          <label>
            Location:
            <Field type="text" name="location" />
            <ErrorMessage name="location" component="div" />
          </label>
          <label>
            City:
            <Field type="text" name="city" />
            <ErrorMessage name="city" component="div" />
          </label>
          <label>
            State:
            <Field type="text" name="state" />
            <ErrorMessage name="state" component="div" />
          </label>
          <label>
            Caption:
            <Field type="text" name="caption" />
            <ErrorMessage name="caption" component="div" />
          </label>
          <label>
            Date:
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="div" />
          </label>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default NewPhotoForm;