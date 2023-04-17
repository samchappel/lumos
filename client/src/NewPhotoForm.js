import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPhotoForm({ addPhotoToGallery }) {
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const imageInputRef = useRef(); // Add a ref for the file input

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageFile = imageInputRef.current.files[0]; // Get the selected file
    if (!imageFile) {
      console.error('No image file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('location', location);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('caption', caption);
    formData.append('date', date);

    try {
      const response = await fetch('/photos', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const newPhoto = await response.json();
        addPhotoToGallery(newPhoto);
        navigate('/gallery');
      } else {
        console.error('Error adding photo:', response.status);
      }
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Image:
        <input type="file" ref={imageInputRef} />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        City:
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      </label>
      <label>
        State:
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      </label>
      <label>
        Caption:
        <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewPhotoForm;