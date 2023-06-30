import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './Navigation'
import Home from './Home';
import Explore from './Explore';
import Results from './Results'
import NewPhotoForm from './NewPhotoForm';
import Profile from './Profile';
import Authentication from './Authentication';
import NotFound from './NotFound';
import Favorites from './Favorites';
import Gallery from './Gallery';
import PhotoDetail from './PhotoDetail';
import Footer from './Footer';
import { useDispatch, Provider } from 'react-redux';
import { setLocationData } from './redux/actions';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import './index.css';

function App() {
  const [page, setPage] = useState("/");
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserFetched, setIsUserFetched] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser()
  }, []);

  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
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

  const fetchUser = () => {
    fetch('/authorized')
      .then(response => {
        if (response.ok) {
          response.json()
            .then(data => {
              setUser(data);
              fetchLocations();
              sessionStorage.setItem('isLoggedIn', 'true');
              setIsLoggedIn(true);
              setIsUserFetched(true); 
            });
        } else {
          setIsLoggedIn(false);
          setUser(null);
          setIsUserFetched(true); 
        }
      });
  };

  const updateUser = (user) => setUser(user)

  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' })
      .then(() => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('isLoggedIn');
        navigate('/');
      })
      .catch(error => console.error('Error logging out:', error));
  };

  const dispatch = useDispatch();

  const addPhotoToGallery = (newPhoto) => {
    setPhotos([newPhoto, ...photos]);
  };

  const isLoginPage = location.pathname === '/';

  return (
    <div className="App">
      {!isLoginPage && (
        <Navigation isLoggedIn={isLoggedIn} handleLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} />
      )}
      <Routes>
        <Route path="/" element={<Authentication updateUser={updateUser} setIsLoggedIn={setIsLoggedIn} />} />
        {!isLoginPage && (
          <>
            <Route
              path="/home"
              element={
                <Home
                  locations={locations}
                  setLocations={setLocations}
                  latitude={latitude}
                  longitude={longitude}
                  setError={setError}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                  setLocationData={setLocationData}
                />
              }
            />
            <Route
              path="/explore"
              element={
                <Explore
                  locations={locations}
                  setLocations={setLocations}
                  latitude={latitude}
                  longitude={longitude}
                  setError={setError}
                  setLatitude={setLatitude}
                  setLongitude={setLongitude}
                />
              }
            />
            <Route path="/results/:latitude/:longitude" element={<Results setLocationData={setLocationData} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites user={user} />} />
            <Route path="/gallery" element={user ? <Gallery userId={user.id} isLoggedIn={isLoggedIn} /> : null} />
            <Route path="/photos/:id" element={<PhotoDetail userId={user?.id} />} />
            <Route path="/add" element={<NewPhotoForm addPhotoToGallery={addPhotoToGallery} />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
}

function WrappedApp() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default WrappedApp;