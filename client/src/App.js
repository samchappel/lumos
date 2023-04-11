import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation'
import Home from './Home';
import NewPhotoForm from './NewPhotoForm';
import Profile from './Profile';
import LogIn from './LogIn';
import Favorites from './Favorites'
import Gallery from './Gallery'
import './index.css';

function App() {
  const [page, setPage] = useState('/')
  const [locations, setLocations] = useState([])

  useEffect(() => {
    fetch('http://localhost:5555/locations')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      return response.json()
    })
    .then(setLocations)
    .catch(error => {
      console.error('Error fetching data:', error)
    });
  }, [])
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/add" element={<NewPhotoForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}


function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default WrappedApp;