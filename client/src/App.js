import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation'
import Home from './Home';
import Results from './Results'
import NewPhotoForm from './NewPhotoForm';
import Profile from './Profile';
import Authentication from './Authentication';
import Favorites from './Favorites'
import Gallery from './Gallery'
import PhotoPage from './PhotoPage'
import './index.css';

function App() {
  const [page, setPage] = useState("/")
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [photos, setPhotos] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser()
  }, []);

  const fetchLocations = () => {
    fetch('/locations')
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
  }

  const fetchUser = () => (
    fetch('/authorized')
    .then(response => {
      if(response.ok){
        setIsLoggedIn(true);
        response.json()
        .then(data => {
          setUser(data)
          fetchLocations()
        })
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
    })
  )

  const updateUser = (user) => setUser(user)

  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' })
      .then(() => {
        setIsLoggedIn(false);
        navigate('/login');
      })
      .catch(error => console.error('Error logging out:', error));
  };

  const addPhotoToGallery = (newPhoto) => {
    setPhotos([newPhoto, ...photos]);
  };

  return (
    <div className="App">
      <Navigation onChangePage={setPage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} />
      <Header />
      <Routes>
        <Route path="/" element={<Home locations={locations} setLocations={setLocations} latitude={latitude} longitude={longitude} setError={setError} setLatitude={setLatitude} setLongitude={setLongitude} />} />
        <Route path="/results/:latitude/:longitude" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Authentication updateUser={updateUser} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/favorites" element={<Favorites user={user} />} />
        <Route path="/gallery" element={user ? <Gallery userId={user.id} /> : null} />
        <Route path="/add" element={<NewPhotoForm addPhotoToGallery={addPhotoToGallery} />} />
        {/* <Route path="/photos/:id" element={<PhotoPage userId={user.id} />} /> */}
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