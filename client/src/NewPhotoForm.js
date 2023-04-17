import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPhotoForm({ addPhotoToGallery }) {
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
//   const [timezone, setTimezone] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const photoData = {
      image: image,
      location: location,
      city: city,
      state: state,
      date: date,
    //   timezone: timezone,
      caption: caption 
    };

    try {
      const response = await fetch('/photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(photoData)
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
    <form onSubmit={handleSubmit}>
      <label>
        Image:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
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