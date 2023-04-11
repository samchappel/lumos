import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
  const [locations, setLocations] = useState([])
  const [error, setError] = useState(null)
  const location = useLocation();

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
      setError(error.message)
    });
  }, [])

  const shouldDisplayNavigation = location.pathname !== "/login";

  return (
    <div className="App">
      <Header />
      {shouldDisplayNavigation && <Navigation />}
      {error && <p>{error}</p>}
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/add" element={<NewPhotoForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<p>Page not found</p>} />
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