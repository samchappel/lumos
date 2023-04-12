import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation'
import Home from './Home';
import NewPhotoForm from './NewPhotoForm';
import Profile from './Profile';
import Authentication from './Authentication';
import Favorites from './Favorites'
import Gallery from './Gallery'
import './index.css';

function App() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    fetchUser()
},[])

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
  if(!user) return (
    <>
      <Header />
      <Navigation/>
      <Authentication updateUser={updateUser}/>
    </>
  )


  return (
    <div className="App">
      <Header />
      <Navigation updateUser={updateUser}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Authentication />} />
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