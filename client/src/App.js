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
import PhotoDetail from './PhotoDetail';
import { useDispatch } from 'react-redux';
import { setLocationData } from './redux/actions';
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

  const dispatch = useDispatch();

  const handleSearch = (address) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_API_KEY}`;
    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        if (data.results.length === 0) {
          setError('No results found. Please try a different search term.');
        } else {
          const { lat, lng } = data.results[0].geometry.location;
          console.log('Latitude:', lat);
          console.log('Longitude:', lng);
          const addressComponents = data.results[0].address_components;
          const cityComponent = addressComponents.find(component => component.types.includes('locality') || component.types.includes('postal_town'));
          const stateComponent = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
          const city = cityComponent?.long_name;
          const state = stateComponent?.short_name;
          dispatch(setLocationData({ city, state })); 
          console.log('city:', city)
          console.log('state:', state)
          navigate({
            pathname: `/results/${lat}/${lng}`,
            state: { city, state },
          });
        }
      })
      .catch(error => {
        console.error('Error fetching geocode data:', error);
        setError(error.message);
      });
  };
          
          return (
          <div className="App">
          <Navigation onChangePage={setPage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} />
          <Header handleSearch={handleSearch} setLocationData={setLocationData}/>
          <Routes>
          <Route path="/" element={<Home locations={locations} setLocations={setLocations} latitude={latitude} longitude={longitude} setError={setError} setLatitude={setLatitude} setLongitude={setLongitude} />} />
          <Route path="/results/:latitude/:longitude" element={<Results setLocationData={setLocationData} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Authentication updateUser={updateUser} setIsLoggedIn={setIsLoggedIn} />} />
          {/* <Route path="/favorites" element={<Favorites user={user} />} /> */}
          <Route path="/gallery" element={user ? <Gallery userId={user.id} /> : null} />
          <Route path="/photos/:id" element={<PhotoDetail userId={user?.id} />} />
          <Route path="/add" element={<NewPhotoForm addPhotoToGallery={addPhotoToGallery} />} />
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